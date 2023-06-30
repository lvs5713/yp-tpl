/* eslint-disable */
/*
 * @Date: 2022-01-05 11:03:54
 * @Description: 组件和页面通信，组件可以使用页面全部方法
 */

const pubSub = createPublishSubscribe()

// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html
// 支持的事件
const defaultEvents = [
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onShareTimeline',
  'onAddToFavorites',
  'onPageScroll',
  'onResize',
  'onTabItemTap',
  'onSaveExitState',
]

type Events = Partial<{
  onLoad: Function
  onShow: Function
  onReady: Function
  onHide: Function
  onUnload: Function
  onPullDownRefresh: Function
  onReachBottom: Function
  onShareAppMessage: Function
  onShareTimeline: Function
  onAddToFavorites: Function
  onPageScroll: Function
  onResize: Function
  onTabItemTap:  Function
  onSaveExitState: Function
}>

// 组件监听事件
export function subscribeComponent(pageEvents: Events) {
  return function (options: ComponentOptions) {
    if (!options.lifetimes) {
      options.lifetimes = {}
    }

    const { attached: oldAttached, detached: oldDetached } = options.lifetimes

    options.lifetimes.attached = function(...args) {
      this.unSubscribeComponent = pubSub.subscribe((event, args) => {
        if (typeof pageEvents[event] === 'function') {
          pageEvents[event].call(this, ...args)
        }
      })
      oldAttached && oldAttached.call(this, ...args)
    }

    options.lifetimes.detached = function(...args) {
      this.unSubscribeComponent && this.unSubscribeComponent()
      oldDetached && oldDetached.call(this, ...args)
    }

    return options
  }
}

// 页面发布事件
export function publishPage(events = defaultEvents) {
  return function (options) {
    events.forEach((event) => {
      const oldEvent = options[event]
      options[event] = function (...args) {
        pubSub.publish(event, args)
        return oldEvent && oldEvent.call(this, ...args)
      }
    })
    return options
  }
}

// 创建发布订阅
function createPublishSubscribe() {
  const listener = {}

  function subscribe(fn: Function) {
    const { route } = currentPage()
    if (!listener[route]) {
      listener[route] = []
    }
    listener[route].push(fn)

    return function unSubscribe() {
      listener[route].splice(listener[route].indexOf(fn), 1)
    }
  }

  function publish(eventType, args) {
    const { route } = currentPage()
    listener[route]?.forEach((item) => {
      item(eventType, args)
    });
  }

  return {
    subscribe,
    publish,
    listener,
  }
}

// 获取当前页面路由信息
function currentPage() {
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}
