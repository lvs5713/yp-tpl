/*
 * @Date: 2023-04-18 13:40:55
 * @Description: 全局数据
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  // 客服电话
  customerServicePhone: '',
}

type State = typeof initialState

const { reducer, actions, name } = createSlice({
  name: 'global',
  initialState,
  reducers: {
    /** 可以更新多个值 sttState({ value:1, list: [] }) */
    setState(state, { payload }: PayloadAction<Record<string, any>>) {
      Object.assign(state, payload)
    },
    /** 修改数据 */
    reducerState(state, { payload }: PayloadAction<(state: State) => void>) {
      payload(state)
    },
  },
})

export default {
  name,
  reducer,
  actions: { ...actions },
}
