/*
 * @Date: 2021-12-15 14:41:28
 * @Description: store action reducer 配置
 * https://redux-toolkit.js.org/usage/usage-guide 使用文档
 */

import { configureStore, current } from '@reduxjs/toolkit'
import { reducer } from './reducer'

export { default as storage } from './model/storage/storage'

export { actions } from './reducer'

export const store = configureStore({
  devTools: false,
  reducer,
})

export { current }
export const { dispatch, getState } = store

export type RootState = ReturnType<typeof store.getState>
