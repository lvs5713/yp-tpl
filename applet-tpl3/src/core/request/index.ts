/*
 * @Date: 2022-07-27 09:46:54
 * @Description: 请求
 */
import { getState } from '@/store/index'

export const interfaceAddress = {
  DEV: 'http://jxapi.kkbbi.com',
  PRE: 'http://relase.jxapi.kkbbi.com',
  PRO: 'https://api.zhaogongdi.com',
}

/** 获取请求header信息 */
const getRequestHeader = (options: any): Record<string, string> => {
  const { storage } = getState()
  return {
    'content-type': 'application/json',
    check: 'YUPAOJIXIEXCX',
    Source: 'XCX',
    Version: '2.2.0',
    'x-token': storage?.userInfo?.token || '',
    ...options.headers,
  }
}

/** 网络请求 统一的异常处理 */
const errorHandler = (response: any, resolve, reject) => {
  const { statusCode, data } = response
  if (statusCode && statusCode === 200) {
    if (data.code === 300) {
      $.showModal({ title: '账号异常', content: data.msg }).then(() => {
        wx.makePhoneCall({
          phoneNumber: data.content.contact,
        })
      })
    } else if (data.code === 0) {
      wx.removeStorageSync('userInfo')
      $.router.push('/subpackage/login/auth/index')
    }
    resolve([data])
  }
  reject(response)
}

function fetch(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${interfaceAddress[ENV_DEVELOPMENT]}${options.url}`,
      data: options?.data || null,
      method: options.method,
      dataType: 'json',
      header: getRequestHeader(options),
      async success(response) {
        errorHandler(response, resolve, reject)
      },
      fail() {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject([null])
      },
    })
  })
}

/** 请求代理对象 */
export const request = new Proxy(
  {},
  {
    get(_, p: string) {
      return function (data, headers) {
        const [method, ...url] = p.split('/')
        return fetch({
          method: method.toLowerCase(),
          url: `/${url.join('/')}`,
          data,
          headers,
        })
      }
    },
  },
)
