/*
 * @Date: 2022-07-30 11:30:02
 * @Description: 按钮组件
 */

Component({
  properties: {
    text: {
      type: String,
      value: '按钮',
    },
    width: {
      type: String,
      value: '300rpx',
    },
    type: {
      type: String,
      value: 'border', // primary border
    },
    customStyle: {
      type: String,
      value: '',
    },
    submit: {
      type: Boolean,
      value: false,
    },
  },
  options: {
    virtualHost: true,
  },
  data: {
    loading: false,
  },
  /** 自定义class */
  externalClasses: ['custom-class'],
  methods: {
    onTap() {
      if (!this.data.submit) {
        return
      }
      if (this.data.loading) {
        return
      }
      this.setData({ loading: true })
      const apply = async (fn) => {
        try {
          await fn?.()
        } finally {
          this.setData({ loading: false })
        }
      }
      this.triggerEvent('submit', { apply })
    },
  },
})

/** 触发提交 */
export function apply(callback) {
  return function ({ detail: { apply } }) {
    apply?.(async () => {
      await callback?.call(this)
    })
  }
}
