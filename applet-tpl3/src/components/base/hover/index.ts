/*
 * @Date: 2022-08-04 13:55:08
 * @Description: hover 组件
 */

Component({
  externalClasses: ['custom-class'],
  options: {
    virtualHost: true,
  },
  properties: {
    opacity: {
      type: Boolean,
      value: false,
    },
    bgc: {
      type: Boolean,
      value: false,
    },
    customStyle: {
      type: String,
      value: '',
    },
  },
})
