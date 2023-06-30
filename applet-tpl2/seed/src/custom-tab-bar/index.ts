/*
 * @Date: 2023-04-17 09:59:09
 * @Description: file content
 */
// custom-tab-bar/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    /** 当前选中的栏目 */
    active: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击tab的时候
    async onClickTab(e) {
      const { id, path } = e.currentTarget.dataset
      $.router.push(path)
    },
  },
  lifetimes: {
    created() {
    },
    ready() {
      // 设置页面选中
      const page = $.getCurrentPage()
      if (page) {
        const { route } = page
        if (route === 'pages/index/index') {
          this.setData({ active: 'index' })
        }
        if (route === 'pages/recruit/index') {
          this.setData({ active: 'recruit' })
        }
      }
    },
  },
  pageLifetimes: {
    show() {},
  },
})
