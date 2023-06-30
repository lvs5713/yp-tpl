/*
 * @Date: 2022-07-26 15:18:44
 * @Description: 功能增强
 */

import { connect, connectPage } from './mini-redux/index'
import { publishPage, subscribeComponent } from './component-page/index'
import { request } from './request/index'
import {
  wait,
  msg,
  showModal,
  confirm,
  jxAlert,
  alert,
  getCurrentPage,
  router,
  getMenuButtonBoundingClientRect,
  getIndex,
  getSystemInfoSync,
  getCommonSystemInfo,
  selectComponent,
  isIos,
} from './utils/index'

const oldPage = Page
const oldComponent = Component

/** 对Page 加强，支持 useStore 更新 data */
const Page1 = function (options) {
  if (options.useStore) {
    return oldPage(connectPage(options.useStore, options.shouldComponentUpdate)(options))
  }
  return oldPage(options)
}

/** 对Component 加强，支持 useStore 更新 data */
const Component1 = function (options) {
  if (options.useStore) {
    return oldComponent(connect(options.useStore, options.shouldComponentUpdate)(options))
  }
  return oldComponent(options)
}

/** 对Page 加强，支持 componentPage 组件监听页面事件 */
Page = function (options) {
  if (options.componentPage) {
    return Page1(publishPage(options.componentPage)(options))
  }
  return Page1(options)
}

/** 对Component 加强，支持 subscribeComponent 组件监听页面事件 */
Component = function (options) {
  if (options.componentPage) {
    return Component1(subscribeComponent(options.componentPage)(options))
  }
  return Component1(options)
}

/** 挂载全局数据 $ */
const g = (globalThis as any)
g.$ = {
  request,
  wait,
  msg,
  showModal,
  alert,
  confirm,
  jxAlert,
  getCurrentPage,
  router,
  getMenuButtonBoundingClientRect,
  getIndex,
  getSystemInfoSync,
  getCommonSystemInfo,
  selectComponent,
  isIos,
}
