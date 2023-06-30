/*
 * @Date: 2022-02-25 11:14:39
 * @Description: 用于存放弹窗内容
 */

Component({
  options: {
    // 在组件定义时的选项中启用多slot支持
    multipleSlots: true,
  },
  properties: {
    visible: {
      type: Boolean,
      value: false, // 是否显示
    },
    closeIcon: {
      type: Boolean,
      value: false, // 是否显示关闭按钮
    },
    zIndex: {
      type: Number,
      value: 101,
    },
    tapMaskClosePopup: { // 点击遮罩关闭弹窗
      type: Boolean,
      value: false,
    },
  },
  data: {
    show: false,
  },
  observers: {
    visible() {
      // 根据变化来判断是否移除子组件
      if (this.data.visible) {
        this.setData({ show: true })
      } else {
        // 等待动画结束后在移除子组件
        setTimeout(() => {
          if (this.data.visible === false) {
            this.setData({ show: false })
          }
        }, 500)
      }
    },
  },
  methods: {
    // 点取消图标
    onCloseIcon() {
      this.triggerEvent('close')
    },
    // 点击遮罩
    onCloseMask() {
      this.triggerEvent('close')
    },
    // 空方法，关闭控制台警告
    onTouchmove() {},
  },
})
