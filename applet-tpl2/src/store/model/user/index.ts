/* eslint-disable camelcase */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CDNIMGPATH } from '@/config/index'

const { reducer, actions, name } = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      // 用户id
      id: null,
      name: '',
      // 可用鱼泡币
      coin_balance: 0,
      // 会员状态 0 => 非会员, 1 => 会员, 2 => 已过期
      member_status: 0,
      // 会员信息
      member_info: {
        title: '',
        expire_time: '',
        // 过期描述 member_status=1时使用
        expire_desc: '',
      },
      // 修改资料页面会员描述文本
      member_desc: '',
      // 浏览记录数量
      view_number: 0,
      // 拨打记录数量
      contact_number: 0,
      // 收藏数量
      collect_number: 0,
      // 用户注册日期
      register_time: '',
      tel: '',
      header: '',
      invite: {
        code: '',
        qr: '',
        url: '',
      },
    },
  },
  reducers: {
    setState(state, { payload }: PayloadAction<Record<string, any>>) {
      Object.assign(state, payload)
    },
    setUserInfo(state, { payload }) {
      state.userInfo = { ...state.userInfo, ...payload }
    },
  },
})

/** 获取用户信息 */
const fetchUserInfo = (payload = {}) => async (dispatch, getState) => {
  const [data] = await $.request['GET/v2/user/user-info']()
  const userInfo = data?.content
  if (!userInfo?.header.length) {
    userInfo.header = `${CDNIMGPATH}/web/defalut-avatar.png`
  }
  let member_desc = userInfo?.member_info?.title || ''
  switch (userInfo.member_status) {
    case 0:
      member_desc = '未开通会员'
      break
    case 2:
      member_desc = '会员已过期'
      break
    default:
      break
  }
  dispatch(actions.setState({ userInfo: { ...userInfo, ...payload, member_desc } }))
  return getState().user.userInfo
}

export const userName = name
export const userReducer = reducer
export const userActions = {
  ...actions,
  fetchUserInfo,
}
