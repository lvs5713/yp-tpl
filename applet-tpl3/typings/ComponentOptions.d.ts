/*
 * @Date: 2022-01-21 09:17:43
 * @Description: ComponentOptions
 */

/** ComponentOptions */
declare type ComponentOptions = Partial<{
  /** 选项 */
  options: Record<string, any>
  /** props */
  properties: Record<string, { type: any; value: any } | Object>
  /** 私有数据，可用于模板渲染 */
  data: Record<string, any>
  /** 数据变化 */
  observers: Record<string, any>
  /** 生命周期函数 */
  lifetimes: Partial<{
    /** 在组件实例刚刚被创建时执行 */
    created: Function
    /** 在组件实例进入页面节点树时执行 */
    attached: Function
    /** 在组件在视图层布局完成后执行 */
    ready: Function
    /** 在组件实例被移动到节点树另一个位置时执行 */
    moved: Function
    /** 在组件实例被从页面节点树移除时执行 */
    detached: Function
    /** 每当组件方法抛出错误时执行 */
    error: Function
  }>
  /** 组件所在页面的生命周期函数 */
  pageLifetimes: Partial<{
    /** 组件所在的页面被展示时执行 */
    show: Function
    /** 组件所在的页面被隐藏时执行 */
    hide: Function
    /** 组件所在的页面尺寸变化时执行 */
    resize: Function
  }>
  /** 方法 */
  methods: Record<string, Function>
  /** 其他自定义方法和数据 */
  [key: string]: any
}>