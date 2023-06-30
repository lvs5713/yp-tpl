/*
 * @Date: 2022-10-05 10:40:23
 * @Description: 弹窗
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
  },
  methods: {
    // 点取消
    onCancel() {
      this.triggerEvent('reject', { modalKey: this.data.modalKey })
    },
    // 点确定
    onSure() {
      this.triggerEvent('resolve', { modalKey: this.data.modalKey })
    },
    onTouchmove() {},
  },
})
