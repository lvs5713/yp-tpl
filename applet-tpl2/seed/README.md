### 鱼泡机械

#### 项目启动
```
先 npm install 下载依赖
npm start 启动项目
微信小程序模拟器打开dist目录
```

#### 接口请求
```
// 该方法返回的是一个数组，第一个为接口里面的content，第二个为接口返回的全部内容
// 使用数组接收可以更好的定义变量名称
const [data] = await $.request['GET/index/get-time']({ source: 'XCX' })
```

#### 路由跳转
```
  $.router.push('/subpackage/one/index', { id: 1 })
  $.router.replace('/subpackage/one/index', { id: 1 })
  $.router.back('/subpackage/one/index', { id: 1 })
  $.router.reLaunch('/subpackage/one/index', { id: 1 })
```

#### 关联redux store
需要先在 src/store/reducer.ts 导入定义好的 model，可以参考现有代码
model参考代码：src/store/example.ts
```
// 使用方法
import { RootState } from '@/store/index'

// 页面
Page({
  useStore(state: RootState) {
    return {
      name: state.global.name,
    }
  },
  onTap() {

  },
})

// 组件
Component({
  useStore(state: RootState) {
    return {
      name: state.global.name,
    }
  },
})

```
```
取值可以通过上面的useStore来关联，如果页面有使用会自动更新视图，如果不需要更新可以不使用 useStore
应该使用getState()来取值
下面的写法都会有类型提示

import { getState, dispatch, actions } from '@/store/index'

Page({
  onTap() {
    // 手动取值 global 
    const global = getState().global
  },
  onUpdate() {
    // 更新值
    dispatch(actions.global.setState({ name: '鱼泡网' }))
  }
})

```


#### 本地缓存
```
缓存在store里面的 storage 模块里面，使用方法和使用store一致
```


#### 组件和页面通信，组件使用页面方法
```
// 1.先在组件的 componentPage 写入一个数组，参数为需要可以被监听的方法，比如 onReachBottom

Page({
  componentPage: ['onReachBottom'],
  data: {},
  // onReachBottom() {
  //  console.log('滚动到底了', '页面')
  // },
})


// 2.然后在组件中写 componentPage 为一个对象，里面对应的方法就是页面的方法
Component({
  componentPage: {
    onReachBottom() {
      console.log('滚动到底了')
      // 这个 this 指向的为当前组件
      this.onRefresh()
    },
  },
  data: {

  },
  methods: {
    onRefresh() {
      // 代码逻辑
    },
  },
})

```

#### 全部的全局方法
```
$ = {
  request, // 接口请求
  wait, // 等待
  msg, // 提示
  alert, // 弹窗提示
  confirm, // 带有确定和取消按钮的弹窗提示
  getCurrentPage,
  router, // 路由跳转
  getMenuButtonBoundingClientRect, // 获取右上角胶囊信息
  getIndex, // 获取随机数
  getSystemInfoSync,
  getCommonSystemInfo,
}
```