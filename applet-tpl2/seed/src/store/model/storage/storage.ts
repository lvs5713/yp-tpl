/*
 * @Date: 2022-01-11 13:53:55
 * @Description: storage 工具类
 */

import initialState from './initialState'

const storage = {
  getItem(key) {
    const value = wx.getStorageSync(key)
    if (value === '') {
      return initialState[key]
    }
    return value
  },
  setItem(key, value) {
    wx.setStorageSync(key, value)
  },
  removeItem(key) {
    wx.removeStorageSync(key)
  },
  /** 异步删除所有数据 */
  clear() {
    wx.clearStorageSync()
  },
}

export default storage
