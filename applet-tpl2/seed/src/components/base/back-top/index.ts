/*
 * @Date: 2022-01-20 14:58:19
 * @Description: 回到顶部
 */
Component({
  componentPage: {
    onPageScroll,
  },
  data: {
    visible: false,
    loadedComp: false,
  },
  methods: {
    onTop() {
      wx.pageScrollTo({ scrollTop: 0 })
    },
    unloadComp() {
      this.setData({ loadedComp: false })
    },
  },
})

/** 不添加节流 */
function onPageScroll({ scrollTop }) {
  if (scrollTop > 800) {
    if (this.data.visible) {
      return
    }
    this.setData({ visible: true, loadedComp: true })
  } else {
    if (!this.data.visible) {
      return
    }
    this.setData({ visible: false })
  }
}
