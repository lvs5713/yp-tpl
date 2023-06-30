/*
 * @Date: 2022-07-27 10:50:19
 * @Description: 全局工具方法
 */

import { confirm, alert, jxAlert } from '@/components/base/custom-modal/core'
import { router } from './router'

export { confirm, alert, router, jxAlert }

/** 等待 */
export function wait(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

/** 消息提醒 */
export function msg(title, time = 2000) {
  return new Promise((resolve) => {
    wx.showToast({
      title,
      icon: 'none',
      duration: time,
    })
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

/** showModal提示 */
export function showModal(title, content) {
  return new Promise((resolve) => {
    wx.showModal({
      title,
      content,
      success(res) {
        resolve(true)
      },
    })
  })
}

/** 获取当前页面 */
export function getCurrentPage() {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  return page
}

/** 获取菜单按钮（右上角胶囊按钮）的布局位置信息 */
export const getMenuButtonBoundingClientRect = (() => {
  let value
  return () => {
    if (value && value.top && value.height) {
      return value
    }
    value = wx.getMenuButtonBoundingClientRect()
    return value
  }
})()

/** 获取系统信息 */
export const getSystemInfoSync = (() => {
  let value
  return () => {
    if (value) {
      return value
    }
    value = wx.getSystemInfoSync()
    return value
  }
})()

/** 获取通用系统信息 */
export const getCommonSystemInfo = (() => {
  let value
  return () => {
    if (value) {
      return value
    }
    const menuRect = $.getMenuButtonBoundingClientRect()
    const systemInfo = $.getSystemInfoSync()
    /** 胶囊距离顶部的距离 */
    const menuPadding = menuRect.top - systemInfo.statusBarHeight
    /** 胶囊的高度和padding */
    const headerHeight = menuRect.height + menuPadding * 2
    return {
      /** 顶部距离 */
      headerTop: headerHeight + systemInfo.statusBarHeight,
      headerHeight,
      menuPadding,
      statusBarHeight: systemInfo.statusBarHeight,
    }
  }
})()

/** 选择组件 */
export async function selectComponent(selector: string) {
  return new Promise((resolve, reject) => {
    const component = this.selectComponent(selector)
    component ? resolve(component) : reject()
  })
}

/** 生成一个唯一值 */
export const getIndex = (() => {
  let id = 0
  return () => {
    id += 1
    return Math.random().toString(36).slice(2) + id
  }
})()

/** 判断是否是ios设备 */
export const isIos = (() => {
  const { platform, system } = wx.getSystemInfoSync()
  // ! ios不能充值，为了方便调试这里对模拟器的情况增加了system判断
  return platform === 'ios' || platform === 'devtools' && (/ios/i).test(system)
})()
