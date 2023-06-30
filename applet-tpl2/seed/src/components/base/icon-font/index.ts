/*
 * @Date: 2022-01-04 11:23:28
 * @Description: icon 主要解决在组件中无法使用icon问题
 */

Component({
  externalClasses: ['custom-class'],
  options: {
    virtualHost: true,
  },
  properties: {
    hover: {
      type: Boolean,
      value: false,
    },
    // 图标类型 https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.13&manage_type=myprojects&projectId=2462509
    type: {
      type: String,
      value: '',
    },
    // 图标大小
    size: {
      type: String,
      value: '48rpx', // 对应 24px
    },
    // 图标颜色
    color: {
      type: String,
      value: '',
    },
  },
})
