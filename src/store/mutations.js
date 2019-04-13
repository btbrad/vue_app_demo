/*
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-08 00:16:27
 * @LastEditTime: 2019-04-13 23:27:38
 */

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORIES] (state, {categories}) {
    state.categories = categories
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  }
}
