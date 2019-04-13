/*
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-08 00:13:55
 * @LastEditTime: 2019-04-08 00:49:03
 */

/**
  * vuex 最核心的管理对象那个store
  */

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
