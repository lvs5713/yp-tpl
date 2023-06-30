/*
 * @Date: 2022-10-05 10:38:57
 * @Description: 弹窗显示逻辑
 */

const getKey = (() => {
  let key = 0
  return (type) => {
    key += 1
    return `${type}-${key}`
  }
})()

/** 获取当前页面 */
function getCurrentPage() {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  return page
}

const config = {
  alert: {
    title: '温馨提示',
    content: '',
    confirmText: '确定',
  },
  confirm: {
    title: '温馨提示',
    content: '',
    cancelText: '取消',
    confirmText: '确定',
  },
  jxAlert: {
    title: '温馨提示',
    content: '',
    mode: 'warn',
    cancelText: '取消',
    confirmText: '确定',
  },
}

function createStore() {
  const listener: Record<string, Function> = {}

  function dispatch({ type, options }) {
    const modelKey = getCurrentPage()?.modelKey
    return listener[modelKey]?.({ ...config?.[type], ...options }, type, getKey('modal'))
  }

  function subscribe(fn) {
    const page = getCurrentPage()
    const key = getKey('page')
    page.modelKey = key
    listener[key] = fn
    return function unSubscribe() {
      delete listener[key]
    }
  }

  return {
    subscribe,
    dispatch,
  }
}

const store = createStore()

function alert(options) {
  return store.dispatch({
    type: 'alert',
    options,
  })
}

function confirm(options) {
  return store.dispatch({
    type: 'confirm',
    options,
  })
}

function jxAlert(options) {
  return store.dispatch({
    type: 'jxAlert',
    options,
  })
}

export { alert, confirm, jxAlert, store }
