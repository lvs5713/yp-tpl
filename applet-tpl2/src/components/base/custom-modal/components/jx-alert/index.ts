Component({
  properties: {
    options: {
      type: {
        // 弹窗内容
        content: String,
        // 弹窗标题
        title: String,
        // 确定按钮文案
        confirmText: String,
        // 取消按钮文案
        cancelText: String,
        // 弹窗类型
        mode: 'warn' || 'succ' || 'error' || 'confirm',
        // 是否显示关闭按钮
        hideClose: Boolean,
        // 内容图片
        contentImage: String,
      },
      value: {
        // 弹窗内容
        content: String,
        // 弹窗标题
        title: '温馨提示',
        // 确定按钮文案
        confirmText: '确定',
        // 取消按钮文案
        cancelText: '取消',
        // 弹窗类型
        mode: 'warn',
        // 是否显示关闭按钮
        hideClose: false,
        contentImage: '',
      },
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
  observers: {
    'options.content': function (value) {
      this.setData({ isArray: Array.isArray(value) })
    },
  },
  data: {
    isArray: false,
  },
  methods: {
    setConfig(config) {
      this.setData({
        ...this.data,
        ...config,
      })
    },
    onAction(event) {
      const { type } = event.target.dataset
      this.triggerEvent('action', { type, modalKey: this.data.modalKey })
    },
    onTouchmove() {},
  },
  pageLifetimes: {
    hide() {
      this.setData({
        visible: false,
      })
    },
  },
})
