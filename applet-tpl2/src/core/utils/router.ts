/*
 * @Date: 2022-11-10 11:56:20
 * @Description: 路由控制
 */
import { tabBarPages } from '../config/index'
/** 路由控制 */
export const router = (() => {
  /** back返回时,传递params参数，通过getParams() 获取 */
  let params = null

  /** 全局路由拦截注册的回调函数 */
  let routerInterceptCallback = null

  /** 路由api */
  const routerApi = {
    switchTab: wx.switchTab,
    reLaunch: wx.reLaunch,
    redirectTo: wx.redirectTo,
    navigateTo: wx.navigateTo,
  }

  function joinSearch(query = {}) {
    return `?${Object.keys(query).map((key) => {
      return `${key}=${query[key]}`
    }).join('&')}`
  }

  function switchTab(path, query?) {
    if (tabBarPages.includes(path)) {
      // 如果存在参数，就保存起来
      params = query || null
      wx.switchTab({
        url: path,
        complete() {
          // 在安卓上表现为跳转和complete方法同步执行了。导致调转过去参数值已经被清空了
          const timer = setTimeout(() => {
            clearTimeout(timer)
            // 跳转成功后，直接清除调。
            clearCurrentParams()
          }, 200)
        },
      })
      return true
    }
    return false
  }

  function push(path, query) {
    if (switchTab(path, query)) {
      return
    }
    wx.navigateTo({ url: `${path}${query ? joinSearch(query) : ''}` })
  }

  function replace(path, query) {
    if (switchTab(path)) {
      return
    }
    wx.redirectTo({ url: `${path}${query ? joinSearch(query) : ''}` })
  }

  function reLaunch(path, query) {
    wx.reLaunch({ url: `${path}${query ? joinSearch(query) : ''}` })
  }

  function back(options) {
    const pages = getCurrentPages()
    if (pages.length === 1) {
      switchTab(tabBarPages[0])
    } else {
      // 吧返回的参数赋值 (非常重要的back传递参数) 很多地方使用，不要删除！！！
      params = options?.params || null
      wx.navigateBack({
        delta: options?.delta || 1,
        complete() {
          // 在安卓上表现为跳转和complete方法同步执行了。导致调转过去参数值已经被清空了
          const timer = setTimeout(() => {
            clearTimeout(timer)
            // 跳转成功后，直接清除调。
            clearCurrentParams()
          }, 200)
        },
      })
    }
  }

  /** 获取params */
  function getParams() {
    return params
  }

  /** 清除当前页params */
  function clearCurrentParams() {
    params = null
  }

  /** 全局注册的路由拦截方法 */
  function beforeEach(callback) {
    routerInterceptCallback = callback
  }

  /** 执行全局注册的路由拦截方法 */
  const exeIntercept = (options, type) => {
    if (typeof routerInterceptCallback === 'function') {
      const currentInstance = getPageInstance()
      const from = currentInstance.route
      const to = options.url
      const next = () => routerApi[type](options)
      routerInterceptCallback(to, from, next, { ...options, type })
    }
  }

  // 监听微信路由api
  Object.keys(routerApi).forEach((apiName: any) => {
    Object.defineProperty(wx, apiName, {
      enumerable: true,
      configurable: true,
      get() {
        return (options) => exeIntercept(options, apiName)
      },
    })
  })

  // 获取路由信息
  const useRouter = (() => {
    const person = {
      setValue(value = { to: '', from: '', next: () => { }, interceptNext: () => $.router.back(), params: {} }) {
        Object.keys(value).forEach((key) => {
          routerInfo[key] = value[key]
        })
      },
    }

    const routerInfo = Object.create(person)
    // 初始化
    routerInfo.setValue()
    return () => routerInfo
  })()

  return {
    beforeEach,
    push,
    replace,
    back,
    reLaunch,
    getParams,
    clearCurrentParams,
    useRouter,
  }
})()

// 获取当前页面
function getPageInstance() {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}
