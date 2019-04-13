/*
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-08 00:15:54
 * @LastEditTime: 2019-04-13 23:30:44
 */

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategories,
  reqShops
} from '../api/index'

export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    let res = await reqAddress(geohash)
    if (res.code === 0) {
      const address = res.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },
  // 异步获取食品分类列表
  async getCategories ({commit}) {
    let res = await reqFoodCategories()
    console.log(res)
    if (res.code === 0) {
      const categories = res.data
      commit(RECEIVE_CATEGORIES, {categories})
    }
  },
  // 异步获取商家列表
  async getShops ({commit, state}) {
    let res = await reqShops(state.longitude, state.latitude)
    console.log(res)
    if (res.code === 0) {
      const shops = res.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 保存用户信息
  saveUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  }
}
