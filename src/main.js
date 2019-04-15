/*
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-01 21:12:46
 * @LastEditTime: 2019-04-15 11:17:04
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// 加载mockserver
import './mock/mockServer'

import { Button } from 'mint-ui'

// 注册全局组件标签
Vue.component(Button.name, Button) // <mt-button></mt-button>

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
