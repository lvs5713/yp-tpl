/*
 * @Date: 2023-05-25 18:16:38
 * @Description: 表单验证规则
 */
/** 表单验证的规则 */
export const verify = {
  /** 为空的匹配 */
  required(rule, value) {
    if (rule === true) {
      if (Array.isArray(value) && value.length == 0) {
        return true
      }
      if (typeof value === 'object') {
        return false
      }
      if (typeof value === 'number') {
        return false
      }
      if (Array.isArray(value) && value.length == 0) {
        return true
      }
      if (value === undefined) {
        return true
      }
      return value?.trim() === ''
    }
    return false
  },
  length: (rule, value) => value.length > rule,
  // 匹配电话
  phone: (rule, value) => {
    if (rule) {
      return !/^(1[3-9][0-9])\d{8}$/.test(value)
    }
    return false
  },
  // 字符长度范围限制
  lengthRange: (rule:{max:number, min:number}, value) => {
    if (rule) {
      const length = value?.length ?? 0
      return !(length >= rule.min && length <= rule.max)
    }
    return false
  },
  // 正则匹配
  pattern: (rule, value) => {
    if (rule) {
      return !rule.test(value)
    }
    return false
  },
  // 函数匹配
  func: (rule, value) => {
    if (rule) {
      return !rule(value)
    }
    return false
  },
  // 数字字母中文
  publicText: (rule, value) => {
    if (rule) {
      return !/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(value)
    }
    return false
  },
  // 只能输入数字
  onlyNumber: (rule, value) => {
    if (rule) {
      return !/^[0-9]+$/.test(value)
    }
    return false
  },
  // 只能输入字母
  onlyLetter: (rule, value) => {
    if (rule) {
      return !/^[A-Za-z]+$/.test(value)
    }
    return false
  },
  // 包含中文
  chinese: (rule, value) => {
    if (rule) {
      return !/[\u4e00-\u9fa5]+/.test(value)
    }
    return false
  },
}
