/*
 * @Date: 2023-04-25 11:34:38
 * @Description: file content
 */
export * from './treeUtils'

/**
 * 获取胶囊的高度以及加上传入的高度
 * @param otherHeight - 额外的高度
 * @param isCustomHeader - 是否是custom-header组件
 * */
export const getHeaderHeight = (otherHeight = '0px', isCustomHeader = false): string => {
  const clientRect = $.getMenuButtonBoundingClientRect()
  const height = `calc(${clientRect.top + (clientRect?.height || 0)}px + ${isCustomHeader ? '8rpx' : '0px'} + ${otherHeight})`
  return height
}

/*
 * @Date: 2022-09-30 10:32:27
 * @Description: 函数防抖
 */
export function debounce(fn, time) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, time)
  }
}

/*
 * @Date: 2022-07-30 20:35:56
 * @Description: 节流
 */

export function throttle(fn, time) {
  let lock = false
  return function (...args) {
    if (lock) {
      return
    }
    lock = true
    setTimeout(() => {
      fn.call(this, ...args)
      lock = false
    }, time)
  }
}

export function isDef(value) {
  return value !== undefined && value !== null
}

/** 判断空对象 */
export function isEmptyObject(obj) {
  return !obj ? true : Object.getOwnPropertyNames(obj).length === 0
}

/** 把一维数组拆分成二维数组，数组里面的数组长度可自己设置 */
export function toSplitArr(baseArray: any[], n: number) {
  const len = baseArray.length
  // n 假设每行显示N个
  const lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1)
  const res: any[] = []
  for (let i = 0; i < lineNum; i += 1) {
    // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
    const temp = baseArray.slice(i * n, i * n + n)
    res.push(temp)
  }
  return res
}

/**
 * 去除对象中所有为空的值
 * @param {Object} obj 来源对象
 */
export function compactObj(obj) {
  const newObj = JSON.parse(JSON.stringify(obj || {}))
  const isEmpty = (foo) => {
    if (typeof foo === 'object') {
      return isEmptyObject(foo)
    }
    return foo === '' || foo === null || foo === undefined
  }

  const clean = (newObj) => {
    Object.keys(newObj).forEach((key) => {
      if (newObj[key] && typeof newObj[key] === 'object') {
        clean(newObj[key])
      }
      if (isEmpty(newObj[key])) {
        delete newObj[key]
      }
    })
  }

  clean(newObj)

  return newObj
}
