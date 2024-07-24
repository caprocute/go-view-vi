import { ChartFrameEnum, ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ImageConfig } from '@/packages/components/Informations/Mores/Image/index'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'
import { setLocalStorage, getLocalStorage, goDialog } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { FileTypeEnum } from '@/enums/fileTypeEnum'
import { backgroundImageSize } from '@/settings/designSetting'
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'

const StoreKey = StorageEnum.GO_USER_MEDIA_PHOTOS

/**
 * Upload completion event type
 */
type UploadCompletedEventType = {
  fileName: string
  url: string
}

const userPhotosList: ConfigType[] = getLocalStorage(StoreKey) || []

const uploadFile = (callback: Function | null = null) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.png,.jpg,.jpeg,.gif' // Only allowing certain image types
  input.onchange = async () => {
    if (!input.files || !input.files.length) return
    const file = input.files[0]
    const { name, size, type } = file
    if (size > 1024 * 1024 * backgroundImageSize) {
      window['$message'].warning(`The image exceeds the limit of ${backgroundImageSize}M, please upload again!`)
      return false
    }
    if (type !== FileTypeEnum.PNG && type !== FileTypeEnum.JPEG && type !== FileTypeEnum.GIF) {
      window['$message'].warning('The file format is not supported, please upload again!')
      return false
    }
    const reader = new FileReader()
    reader.onload = () => {
      const eventObj: UploadCompletedEventType = { fileName: name, url: reader.result as string }
      callback && callback(eventObj)
    }
    reader.readAsDataURL(file)
  }
  input.click()
}

const addConfig = {
  ...ImageConfig,
  category: ChatCategoryEnum.PRIVATE,
  categoryName: ChatCategoryEnumName.PRIVATE,
  package: PackagesCategoryEnum.PHOTOS,
  chartFrame: ChartFrameEnum.STATIC,
  title: 'Upload image',
  image: 'upload.png',
  redirectComponent: `${ImageConfig.package}/${ImageConfig.category}/${ImageConfig.key}`, // Component path rule: packageName/categoryName/componentKey
  disabled: true,
  configEvents: {
    // Click to upload event
    addHandle: (photoConfig: ConfigType) => {
      goDialog({
        message: `The image must be smaller than ${backgroundImageSize}M and is only temporarily stored in the browser. The current temporary storage limit is 5M, no new images will be cached after exceeding, please connect to the backend interface yourself! Currently compiled into base64 for rendering, please use [URL address] for interaction after connecting to the backend!`,
        transformOrigin: 'center',
        onPositiveCallback: () => {
          uploadFile((e: UploadCompletedEventType) => {
            // Same configuration as the upload component, changing title, image, and preset data
            const packagesStore = usePackagesStore()
            const newPhoto = {
              ...ImageConfig,
              category: ChatCategoryEnum.PRIVATE,
              categoryName: ChatCategoryEnumName.PRIVATE,
              package: PackagesCategoryEnum.PHOTOS,
              chartFrame: ChartFrameEnum.STATIC,
              title: e.fileName,
              image: e.url,
              dataset: e.url,
              redirectComponent: `${ImageConfig.package}/${ImageConfig.category}/${ImageConfig.key}` // Component path rule: packageName/categoryName/componentKey
            }
            userPhotosList.unshift(newPhoto)
            // Store in local data
            setLocalStorage(StoreKey, userPhotosList)
            // Insert before the upload button
            packagesStore.addPhotos(newPhoto, 1)
          })
        }
      })
    }
  }
}

export default [addConfig, ...userPhotosList]
