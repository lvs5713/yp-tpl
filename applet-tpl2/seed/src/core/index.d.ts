/*
 * @Date: 2022-07-27 09:47:12
 * @Description: 类型提示
 */

/// <reference path="../components/custom-modal/type.d.ts" />

declare type $type = {
  request: Record<string, (data?: any, headers?: any) => Promise<[any, any]>>
  wait: (time?) => Promise<Void>
  // fetch: (options) => Promise<any>
  msg: (title, time?) => Promise<any>
  alert: Alert
  confirm: Confirm
  jxAlert: jxAlert
  /** 获取当前页面 */
  getCurrentPage: () => any
  showModal: ({ title: string, content: string }) => Promise<any>
  /** 路由器 */
  router: {
    push: (path: string, query?: Record<string, string | number>) => void
    beforeEach: (callback: (to: string, from: string, next: () => void, options: { type: string, url: string }) => void) => void
    replace: (path: string, query?: Record<string, string | number>) => void
    back: (v?: { delta?: number; params?: any }) => void
    reLaunch: (path: string, query?: Record<string, string | number>) => void
    getParams: () => any
    clearCurrentParams: () => void
    useRouter: () => viod
  }
  getMenuButtonBoundingClientRect: () => any
  getIndex: () => string
  getSystemInfoSync: () => any
  getCommonSystemInfo: () => any
  selectComponent: () => any
  isIos:Boolean
}
