/*
 * @Date: 2022-02-09 11:02:56
 * @Description: 弹窗展示
 */

/** 滑行方向 */
enum SLIDE_DIRECTION {
  /** 从上往下 */
  top = 'down',
  /** 从下往上 */
  bottom = 'up',
  /** 从左往右 */
  left = 'right',
  /** 从右往左 */
  right = 'left',
}

/** 滑行位置 */
enum SLIDE_POSITION {
  /** 屏幕上方 */
  top = 'top',
  /** 屏幕底部 */
  bottom = 'bottom',
  /** 屏幕左上 */
  left = 'left',
  /** 屏幕右上 */
  right = 'right',
}

// 默认使用抽屉组件的子元素都需要 100vw 的宽度
const mixedSty = 'position: fixed; width: 100vw;'

const posStyle = new Map([
  [SLIDE_POSITION.top, `${mixedSty} top: 0; left: 0;`],
  [SLIDE_POSITION.bottom, `${mixedSty} top: auto; bottom: 0; left: 0;`],
  [SLIDE_POSITION.left, `${mixedSty} top: 0; left: 0; right: auto;`],
  [SLIDE_POSITION.right, `${mixedSty} left: auto; right: 0; top: 0;`],
])

Component({
  options: {
    virtualHost: true,
  },
  properties: {
    /** 控制弹窗是否展示--外部控制器 */
    visible: { type: Boolean, value: false },
    /** 点击遮罩是否可以关闭，默认: false */
    isMaskClose: { type: Boolean, value: false },
    /** 动画效果，可选值：top(从上出来) | bottom(从下出来) | left(从左出来) | right(从右出来) */
    animation: { type: String, value: 'bottom' },
    /** 抽屉组件出现的屏幕位置 */
    position: {
      type: String,
      value: 'bottom',
      observer(v: SLIDE_POSITION) {
        this.setData({ positionStyle: posStyle.get(v) })
      },
    },
    /** 弹窗层级控制 */
    zIndex: { type: Number, value: 10000 },
    /** 是否显示m-stripes 安全距离的默认白色背景 */
    isStripesBg: {
      type: Boolean, value: true,
    },
  },
  data: {
    /** wx:if控制器 */
    show: false,
    /** body动画 */
    /** 滑行方向 */
    slideDir: null,
    /** 滑行位置 */
    slidePos: null,
    /** 蒙版透明度动画 */
    openedOpacity: false,
    /** 位置的样式，这是为了兼容百度，问题已上报百度，等待百度修复，查看这则[帖子](https://smartprogram.baidu.com/forum/topic/show/157864)，完成修复后即可删除，然后使用 position-class 替换 */
    positionStyle: posStyle.get(SLIDE_POSITION.bottom),
  },
  observers: {
    visible() {
      this.setReallyValue()
    },
    /** 动画效果 */
    animation() {
      this.setAnimation()
    },
  },
  lifetimes: {
    attached() {
      this.setAnimation()
      this.setReallyValue()
    },
  },
  methods: {
    /** 点击遮罩事件 */
    onMaskTap() {
      if (this.data.isMaskClose) {
        this.onClose()
        this.triggerEvent('close')
      }
    },
    /** 关闭事件 */
    onClose() {
      this.setData({ visible: false })
    },
    /** 配置真实的参数 */
    setReallyValue() {
      const { visible } = this.data
      if (visible) {
        this.setData({ show: true })
      } else {
        this.setData({ openedOpacity: false })
      }
    },
    /** 配置动画方向 */
    setAnimation() {
      const type = this.data.animation
      const pos = this.data.position
      /** 默认为底部向下 */
      this.setData({
        slideDir: SLIDE_DIRECTION[type],
        slidePos: SLIDE_POSITION[pos],
      })
    },
    /** 禁止滚动操作 */
    onDisableMove() {},
    /** 滑行动画退场动画执行完毕 */
    slideExited() {
      this.setData({ show: false })
      this.triggerEvent('hide')
    },
    /** 滑行动画入场动画开始了 */
    slideEntering() {
      this.triggerEvent('show')
      this.setData({ openedOpacity: true })
    },
  },
})
