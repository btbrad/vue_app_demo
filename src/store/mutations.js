/*
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-08 00:16:27
 * @LastEditTime: 2019-04-17 17:28:20
 */
import Vue from 'vue'
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
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = ''
  },
  [INCREASE_FOOD_COUNT] (state, {food}) {
    if (!food.count) {
      // food.count = 1
      Vue.set(food, 'count', 1) // 让新增的属性也有数据绑定
      state.cartFoods.push(food)
    } else {
      food.count++
    }
    console.log(food)
  },
  [DECREASE_FOOD_COUNT] (state, {food}) {
    if (food.count) {
      food.count--
    }
    if (food.count === 0) {
      state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
    }
  },
  [CLEAR_SHOP_CART] (state) {
    state.cartFoods.forEach((food) => {
      food.count = 0
    })
    state.cartFoods = []
  },
  [RECEIVE_SEARCH_SHOPS] (state, {searchShops}) {
    state.searchShops = searchShops
  }
}
