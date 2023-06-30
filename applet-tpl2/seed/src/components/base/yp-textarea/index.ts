/*
 * @Date: 2023-05-15 15:19:19
 * @Description: file content
 */
Component({
  externalClasses: ['custom-class'],
  properties: {
    value: { type: String, value: '' },
    placeholderStyle: { type: String, value: 'color: #bfbfbf' },
    disabled: { type: Boolean, value: false },
    placeholder: { type: String, value: '' },
    maxlength: { type: Number, value: 140 },
    autoFocus: { type: Boolean, value: false },
    /** 是否处理页面被顶上去的问题 */
    isStrike: { type: Boolean, value: true },
    adjustposition: { type: Boolean, value: false },
    cursorSpacing: { type: Number, value: 20 },
  },
  data: {
    inputDisabled: true,
    focus: false,
  },
  lifetimes: {
    created() {
      if (this.data.autoFocus) {
        this.onTap()
      }
    },
  },
  methods: {
    onTap() {
      this.setData({ inputDisabled: false }, () => {
        this.setData({ focus: true })
      })
    },
    onBlur(e) {
      this.setData({ inputDisabled: true, focus: false })
      this.triggerEvent('blur', e.detail)
    },
    onInput(e) {
      if (this.data.focus || !this.data.isStrike) { // 修复字节失去焦点内容为空
        this.triggerEvent('input', e.detail)
      }
    },
    onShowTextArea() {
      this.setData({ inputDisabled: false, focus: true })
    },
  },
})
