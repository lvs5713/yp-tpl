/*
 * @Date: 2022-01-26 10:10:37
 * @Description: a 标签，按下变透明效果
 */

Component({
  options: {
    virtualHost: true,
  },
  properties: {
    bold: { // 是否文字加粗
      type: Boolean,
      value: false,
    },
    size: {
      type: String,
      value: '28rpx',
    },
  },
  externalClasses: ['custom-class'],
})
