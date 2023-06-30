/* eslint-disable */
/*
 * @Date: 2021-12-14 14:19:42
 * @Description: connect
 */

export type ShouldComponentUpdate<S> = (prevState: S, nextState: S) => boolean
export type MapStateToData<S> = (state: S) => Record<string, any>
export type Connect<S> = (mapStateToData: MapStateToData<S>, shouldComponentUpdate?: ShouldComponentUpdate<S>) => Function

/** App 使用，挂载 store */
export function Provider({ store }) {
  return (options) => {
    Object.defineProperty(options, 'store', {
      value: store,
      writable: false,
      enumerable: true,
      configurable: false,
    })
    return options
  }
}

/** 对象浅对比 */
function defaultShouldComponentUpdate<S>(prevState: S, nextState: S): boolean {
  for (const attr in prevState) {
    if (prevState[attr] !== nextState[attr]) {
      return true
    }
  }
  return false
}

/** 进行渲染 */
function render<S>(that, mapStateToData, store, shouldComponentUpdate) {
  const nextState = mapStateToData(store.getState()) as S
  const prevState = {} as S
  for (const attr in nextState) {
    prevState[attr] = that.data[attr]
  }
  if (shouldComponentUpdate(prevState, nextState)) {
    that.setData(nextState)
  }
}

/** Component 使用，用于关联store */
export function connect<S>(mapStateToData: MapStateToData<S>, shouldComponentUpdate: ShouldComponentUpdate<S> = defaultShouldComponentUpdate): (options: ComponentOptions) => ComponentOptions {
  return (options: ComponentOptions) => {
    const app = getApp()
    if (!app) {
      return options
    }
    const store = app.store
    if (!store) {
      return options
    }
    if (!options.data) {
      options.data = {}
    }
    if (!options.lifetimes) {
      options.lifetimes = {}
    }

    const state = mapStateToData(store.getState()) as S
    Object.assign(options.data, state)

    const { attached: oldAttached, detached: oldDetached } = options.lifetimes

    options.lifetimes.attached = function(...args) {
      // 修复值丢失的问题
      render(this, mapStateToData, store, shouldComponentUpdate)
      this.unSubscribe = store.subscribe(() => {
        render(this, mapStateToData, store, shouldComponentUpdate)
      })
      oldAttached && oldAttached.call(this, ...args)
    }

    options.lifetimes.detached = function(...args) {
      this.unSubscribe && this.unSubscribe()
      oldDetached && oldDetached.call(this, ...args)
    }

    return options
  }
}

/** Page 使用，用于关联store */
export function connectPage<S>(mapStateToData: MapStateToData<S>, shouldComponentUpdate: ShouldComponentUpdate<S> = defaultShouldComponentUpdate): (options: PageOptions) => PageOptions {
  return (options) => {
    const store = getApp().store
    if (!store) {
      return options
    }
    if (!options.data) {
      options.data = {}
    }

    const state = mapStateToData(store.getState()) as S
    Object.assign(options.data, state)

    const { onLoad: oldOnLoad, onUnload: oldOnUnload } = options

    options.onLoad = function(...args) {
      // 修复值丢失的问题
      render(this, mapStateToData, store, shouldComponentUpdate)
      this.unSubscribe = store.subscribe(() => {
        render(this, mapStateToData, store, shouldComponentUpdate)
      })
      oldOnLoad && oldOnLoad.call(this, ...args)
    }

    options.onUnload = function(...args) {
      this.unSubscribe && this.unSubscribe()
      oldOnUnload && oldOnUnload.call(this, ...args)
    }

    return options
  }
}
