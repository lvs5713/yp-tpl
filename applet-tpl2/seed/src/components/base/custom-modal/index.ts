/*
 * @Date: 2022-07-26 19:48:12
 * @Description: 弹窗组件
 */

import { store } from './core'

Component({
  data: {
    list: [],
  },
  lifetimes: {
    attached() {
      this.unSubscribe = store.subscribe((options, type, modalKey) => {
        return new Promise((resolve, reject) => {
          this.resolve = resolve
          this.reject = reject
          this.onShow(options, type, modalKey)
        })
      })
    },
    detached() {
      this.unSubscribe && this.unSubscribe()
    },
  },
  methods: {
    // 弹窗显示
    onShow(options, type, modalKey) {
      const { list } = this.data
      // 添加一个弹窗到数组中
      this.setData({
        list: list.concat({ type, options, visible: false, modalKey }),
      })
      setTimeout(() => this.onUpdate(modalKey, true), 50)
    },
    onResolve({ detail: { modalKey } }) {
      this.onUpdate(modalKey, false)
      setTimeout(() => {
        this.onRemove(modalKey)
        this.resolve()
      }, 500)
    },
    onReject({ detail: { modalKey } }) {
      this.onUpdate(modalKey, false)
      setTimeout(() => {
        this.onRemove(modalKey)
        this.reject()
      }, 500)
    },
    // 更新指定 modalKey 的显示隐藏
    onUpdate(modalKey, visible) {
      const record = this.data.list.find((item) => item.modalKey === modalKey)
      record.visible = visible
      this.setData({ list: this.data.list.concat() })
    },
    // 移除弹窗
    onRemove(modalKey) {
      this.setData({ list: this.data.list.filter((item) => item.modalKey !== modalKey) })
    },
    // 自定义弹窗操作
    onAction(event) {
      const { type, modalKey } = event.detail
      this.onUpdate(modalKey, false)
      setTimeout(() => {
        this.onRemove(modalKey)
        if (type === 'sure') {
          this.resolve()
          // 点击取消按钮，或者，点击ICON 图片的关闭按钮
        } else if (type === 'cancel' || type === 'close') {
          // 吧关闭按钮的类型传递出去
          this.reject(type)
        }
      }, 500)
    },
  },
})
