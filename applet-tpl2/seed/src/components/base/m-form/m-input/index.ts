/*
 * @Date: 2022-02-09 13:58:22
 * @Description: 输入框
 */

import { formItem } from '../core'

Component(formItem()({
  externalClasses: ['custom-class', 'input-class'],
  properties: {
    placeholderStyle: {
      type: String,
      value: 'color: #bfbfbf',
    },
    maxlength: {
      type: null,
      value: 140,
    },
    disabled: {
      // 是否禁用
      type: Boolean,
      value: false,
    },
    type: {
      type: String,
      value: 'text',
    },
    placeholder: {
      type: String,
      value: '请输入',
    },
    password: {
      // 是否是密码类型
      type: Boolean,
      value: false,
    },
    value: {
      type: String || Number,
      value: '',
    },
    /** 自动获取焦点 */
    autoFocus: {
      type: Boolean,
      value: false,
    },
    /** 自动上推页面 */
    adjustPosition: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    focus: false,
    showInput: false,
    inputDisabled: true,
  },
  observers: {
    disabled() {
      if (this.data.disabled) {
        this.setData({ inputDisabled: this.data.disabled })
      }
    },
  },
  lifetimes: {
    ready() {
      const { disabled, autoFocus } = this.data
      if (disabled) {
        this.setData({ inputDisabled: this.data.disabled })
      }
      if (autoFocus) {
        this.onFocus()
      }
    },
  },
  methods: {
    onTap() {
      if (this.data.disabled) {
        return
      }
      this.setData({ inputDisabled: false, focus: true })
    },

    /** 输入框的输入事件 */
    onInput(e) {
      this.onChange(e.detail.value)
    },

    /** 失去焦点事件 */
    onBlur(e) {
      this.setData({ inputDisabled: true, focus: false })
      this.triggerEvent('blur', e.detail)
    },

    /** 聚焦事件 */
    onFocus(e) {
      this.setData({ inputDisabled: false, focus: true })
      e && this.triggerEvent('focus', e.detail)
    },
    /** 键盘高度变化 */
    onBindkeyboardheightchange(e) {
      this.triggerEvent('keyboardheightchange', e.detail)
    },
  },
}))
