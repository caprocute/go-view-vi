import { useRoute } from 'vue-router'
import { ResultEnum, RequestHttpHeaderEnum } from '@/enums/httpEnum'
import { ErrorPageNameMap, PageEnum, PreviewEnum } from '@/enums/pageEnum'
import { docPath, giteeSourceCodePath } from '@/settings/pathConst'
import { SystemStoreEnum, SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import { StorageEnum } from '@/enums/storageEnum'
import { clearLocalStorage, getLocalStorage, clearCookie } from './storage'
import router from '@/router'
import { logoutApi } from '@/api/path'

/**
 * * Navigate to route by name
 * @param pageName
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByName = (
    pageName: string,
    isReplace?: boolean,
    windowOpen?: boolean
) => {
  if (windowOpen) {
    const path = fetchPathByName(pageName, 'href')
    openNewWindow(path)
    return
  }
  if (isReplace) {
    router.replace({
      name: pageName,
    })
    return
  }
  router.push({
    name: pageName,
  })
}

/**
 * * Get route information by name
 * @param pageName
 * @param p
 */
export const fetchPathByName = (pageName: string, p?: string) => {
  try {
    const pathData = router.resolve({
      name: pageName,
    })
    return p ? (pathData as any)[p] : pathData
  } catch (error) {
    window['$message'].warning('Failed to fetch route information, please contact the administrator!')
  }
}

/**
 * * Navigate to route by path
 * @param path
 * @param query
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByPath = (
    path: string,
    query?: Array<string | number>,
    isReplace?: boolean,
    windowOpen?: boolean
) => {
  let fullPath = ''
  if (query?.length) {
    fullPath = `${path}/${query.join('/')}`
  }
  if (windowOpen) {
    return openNewWindow(fullPath)
  }
  if (isReplace) {
    router.replace({
      path: fullPath,
    })
    return
  }
  router.push({
    path: fullPath,
  })
}

/**
 * * Redirect to error page
 * @param code
 * @returns
 */
export const redirectErrorPage = (code: ResultEnum) => {
  if (!code) return false
  const pageName = ErrorPageNameMap.get(code)
  if (!pageName) return false
  routerTurnByName(pageName)
}

/**
 * * Reload the current route page
 */
export const reloadRoutePage = () => {
  routerTurnByName(PageEnum.RELOAD_NAME)
}

/**
 * * Logout
 */
export const logout = async () => {
  try {
    const res = await logoutApi()
    if (res && res.code === ResultEnum.SUCCESS) {
      window['$message'].success(window['$t']('global.logout_success'))
      clearCookie(RequestHttpHeaderEnum.COOKIE)
      clearLocalStorage(StorageEnum.GO_SYSTEM_STORE)
      routerTurnByName(PageEnum.BASE_LOGIN_NAME)
    }
  } catch (error) {
    window['$message'].success(window['$t']('global.logout_failure'))
  }
}

/**
 * * Open a new window
 * @param url
 */
export const openNewWindow = (url: string) => {
  return window.open(url, '_blank')
}

/**
 * * Open project documentation
 * @param url
 */
export const openDoc = () => {
  openNewWindow(docPath)
}

/**
 * * Open Gitee repository URL
 * @param url
 */
export const openGiteeSourceCode = () => {
  openNewWindow(giteeSourceCodePath)
}

/**
 * * Check if it is a preview page
 * @returns boolean
 */
export const isPreview = () => {
  return document.location.hash.includes('preview')
}

/**
 * * Get parameters of the current route
 * @returns object
 */
export const fetchRouteParams = () => {
  try {
    const route = useRoute()
    return route.params
  } catch (error) {
    window['$message'].warning('Failed to fetch route information, please contact the administrator!')
  }
}

/**
 * * Fetch current route parameters by hard parsing
 * @returns object
 */
export const fetchRouteParamsLocation = () => {
  try {
    // Prevent parsing ID error when adding query parameters
    return document.location.hash.split('?')[0].split('/').pop() || ''
  } catch (error) {
    window['$message'].warning('Failed to fetch route information, please contact the administrator!')
    return ''
  }
}

/**
 * * Go to the main page
 * @param confirm
 */
export const goHome = () => {
  routerTurnByName(PageEnum.BASE_HOME_NAME)
}

/**
 * * Check if logged in
 * @return boolean
 */
export const loginCheck = () => {
  try {
    const info = getLocalStorage(StorageEnum.GO_SYSTEM_STORE)
    if (!info) return false
    if (info[SystemStoreEnum.USER_INFO][SystemStoreUserInfoEnum.USER_TOKEN]) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

/**
 * * Preview URL
 * @returns
 */
export const previewPath = (id?: string | number) => {
  const { origin, pathname } = document.location
  const path = fetchPathByName(PreviewEnum.CHART_PREVIEW_NAME, 'href')
  const previewPath = `${origin}${pathname}${path}/${id || fetchRouteParamsLocation()}`
  return previewPath
}
