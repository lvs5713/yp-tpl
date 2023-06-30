/*
 * @Date: 2021-12-15 11:31:46
 * @Description: 校验、正则相关工具，所有函数名均以is开头
 */

/** 判断手机机型，根据机型做一些性能优化 true 高端机，false 低端机 */
export const phoneType = (): boolean => {
  const result = $.getSystemInfoSync()
  // 如果是ios就认为是高端机
  if (/^iOS/.test(result.system)) {
    return true
  }
  // 安卓需要区分安卓系统版本
  if (result.platform === 'android') {
    const [, version] = result.system.split(' ')
    // 如果小于安卓7的就默认为低端机
    if (Number(version) <= 7) {
      return false
    }
    return true
  }
  return true
}

/**
 * @name: isPhone for jsxin
 * @params: tel: string 当前需要验证的手机号
 * @return: boolean
 * @description: 验证传入的手机号是否为真
 */
export const isPhone = (tel: string | undefined): boolean => {
  if (!tel) {
    return false
  }
  const reg = /^1[3-9]\d{9}$/
  return reg.test(tel)
}

/**
 * @params: null
 * @return: boolean
 * @description:  判断当前机型是否是ios设备
 */
export const isIos = (() => {
  let platform
  return (): boolean => {
    if (!platform) {
      platform = $.getSystemInfoSync().platform
    }
    return platform.toLowerCase() === 'ios'
  }
})()

/**
 * @params: null
 * @return: boolean
 * @description:  判断当前机型是否是ios设备
 */
export const isAndroid = (() => {
  let platform
  return (): boolean => {
    if (!platform) {
      platform = $.getSystemInfoSync().platform
    }
    return platform.toLowerCase() === 'android'
  }
})()
/**
 * @name: randIntNumber for jsxin
 * @params: min: number 最小区间(包括)
 * @params: max: number 最大区间(不包括)
 * @return: number 生成的随机数
 * @description: 生成一个在 [min-max) 该区间的整数
 */
export const randIntNumber = (min = 0, max = 20): number => {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * @name: isRequire for jsxin
 * @params: val: string 传入需要被验证字符串
 * @params: min: 最小必须达到多少字
 * @param: max:最多不超过多少字 0为不验证最大字数
 * @return: boolean
 * @description: 验证内容 是否必须有汉字 且不少于 min 字 不大于max字
 */
export const isVaildVal = (value: string, min = 15, max = 0): boolean => {
  const reg = /[\u4E00-\u9FFF]+/
  let val = `${value}`
  if (val?.length > 1000) {
    val = value.substring(0, 1000)
  }
  return max ? reg.test(val) && (val.length >= min) && (val.length <= max) : reg.test(val) && (val.length >= min)
}

/**
 * @return: boolean
 * @description: 验证内容 传入的val数字是否在指定的区间内，包含最大最小区间
 */
export const isVaildNum = (val: number, min: number, max: number): boolean => {
  return val >= min && val <= max
}

/**
 * @name: allChinese for jsxin
 * @params: str: string 需要被验证的字符串
 * @return: boolean
 * @description: 当前字符串是否是2-5个全中文
 */
export const allChinese = (str: string): boolean => {
  // eslint-disable-next-line prefer-regex-literals
  const reg = new RegExp('^[\u4E00-\u9FA5]{2,5}$')
  return reg.test(str)
}

/**
 * @name: validPassWord for jsxin
 * @params: str: string 需要被验证的密码
 * @return: boolean
 * @description: 检测当前密码是否符合规范
 */
export const validPassWord = (str: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const reg = /([a-zA-Z0-9_\.@#$%^&*]){6,20}/
  return reg.test(str)
}

/**
 * @name 是否为图片地址
 * @param imgUrl 图片地址
 * @returns boolean
 */
export function isImgUrl(imgUrl: string): boolean {
  if (typeof imgUrl !== 'string') {
    return false
  }
  const reg = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i
  return reg.test(imgUrl)
}

/** 判断时间是否是同一天 */
export const isSameDay = (timeStampA, timeStampB) => {
  const dateA = new Date(timeStampA)
  const dateB = new Date(timeStampB)
  return dateA.setHours(0, 0, 0, 0) === dateB.setHours(0, 0, 0, 0)
}

/** 正则匹配手机号 */
export function matchContentPhone(content: string) {
  const regexp = /1[3-9]\d{9}/g
  const phone = content.match(regexp)
  if (Array.isArray(phone)) {
    return phone[0]
  }
  return ''
}

/** 正则判断是否是金额 */
export const isMoney = (value: string) => {
  const reg = /^(([1-9]\d*)|\d)(\.\d{1,2})?$/
  return reg.test(value)
}

/** 正则判断小数点位数
 * @param value 需要验证的数字
 * @param decimal 小数点位数 默认0
 */
export const isDecimal = (value: number|string, decimal = 0) => {
  const reg = new RegExp(`^\\d+(\\.\\d{1,${decimal}})?$`)
  return reg.test(`${value}`)
}

/** 字符串是否包含汉字 */
export const isChinese = (value: string) => {
  const reg = /[\u4e00-\u9fa5]/
  return reg.test(value)
}
