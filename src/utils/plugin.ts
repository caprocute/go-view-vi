import { icon } from '@/plugins'
import { DialogEnum } from '@/enums/pluginEnum'
import { dialogIconSize } from '@/settings/designSetting'
import { maskClosable } from '@/settings/designSetting'
import { DialogReactive } from 'naive-ui'
const { InformationCircleIcon } = icon.ionicons5
import { renderIcon } from '@/utils'

// * Start loading
export const loadingStart = () => {
  window['$loading'].start()
}

// * Finish loading
export const loadingFinish = () => {
  setTimeout(() => {
    window['$loading'].finish()
  })
}

// * Loading error
export const loadingError = () => {
  setTimeout(() => {
    window['$loading'].error()
  })
}

/**
 * * Render dialog
 * @param { Object} params Configuration parameters, see https://www.naiveui.com/zh-CN/light/components/dialog
 * ```
 * The simplest demo
 * goDialog({
 *    onPositiveCallback: () => {}
 * })
 * ```
 */
export const goDialog = (
    params: {
      // Basic
      type?: DialogEnum
      // Title
      title?: string | (() => any)
      // Message
      message?: string
      // Confirmation text
      positiveText?: string
      // Cancellation text
      negativeText?: string
      // Whether to hide the cancel button
      closeNegativeText?: boolean,
      // Whether clicking the mask closes the dialog
      isMaskClosable?: boolean
      // Callbacks
      onPositiveCallback: Function
      onNegativeCallback?: Function
      // Async
      promise?: boolean
      promiseResCallback?: Function
      promiseRejCallback?: Function
      [T: string]: any
    }
) => {
  const {
    type,
    title,
    message,
    positiveText,
    negativeText,
    closeNegativeText,
    isMaskClosable,
    onPositiveCallback,
    onNegativeCallback,
    promise,
    promiseResCallback,
    promiseRejCallback
  } = params

  const typeObj = {
    // Custom
    [DialogEnum.DELETE]: {
      fn: window['$dialog'].warning,
      message: message || 'Do you want to delete this data?'
    },
    // Original
    [DialogEnum.WARNING]: {
      fn: window['$dialog'].warning,
      message: message || 'Do you want to perform this operation?'
    },
    [DialogEnum.ERROR]: {
      fn: window['$dialog'].error,
      message: message || 'Do you want to perform this operation?'
    },
    [DialogEnum.SUCCESS]: {
      fn: window['$dialog'].success,
      message: message || 'Do you want to perform this operation?'
    }
  }

  const dialog: DialogReactive = typeObj[type || DialogEnum.WARNING]['fn']({
    // Import other NaiveUI supported parameters
    ...params,
    title: title || 'Notice',
    icon: renderIcon(InformationCircleIcon, { size: dialogIconSize }),
    content: typeObj[type || DialogEnum.WARNING]['message'],
    positiveText: positiveText || 'Confirm',
    negativeText: closeNegativeText ? undefined : (negativeText || 'Cancel'),
    // Whether to close through the mask
    maskClosable: isMaskClosable || maskClosable,
    onPositiveClick: async () => {
      // Perform asynchronously
      if (promise && onPositiveCallback) {
        dialog.loading = true
        try {
          const res = await onPositiveCallback()
          promiseResCallback && promiseResCallback(res)
        } catch (err) {
          promiseRejCallback && promiseRejCallback(err)
        }
        dialog.loading = false
        return
      }
      onPositiveCallback && onPositiveCallback(dialog)
    },
    onNegativeClick: async () => {
      onNegativeCallback && onNegativeCallback(dialog)
    }
  })
}
