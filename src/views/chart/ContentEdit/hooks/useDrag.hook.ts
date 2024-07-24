import { toRaw } from 'vue'
import { DragKeyEnum, MouseEventButton } from '@/enums/editPageEnum'
import { createComponent } from '@/packages'
import { ConfigType } from '@/packages/index.d'
import { CreateComponentType, CreateComponentGroupType, PickCreateComponentType } from '@/packages/index.d'
import { useContextMenu } from '@/views/chart/hooks/useContextMenu.hook'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { loadingStart, loadingFinish, loadingError, setComponentPosition, JSONParse } from '@/utils'
import { throttle, cloneDeep } from 'lodash'

const chartEditStore = useChartEditStore()
const { onClickOutSide } = useContextMenu()

// * Handle dragging into the edit area
export const dragHandle = async (e: DragEvent) => {
  e.preventDefault()

  try {
    loadingStart()

    // Get drag data
    const dragDataString = e!.dataTransfer!.getData(DragKeyEnum.DRAG_KEY)
    if (!dragDataString) {
      loadingFinish()
      return
    }

    // Change state
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_CREATE, false)
    const dropData: Exclude<ConfigType, ['image']> = JSONParse(dragDataString)
    if (dropData.disabled) return

    // Create new chart component
    let newComponent: CreateComponentType = await createComponent(dropData)
    if (dropData.redirectComponent) {
      dropData.dataset && (newComponent.option.dataset = dropData.dataset)
      newComponent.chartConfig.title = dropData.title
      newComponent.chartConfig.chartFrame = dropData.chartFrame
    }

    setComponentPosition(newComponent, e.offsetX - newComponent.attr.w / 2, e.offsetY - newComponent.attr.h / 2)
    chartEditStore.addComponentList(newComponent, false, true)
    chartEditStore.setTargetSelectChart(newComponent.id)
    loadingFinish()
  } catch (error) {
    loadingError()
    window['$message'].warning(`Chart is under development, please stay tuned...`)
  }
}

// * Enter drag area
export const dragoverHandle = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()

  if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
}

// * Do not intercept default behavior click
export const mousedownHandleUnStop = (e: MouseEvent, item?: CreateComponentType | CreateComponentGroupType) => {
  if (item) {
    chartEditStore.setTargetSelectChart(item.id)
    return
  }
  chartEditStore.setTargetSelectChart(undefined)
}

// * Box select
export const mousedownBoxSelect = (e: MouseEvent, item?: CreateComponentType | CreateComponentGroupType) => {
  if (e.which == 2) return
  if (window.$KeyboardActive?.space) return

  mousedownHandleUnStop(e)

  // Record initial click position
  const startOffsetX = e.offsetX
  const startOffsetY = e.offsetY
  const startScreenX = e.screenX
  const startScreenY = e.screenY

  // Record scale
  const scale = chartEditStore.getEditCanvas.scale

  chartEditStore.setMousePosition(undefined, undefined, startOffsetX, startOffsetY)

  // Move box select
  const mousemove = throttle((moveEvent: MouseEvent) => {
    // Cancel current selection
    chartEditStore.setTargetSelectChart()
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_SELECT, true)

    // Calculate relative values, otherwise the component cannot get the values of startScreenX and startScreenY
    const currX = startOffsetX + moveEvent.screenX - startScreenX
    const currY = startOffsetY + moveEvent.screenY - startScreenY
    chartEditStore.setMousePosition(currX, currY)

    // Calculate the top-left and bottom-right corners of the selection
    const selectAttr = {
      // Top-left corner
      x1: 0,
      y1: 0,
      // Bottom-right corner
      x2: 0,
      y2: 0
    }
    if (currX > startOffsetX && currY > startOffsetY) {
      // Bottom-right direction
      selectAttr.x1 = startOffsetX
      selectAttr.y1 = startOffsetY
      selectAttr.x2 = Math.round(startOffsetX + (moveEvent.screenX - startScreenX) / scale)
      selectAttr.y2 = Math.round(startOffsetY + (moveEvent.screenY - startScreenY) / scale)
    } else if (currX > startOffsetX && currY < startOffsetY) {
      // Top-right direction
      selectAttr.x1 = startOffsetX
      selectAttr.y1 = Math.round(startOffsetY - (startScreenY - moveEvent.screenY) / scale)
      selectAttr.x2 = Math.round(startOffsetX + (moveEvent.screenX - startScreenX) / scale)
      selectAttr.y2 = startOffsetY
    } else if (currX < startOffsetX && currY > startOffsetY) {
      // Bottom-left direction
      selectAttr.x1 = Math.round(startOffsetX - (startScreenX - moveEvent.screenX) / scale)
      selectAttr.y1 = startOffsetY
      selectAttr.x2 = startOffsetX
      selectAttr.y2 = Math.round(startOffsetY + (moveEvent.screenY - startScreenY) / scale)
    } else {
      // Top-left direction
      selectAttr.x1 = Math.round(startOffsetX - (startScreenX - moveEvent.screenX) / scale)
      selectAttr.y1 = Math.round(startOffsetY - (startScreenY - moveEvent.screenY) / scale)
      selectAttr.x2 = startOffsetX
      selectAttr.y2 = startOffsetY
    }

    // Iterate through components
    chartEditStore.getComponentList.forEach(item => {
      if (!chartEditStore.getTargetChart.selectId.includes(item.id)) {
        // Handle top-left corner
        let isSelect = false
        const { x, y, w, h } = item.attr
        const targetAttr = {
          // Top-left corner
          x1: x,
          y1: y,
          // Bottom-right corner
          x2: x + w,
          y2: y + h
        }
        // Select if fully contained
        if (
            targetAttr.x1 - selectAttr.x1 >= 0 &&
            targetAttr.y1 - selectAttr.y1 >= 0 &&
            targetAttr.x2 - selectAttr.x2 <= 0 &&
            targetAttr.y2 - selectAttr.y2 <= 0 &&
            !item.status.lock &&
            !item.status.hide
        ) {
          isSelect = true
          chartEditStore.setTargetSelectChart(item.id, true)
        }
      }
    })
  }, 30)

  // Mouse up
  const mouseup = () => {
    // End mousemove throttling on mouse up to avoid selection box not disappearing
    mousemove.cancel()
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_SELECT, false)
    chartEditStore.setMousePosition(0, 0, 0, 0)
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  }
  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}

