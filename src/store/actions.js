/*
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-08 00:15:54
 * @LastEditTime: 2019-04-17 17:43:07
 */

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RESET_USER_INFO,
  INCREASE_FOOD_COUNT,
  DECREASE_FOOD_COUNT,
  CLEAR_SHOP_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'

import {
  reqAddress,
  reqFoodCategories,
  reqShops,
  reqUserInfo,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqLogout,
  reqSearchShops
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
    if (res.code === 0) {
      const categories = res.data
      commit(RECEIVE_CATEGORIES, {categories})
    }
  },
  // 异步获取商家列表
  async getShops ({commit, state}) {
    let res = await reqShops(state.longitude, state.latitude)
    if (res.code === 0) {
      const shops = res.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 保存用户信息
  saveUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },
  // 异步获取用户信息
  async getUserInfo ({commit}) {
    let result = await reqUserInfo()
    console.log(result)
    if (result.code === 0) {
      commit(RECEIVE_USER_INFO, {userInfo: result.data})
    }
  },
  // 异步获取商品
  async getShopGoods ({commit}, cb) {
    let result = await reqShopGoods()
    console.log(result)
    if (result.code === 0) {
      commit(RECEIVE_GOODS, {goods: result.data})
      cb && cb()
    }
  },
  // 异步获取店铺信息
  async getShopInfo ({commit}) {
    let result = await reqShopInfo()
    if (result.code === 0) {
      commit(RECEIVE_INFO, {info: result.data})
    }
  },
  // 异步获取店铺评价
  async getShopRatings ({commit}, cb) {
    let result = await reqShopRatings()
    console.log(result)
    if (result.code === 0) {
      commit(RECEIVE_RATINGS, {ratings: result.data})
      cb && cb()
    }
  },
  // 退出登录
  async logout ({commit}) {
    let result = await reqLogout()
    console.log(result)
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
  // 更新food数量
  updateFoodCount ({commit}, {food, isAdd}) {
    console.log(food, isAdd)
    if (isAdd) {
      commit(INCREASE_FOOD_COUNT, {food})
    } else {
      commit(DECREASE_FOOD_COUNT, {food})
    }
  },
  // 清空购物车
  clearShopCart ({commit}) {
    commit(CLEAR_SHOP_CART)
  },
  // 异步获取搜索商家商品列表
  async getSearchShops ({commit, state}, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    let res = await reqSearchShops(geohash, keyword)
    console.log(res)
    if (res.code === 0) {
      const searchShops = res.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  }
}
