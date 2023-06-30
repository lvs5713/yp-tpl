/*
 * @Date: 2022-09-26 10:48:54
 * @Description: form 组件逻辑
 */

import cloneDeep from '@/utils/cloneDeep/index'
import { verify } from './verify'

function createStore() {
  const values = {}
  const listener = {}

  function useListener(formName) {
    if (!listener[formName]) {
      listener[formName] = []
    }
    return listener[formName]
  }

  function useValues(formName) {
    if (!values[formName]) {
      values[formName] = {}
    }
    return values[formName]
  }

  /** 添加监听 */
  function subscribe(formName, callback) {
    useListener(formName).push(callback)
    return function unSubscribe() {
      const index = useListener(formName).indexOf(callback)
      useListener(formName).splice(index, 1)
    }
  }

  /** 更新表单值 */
  function onChange(formName, name, value) {
    // 保存值
    useValues(formName)[name] = value
    const newValues = useValues(formName)
    // 驱动表单更新
    useListener(formName).forEach((item) => item(newValues))
  }

  /** 获取表单值 为了防止拿到值后修改 */
  function getValues(formName) {
    return cloneDeep(useValues(formName))
  }

  /** 更新表单值 */
  function setValues(formName, values = {}) {
    Object.assign(useValues(formName), values)
    const newValues = useValues(formName)
    // 驱动表单更新
    useListener(formName).forEach((item) => item(newValues))
  }

  return {
    onChange,
    subscribe,
    getValues,
    setValues,
  }
}

const formStore = createStore()

/** 获取当前页面 */
function getCurrentPage() {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1] || {}
  return page
}

function getFormName() {
  return `formName-${Math.random().toString(36).slice(2)}`
}

/** form 表单组件使用 */
export function form() {
  return function (options: ComponentOptions = {}) {
    if (!options.properties) {
      options.properties = {}
    }

    options.properties.formName = {
      type: String,
      value: '',
    }

    if (!options.lifetimes) {
      options.lifetimes = {}
    }

    if (!options.methods) {
      options.methods = {}
    }

    /** 获取表单值 */
    options.methods.getValues = function () {
      return formStore.getValues(this.data.formName)
    }

    /** 设置表单值 */
    options.methods.setValues = function (values) {
      return formStore.setValues(this.data.formName, values)
    }

    /** 表单验证 */
    options.methods.verify = function (rules = {}) {
      const values = formStore.getValues(this.data.formName)
      // eslint-disable-next-line no-restricted-syntax
      for (const name in rules) {
        // 循环传入的条件
        if (Object.prototype.hasOwnProperty.call(rules, name)) {
          const item = rules[name]
          const value = values[name]
          // 循环传入的条件的每一项的数组
          for (let i = 0; i < item.length; i++) {
            const rule = item[i]
            // eslint-disable-next-line no-restricted-syntax
            for (const test in rule) {
              // 根据每一项在去匹配验证规则
              if (Object.prototype.hasOwnProperty.call(rule, test)) {
                if (verify[test]) {
                  const t = rule[test]
                  const result = verify[test](t, value)
                  if (result) {
                    // 错误提示
                    $.msg(rule.message)
                    return Promise.reject(new Error(rule.message))
                  }
                }
              }
            }
          }
        }
      }
      return values
    }

    const { attached, detached } = options.lifetimes

    // 创建的时候
    options.lifetimes.attached = function (...args) {
      // 如果没有传入 formName 就用默认的
      if (!this.data.formName) {
        const page = getCurrentPage()
        page.formName = getFormName()
        this.data.formName = page.formName
      }
      // 设置一个名字，用传入的或者随机的
      attached && attached.call(this, ...args)
    }

    // 销毁的时候
    options.lifetimes.detached = function (...args) {
      detached && detached.call(this, ...args)
    }

    return options
  }
}

/** form item 使用 */
export function formItem() {
  return function (options: ComponentOptions) {
    if (!options.properties) {
      options.properties = {}
    }

    options.properties.name = {
      type: String,
      value: '',
    }

    options.properties.formName = {
      type: String,
      value: '',
    }

    options.properties.customValue = {
      type: null,
      value: null,
    }

    if (!options.data) {
      options.data = {}
    }

    if (!options.lifetimes) {
      options.lifetimes = {}
    }

    if (!options.methods) {
      options.methods = {}
    }

    if (!options.observers) {
      options.observers = {}
    }

    options.observers.customValue = function () {
      if (this.data.customValue && this.data.value !== this.data.customValue) {
        this.setData({ value: this.data.customValue })
      }
    }
    // 挂载组件获取全局formStore的方法
    options.methods.getValues = function () {
      const formName = this.data.formName || getCurrentPage().formName
      return formStore.getValues(formName)
    }

    options.methods.onChange = function (value) {
      const formName = this.data.formName || getCurrentPage().formName
      const { name } = this.data
      this.triggerEvent('change', { value })

      if (!formName) {
        return
      }
      if (!name) {
        return
      }
      formStore.onChange(formName, name, value)
    }

    const { attached, detached } = options.lifetimes

    // 创建的时候
    options.lifetimes.attached = function (...args) {
      const formName = this.data.formName || getCurrentPage().formName
      const { name } = this.data
      if (formName && name) {
        // 创建的时候更新值
        const value = formStore.getValues(formName)[name]
        if (value !== undefined && this.data.value !== value) {
          this.setData({ value })
        }
        // 监听值的改变，重复赋值
        this.unSubscribe = formStore.subscribe(formName, (values) => {
          // 当表单的任何一个Form.Item表单字段发生变化都会触发
          if (this.onFormValueChange) {
            this.onFormValueChange(cloneDeep(values))
          }
          // 判断值变化，更新视图
          const value = values[name]
          if (value !== undefined && this.data.value !== value) {
            this.setData({ value })
          }
        })
      }
      attached && attached.call(this, ...args)
    }

    // 销毁的时候
    options.lifetimes.detached = function (...args) {
      this.unSubscribe && this.unSubscribe()
      detached && detached.call(this, ...args)
    }

    return options
  }
}
