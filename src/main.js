/*
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-01 21:12:46
 * @LastEditTime: 2019-04-02 11:47:57
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
