//语言
import { lang } from '@/settings/designSetting'
import { createI18n } from 'vue-i18n' //引入vue-i18n组件
import { getLocalStorage } from '@/utils'
import { StorageEnum }from '@/enums/storageEnum'
import { LangEnum } from '@/enums/styleEnum'
import { LangStateType } from '@/store/modules/langStore/langStore.d'
import zh from './zh/index'
import en from './en/index'
import vi from './vi/index'

const langStorage: LangStateType = getLocalStorage(StorageEnum.GO_LANG_STORE)

// 语言数组
export const langList = [
  {
    label: 'Chinese',
    key: LangEnum.ZH
  },
  {
    label: 'English',
    key: LangEnum.EN
  },
  {
    label: 'Vietnamese',
    key: LangEnum.VI
  }
]

const i18n = createI18n({
  legacy: false,
  globalInjection:true,
  locale: langStorage?.lang || lang,
  fallbackLocale: langStorage?.lang || lang,
  messages: {
    [LangEnum.ZH]: zh,
    [LangEnum.EN]: en,
    [LangEnum.VI]: vi,
  }
})

export default i18n
