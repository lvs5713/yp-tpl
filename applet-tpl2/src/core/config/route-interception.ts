import { getState } from '@/store/index'

const loginCheck = ['/pages/personal/index']

// 注册全局路由拦截
$.router.beforeEach((to, from, next, options) => {
  const router = $.router.useRouter()
  router.setValue({ to, from, next, params: options })
  const { storage } = getState()
  if (!storage.userInfo.token && loginCheck.includes(to)) {
    // 拦截成功后 下一个页面的跳转逻辑
    const interceptNext = () => {
      next()
      router.setValue({ interceptNext: () => $.router.back() })
    }
    router.setValue({ interceptNext })
    $.router.push('/subpackage/login/auth/index')
  } else {
    next()
  }
})
