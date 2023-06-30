/*
 * @Date: 2022-02-10 09:39:18
 * @Description: 表单布局
 */

Component({
  externalClasses: ['custom-item-class', 'custom-label-class'],
  options: {
    // 在组件定义时的选项中启用多slot支持
    multipleSlots: true,
  },
  properties: {
    label: {
      type: String,
      value: '',
    },
    labelWidth: {
      type: String,
      value: '160rpx',
    },
    icon: {
      type: Boolean,
      value: false,
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    border: {
      type: Boolean,
      value: true,
    },
    required: {
      type: Boolean,
      value: false,
    },
  },
})