// * Mouse events
export const useMouseHandle = () => {
  // * Click event, triggers when the mouse is released
  const mouseClickHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    if (item.status.lock) return
    // If CTRL is pressed at this time, it means multi-select
    if (window.$KeyboardActive?.ctrl) {
      // If already selected, remove
      if (chartEditStore.targetChart.selectId.includes(item.id)) {
        const exList = chartEditStore.targetChart.selectId.filter(e => e !== item.id)
        chartEditStore.setTargetSelectChart(exList)
      } else {
        chartEditStore.setTargetSelectChart(item.id, true)
      }
    }
  }

  // * Mouse down event (including move event)
  const mousedownHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    if (item.status.lock) return
    onClickOutSide()
    // Press left button + CTRL
    if (e.buttons === MouseEventButton.LEFT && window.$KeyboardActive?.ctrl) return

    // Press right button + select multiple + target element is a multi-select child element
    const selectId = chartEditStore.getTargetChart.selectId
    if (e.buttons === MouseEventButton.RIGHT && selectId.length > 1 && selectId.includes(item.id)) return

    // Select the current target component
    chartEditStore.setTargetSelectChart(item.id)

    // Press right button
    if (e.buttons === MouseEventButton.RIGHT) return

    const scale = chartEditStore.getEditCanvas.scale
    const canvasWidth = chartEditStore.getEditCanvasConfig.width
    const canvasHeight = chartEditStore.getEditCanvasConfig.height

    // Record initial position and size of the chart
    const targetMap = new Map()
    chartEditStore.getTargetChart.selectId.forEach(id => {
      const index = chartEditStore.fetchTargetIndex(id)
      if (index !== -1) {
        const { x, y, w, h } = toRaw(chartEditStore.getComponentList[index]).attr
        targetMap.set(id, { x, y, w, h })
      }
    })

    // Record initial click position
    const startX = e.screenX
    const startY = e.screenY

    // Record historical position
    let prevComponentInstance: Array<CreateComponentType | CreateComponentGroupType> = []
    chartEditStore.getTargetChart.selectId.forEach(id => {
      if (!targetMap.has(id)) return

      const index = chartEditStore.fetchTargetIndex(id)
      // Get initial position data
      prevComponentInstance.push(cloneDeep(chartEditStore.getComponentList[index]))
    })

    // Record initial position
    chartEditStore.setMousePosition(undefined, undefined, startX, startY)

    // Move - calculate offset
    const mousemove = throttle((moveEvent: MouseEvent) => {
      chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, true)
      chartEditStore.setMousePosition(moveEvent.screenX, moveEvent.screenY)

      // Current offset, handle scale ratio issue
      let offsetX = (moveEvent.screenX - startX) / scale
      let offsetY = (moveEvent.screenY - startY) / scale

      chartEditStore.getTargetChart.selectId.forEach(id => {
        if (!targetMap.has(id)) return

        const index = chartEditStore.fetchTargetIndex(id)
        // Get initial position data
        const { x, y, w, h } = targetMap.get(id)
        const componentInstance = chartEditStore.getComponentList[index]

        let currX = Math.round(x + offsetX)
        let currY = Math.round(y + offsetY)

        // Reserve distance
        const distance = 50

        // Check based on top-left position
        currX = currX < -w + distance ? -w + distance : currX
        currY = currY < -h + distance ? -h + distance : currY

        // Check based on bottom-right position
        currX = currX > canvasWidth - distance ? canvasWidth - distance : currX
        currY = currY > canvasHeight - distance ? canvasHeight - distance : currY
        if (componentInstance) {
          componentInstance.attr = Object.assign(componentInstance.attr, {
            x: currX,
            y: currY
          })
        }
      })
      return
    }, 20)

    const mouseup = () => {
      try {
        chartEditStore.setMousePosition(0, 0, 0, 0)
        chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, false)
        // Add to history stack
        if (prevComponentInstance.length) {
          chartEditStore.getTargetChart.selectId.forEach(id => {
            if (!targetMap.has(id)) return
            const index = chartEditStore.fetchTargetIndex(id)
            const curComponentInstance = chartEditStore.getComponentList[index]
            // Find the selected component in the record
            prevComponentInstance.forEach(preItem => {
              if (preItem.id === id) {
                preItem.attr = Object.assign(preItem.attr, {
                  offsetX: curComponentInstance.attr.x - preItem.attr.x,
                  offsetY: curComponentInstance.attr.y - preItem.attr.y
                })
              }
            })
          })

          const moveComponentInstance = prevComponentInstance.filter(
              item => item.attr.offsetX !== 0 && item.attr.offsetY !== 0
          )
          moveComponentInstance.length && chartEditStore.moveComponentList(moveComponentInstance)
        }
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      } catch (err) {
        console.log(err)
      }
    }

    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
  }

  // * Mouse enter event
  const mouseenterHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    if (!chartEditStore.getEditCanvas.isSelect) {
      chartEditStore.setTargetHoverChart(item.id)
    }
  }

  // * Mouse leave event
  const mouseleaveHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, false)
    chartEditStore.setTargetHoverChart(undefined)
  }

  return { mouseClickHandle, mousedownHandle, mouseenterHandle, mouseleaveHandle }
}

