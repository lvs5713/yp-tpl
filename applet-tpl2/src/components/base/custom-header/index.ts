/*

 * @Date: 2021-12-29 13:43:16
 * @Description: 自定义头部
 */

const headerClientRect = $.getMenuButtonBoundingClientRect()
Component({
  externalClasses: ['custom-content-class'],
  options: {
    virtualHost: true,
    multipleSlots: true,
  },
  properties: {
    title: {
      type: String,
      value: '',
    },
    customStyle: {
      type: String,
      value: '',
    },
    customBack: {
      type: Boolean,
      value: false,
    },
    paddingTop: {
      type: Number,
      value: headerClientRect.top,
    },
    height: {
      type: Number,
      value: headerClientRect.height,
    },
    /** 是否展示返回箭头 */
    showArrow: {
      type: Boolean,
      value: true,
    },
    fixed: {
      type: Boolean,
      value: true,
    },
    /** 自定义的渐变背景 */
    isCustomBg: {
      type: Boolean,
      valye: false,
    },
  },
  data: {
  },

  methods: {
    onBack() {
      if (this.data.customBack) {
        this.triggerEvent('back')
      } else {
        $.router.back()
      }
    },

    /** 点击导航标题触发 */
    onTitleClick() {
      this.triggerEvent('titleClick')
    },

    /** 禁止滚动操作 */
    onDisableMove() { },
  },
})
