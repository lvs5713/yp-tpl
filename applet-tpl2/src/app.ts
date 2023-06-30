/*
 * @Date: 2023-04-18 13:40:55
 * @Description: 启动页
 */

import '@/core/index'
import { store } from '@/store/index'
import { Provider } from '@/core/mini-redux/index'
import '@/core/config/route-interception'

App(Provider({ store })({
  async onLaunch(options) {
    console.log(options, '--------------------小程序初始化完成时触发，全局只触发一次')
  },
  onShow() {
  },
}))
