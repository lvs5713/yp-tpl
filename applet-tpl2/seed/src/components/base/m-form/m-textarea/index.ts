/*
 * @Date: 2022-02-11 18:02:45
 * @Description: textarea
 */

import { formItem } from '../core'

Component(formItem()({
  externalClasses: ['custom-class', 'custom-class-footer'],
  properties: {
    disabled: { // 是否禁用
      type: Boolean,
      value: false,
    },
    placeholder: { type: String, value: '' },
    cursorSpacing: { type: Number, value: 0 },
    /** 是否展示clear按钮 */
    showClear: {
      type: Boolean,
      value: true,
    },
    /** 文字最大长度 */
    maxlength: {
      type: Number,
      value: 500,
    },
    /** placeholder的样式 */
    placeholderStyle: {
      type: String,
      value: 'color: #bfbfbf',
    },
    /** 自动聚焦，拉起键盘 */
    autoFocus: {
      type: Boolean,
      value: false,
    },
    /** 是否处理页面被顶上去的问题-和微信小程序穿透问题 */
    isStrike: { type: Boolean, value: false },
    /** 键盘出现，页面推动 */
    adjustposition: { type: Boolean, value: false },
  },
  data: {
    value: '',
  },
  methods: {
    // 清空
    onClear() {
      this.onChange('')
    },
    onTextChange({ detail }) {
      // 安卓机上粘贴会超出限制
      const value = detail.value.slice(0, this.data.maxlength)
      this.onChange(value)
    },
  },
}))