// * Move anchor points
export const useMousePointHandle = (e: MouseEvent, point: string, attr: PickCreateComponentType<'attr'>) => {
  e.stopPropagation()
  e.preventDefault()

  // Set drag state
  chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, true)
  const scale = chartEditStore.getEditCanvas.scale

  const itemAttrX = attr.x
  const itemAttrY = attr.y
  const itemAttrW = attr.w
  const itemAttrH = attr.h

  // Record initial click position
  const startX = e.screenX
  const startY = e.screenY

  // Record initial position
  chartEditStore.setMousePosition(startX, startY)

  const mousemove = throttle((moveEvent: MouseEvent) => {
    chartEditStore.setMousePosition(moveEvent.screenX, moveEvent.screenY)

    let currX = Math.round((moveEvent.screenX - startX) / scale)
    let currY = Math.round((moveEvent.screenY - startY) / scale)

    const isTop = /t/.test(point)
    const isBottom = /b/.test(point)
    const isLeft = /l/.test(point)
    const isRight = /r/.test(point)

    const newHeight = itemAttrH + (isTop ? -currY : isBottom ? currY : 0)
    const newWidth = itemAttrW + (isLeft ? -currX : isRight ? currX : 0)

    attr.h = newHeight > 0 ? newHeight : 0
    attr.w = newWidth > 0 ? newWidth : 0
    attr.x = itemAttrX + (isLeft ? currX : 0)
    attr.y = itemAttrY + (isTop ? currY : 0)
  }, 50)

  const mouseup = () => {
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, false)
    chartEditStore.setMousePosition(0, 0, 0, 0)
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  }

  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}
