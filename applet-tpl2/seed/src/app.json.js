/*
 * @Date: 2023-04-28 11:28:06
 * @Description: 小程序json 配置
 */

export default {
  pages: [
    // 首页
    'pages/index/index',
    // 司机招聘
    'pages/recruit/index',
  ],
  subpackages: [],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '鱼泡机械',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    custom: true,
    color: '#fff',
    selectedColor: '#fff',
    backgroundColor: '#fff',
    list: [{
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/recruit/index',
        text: '司机招聘',
      },
    ],
  },
  usingComponents: {
    'custom-modal': '/components/base/custom-modal/index',
    'icon-font': '/components/base/icon-font/index',
    hover: '/components/base/hover/index',
    'm-button': '/components/base/m-button/index',
    a: '/components/base/a/index',
  },
  sitemapLocation: 'sitemap.json',
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序为您自动推荐位置信息',
    },
  },
  requiredPrivateInfos: ['getLocation'],
}