/*
 * @Date: 2021-12-16 10:54:04
 * @Description: 导出reducer 和 actions
 */
import storage from './model/storage/index'
import global from './model/global/index'
import { userName, userReducer, userActions } from './model/user/index'

export const reducer = {
  [storage.name]: storage.reducer,
  [global.name]: global.reducer,
  [userName]: userReducer,
}

export const actions = {
  storageActions: storage.actions,
  globalActions: global.actions,
  userActions,
}
