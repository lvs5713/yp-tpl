/*
 * @Date: 2022-01-21 09:20:11
 * @Description: PageOptions
 */

/** PageOptions */
declare type PageOptions = Partial<{
  /** 页面的初始数据 */
  data: Record<string, any>
  /** 页面的组件选项，同 Component 构造器 中的 options ，需要基础库版本 2.10.1 */
  options: Record<string, any>
  /** 生命周期回调—监听页面加载 */
  onLoad: Function
  /** 生命周期回调—监听页面显示 */
  onShow: Function
  /** 生命周期回调—监听页面初次渲染完成 */
  onReady: Function
  /** 生命周期回调—监听页面隐藏 */
  onHide: Function
  /** 生命周期回调—监听页面卸载 */
  onUnload: Function
  /** 监听用户下拉动作 */
  onPullDownRefresh: Function
  /** 页面上拉触底事件的处理函数 */
  onReachBottom: Function
  /** 用户点击右上角转发 */
  onShareAppMessage: Function
  /** 用户点击右上角转发到朋友圈 */
  onShareTimeline: Function
  /** 用户点击右上角收藏 */
  onAddToFavorites: Function
  /** 页面滚动触发事件的处理函数 */
  onPageScroll: Function
  /** 页面尺寸改变时触发，详见 响应显示区域变化 */
  onResize: Function
  /** 当前是 tab 页时，点击 tab 时触发 */
  onTabItemTap: Function
  /** 页面销毁前保留状态回调 */
  onSaveExitState: Function
  /** 其他自定义方法和数据 */
  [key: string]: any
}>