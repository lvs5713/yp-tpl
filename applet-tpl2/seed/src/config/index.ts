/*
 * @Date: 2023-04-19 15:04:10
 * @Description: 配置表
 */

export const CDNIMGPATH = 'https://statics.zhaogongdi.com/images'

// 默认头像
export const DEFAULT_AVATAR_URL = `${CDNIMGPATH}/web/defalut-avatar.png`

export const navigateToMiniProgramAppIdList = [
  // 鱼泡网小程序appid
  'wxdcc7f8e70a22d31f',
]

// * JAVA全局请求接口域名
export const REQUEST_JAVA_LIST = {
  // * 开发站
  DEVELOP: 'https://yupao-develop.yupaowang.com',
  // 测试站
  DEV: 'https://yupao-test.yupaowang.com',
  // 预发布
  PRE: 'https://yupao-master.yupaowang.com',
  // * 预发布正式站(JAVA的预正用预发布的域名)
  REL: 'https://yupao-master.yupaowang.com',
  // * 正式站
  PRO: 'https://yupao-prod.yupaowang.com',
}
