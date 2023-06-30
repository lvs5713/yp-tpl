/*
 * @Date: 2022-10-05 10:37:37
 * @Description: 弹窗组件
 */

Component({
  properties: {
    options: {
      type: null,
      value: {},
    },
    visible: {
      type: Boolean,
      value: false,
    },
    modalKey: {
      type: String,
      value: '',
    },
    showCloseBtn: {
      type: Boolean,
      value: false,
    },
  },
  methods: {
    // 点确定
    onSure() {
      this.triggerEvent('resolve', { modalKey: this.data.modalKey })
    },
    onClose() {
      this.triggerEvent('reject', { modalKey: this.data.modalKey })
    },
    onTouchmove() {},
  },
})
