<template>
  <n-modal
    class="go-chart-data-pond-control"
    v-model:show="modelShowRef"
    :mask-closable="false"
    :close-on-esc="true"
    :onEsc="onEsc"
  >
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 900px; height: 650px">
      <template #header></template>
      <template #header-extra> </template>
      <div class="pond-content">
        <!-- 展示区域 -->
        <chart-data-display
          v-if="pondData && !loading"
          :targetData="pondData"
          :globalData="chartEditStore.getRequestGlobalConfig"
        ></chart-data-display>
        <!-- 无数据 -->
        <div v-else class="no-data go-flex-center">
          <img :src="noData" alt="No data yet" />
          <n-text :depth="3">No public interface is selected</n-text>
        </div>
        <!-- 左侧列表 -->
        <chart-data-pond-list @createPond="createPond" @deletePond="deletePond"></chart-data-pond-list>
      </div>
      <!-- 底部 -->
      <template #action>
        <n-space justify="space-between">
          <n-button type="info" secondary :disabled="!pondData" @click="openPond(true)">
            Edit the content
            <template #icon>
              <n-icon>
                <pencil-icon />
              </n-icon>
            </template>
          </n-button>
          <div>
            <n-button class="go-mr-3" @click="closeHandle">Cancel</n-button>
            <n-button type="primary" @click="closeAndSendHandle">Save & Send a request</n-button>
          </div>
        </n-space>
      </template>
    </n-card>
  </n-modal>

  <!-- 请求配置model -->
  <pond-data-request
    v-model:modelShow="requestShow"
    :targetDataRequest="editData"
    :isEdit="isEdit"
    @editSaveHandle="saveHandle"
  ></pond-data-request>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, nextTick, watch, toRaw } from 'vue'
import noData from '@/assets/images/canvas/noData.png'
import { ChartDataPondList } from '../ChartDataPondList'
import { PondDataRequest } from '../../../ChartDataRequest'
import { ChartDataDisplay } from '../ChartDataDisplay'
import { requestConfig } from '@/packages/public/publicConfig'
import { useTargetData } from '@/views/chart/ContentConfigurations/components/hooks/useTargetData.hook'
import { RequestDataPondItemType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { icon } from '@/plugins'
import { getUUID, goDialog } from '@/utils'
import { cloneDeep } from 'lodash'

const props = defineProps({
  modelShow: Boolean
})

const emit = defineEmits(['update:modelShow', 'sendHandle'])
const { PencilIcon } = icon.ionicons5
const { chartEditStore, targetData } = useTargetData()
const { requestDataPond } = toRefs(chartEditStore.getRequestGlobalConfig)
const requestShow = ref(false)
const modelShowRef = ref(false)
const loading = ref(false)
const isEdit = ref(false)
const editData = ref<RequestDataPondItemType>()

// 所选数据池
const pondData = computed(() => {
  const selectId = targetData?.value?.request?.requestDataPondId
  if (!selectId) return undefined
  const data = requestDataPond.value.filter(item => {
    return selectId === item.dataPondId
  })
  return data[0]
})

watch(
  () => props.modelShow,
  newValue => {
    modelShowRef.value = newValue
  }
)

watch(
  () => pondData.value,
  newValue => {
    loading.value = true
    editData.value = newValue
    nextTick(() => {
      loading.value = false
    })
  },
  {
    immediate: true
  }
)

// 打开/编辑
const openPond = (isEditFlag: boolean = false) => {
  isEdit.value = !!isEditFlag
  requestShow.value = true
}

// 创建
const createPond = () => {
  const id = getUUID()
  editData.value = {
    dataPondId: id,
    dataPondName: id,
    dataPondRequestConfig: cloneDeep({ ...requestConfig, requestDataType: RequestDataTypeEnum.Pond })
  }
  openPond()
}

// 完成创建/编辑
const saveHandle = (newData: RequestDataPondItemType) => {
  // 走创建
  if (isEdit.value) {
    editSaveHandle(newData)
  } else {
    createSaveHandle(newData)
  }
  isEdit.value = false
  requestShow.value = false
}

// 编辑保存之后
const editSaveHandle = (newData: RequestDataPondItemType) => {
  try {
    const targetIndex = requestDataPond.value.findIndex(item => item.dataPondId === newData.dataPondId)
    if (targetIndex !== -1) {
      requestDataPond.value.splice(targetIndex, 1, newData)
      // 修改数据池后, 修改所有关联的组件
      chartEditStore.getComponentList.forEach(item => {
        if (
          item.request.requestDataType === RequestDataTypeEnum.Pond &&
          item.request.requestDataPondId === newData.dataPondId
        ) {
          item.request = {
            ...toRaw(newData.dataPondRequestConfig),
            requestDataPondId: newData.dataPondId
          }
        }
      })
      window.$message.success('Save Successful！')
    } else {
      window.$message.error('Edit failed, please try again later!')
    }
  } catch (error) {
    window.$message.error('Edit failed, please try again later!')
  }
}

// 创建保存成功之后
const createSaveHandle = (newData: RequestDataPondItemType) => {
  try {
    if (editData.value) {
      requestDataPond.value.unshift(newData)
      window.$message.success('Created successfully!')
    } else {
      window.$message.error('Failed to create, please try again later!')
    }
  } catch (error) {
    window.$message.error('Failed to create, please try again later!')
  }
}

// 删除数据池
const deletePond = (targetData: RequestDataPondItemType) => {
  goDialog({
    message: 'After deleting data, do I need to manually process the components that use the re-interface?',
    isMaskClosable: true,
    transformOrigin: 'center',
    onPositiveCallback: () => {
      const targetIndex = requestDataPond.value.findIndex(item => item.dataPondId === targetData.dataPondId)
      if (targetIndex !== -1) {
        requestDataPond.value.splice(targetIndex, 1)
        window.$message.success('The deletion is successful!')
      } else {
        window.$message.error('Deletion failed, please try again later！')
      }
    }
  })
}

// 关闭
const closeAndSendHandle = () => {
  // 将所选内容赋值给对象
  if (pondData.value) {
    targetData.value.request = {
      ...toRaw(pondData.value.dataPondRequestConfig),
      requestDataPondId: pondData.value.dataPondId
    }
  }
  emit('update:modelShow', false)
  emit('sendHandle')
}

const closeHandle = () => {
  emit('update:modelShow', false)
}

const onEsc = () => {
  closeHandle()
}
</script>

<style lang="scss" scoped>
@include go('chart-data-pond-control') {
  /* 中间 */
  .pond-content {
    display: flex;
  }
  .no-data {
    flex-direction: column;
    width: 100%;
    img {
      width: 200px;
    }
  }
  &.n-card.n-modal,
  .n-card {
    @extend .go-background-filter;
  }
  .n-card-shallow {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  @include deep() {
    & > .n-card__content {
      padding-right: 0;
    }
    .n-card__content {
      padding-bottom: 5px;
    }
  }
}
</style>
