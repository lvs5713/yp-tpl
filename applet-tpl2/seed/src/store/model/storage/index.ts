/*
 * @Date: 2022-01-11 13:33:42
 * @Description: 本地存储 model，storage 统一管理，驱动视图更新
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import initialState from './initialState'
import storage from './storage'

type State = typeof initialState
type Key = keyof typeof initialState
type Value<K extends Key> = typeof initialState[K]

type SetItem<K extends Key> = {
  /** 设置值的key */
  key: Key
  /** 设置值的value */
  value: Value<K>
} | {
  /** 设置值的key */
  key: Key
  immer: (state: State) => void
}

/** 初始化获取本地 storage 数据 */
const getInitialState = () => {
  const state = {}
  // eslint-disable-next-line
  for (const key in initialState) {
    if (Object.prototype.hasOwnProperty.call(initialState, key)) {
      state[key] = storage.getItem(key as Key)
    }
  }
  return state
}

const { reducer, actions, name } = createSlice({
  name: 'storage',
  initialState: getInitialState() as State,
  reducers: {
    /** 设置本地存储 不需要 JSON.stringify */
    setItem<K extends Key>(state, { payload }: PayloadAction<SetItem<K>>) {
      const { key, value, immer } = payload as any
      /** 处理 immer 手动给调用处的情况 */
      if (typeof immer === 'function') {
        immer(state)
      } else {
        state[key] = value
      }
      storage.setItem(key, state[key])
    },
    /** 异步删除本地存储 */
    removeItem(state, { payload }: PayloadAction<Key>) {
      state[payload as any] = initialState[payload]
      storage.removeItem(payload)
    },
    /** 异步删除所有本地存储 */
    clear() {
      storage.clear()
      return { ...initialState } as State
    },
  },
})

export default {
  name,
  reducer,
  actions: { ...actions },
}
