/*
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-01 21:12:46
 * @LastEditTime: 2019-04-12 13:42:55
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
