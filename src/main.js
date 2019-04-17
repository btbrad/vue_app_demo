/*
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-01 21:12:46
 * @LastEditTime: 2019-04-17 19:18:33
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import VueLazyload from 'vue-lazyload'
import loadingImg from './assets/loading.gif'
import './filters/index'

// 加载mockserver
import './mock/mockServer'

import { Button } from 'mint-ui'

Vue.use(VueLazyload, {
  loading: loadingImg
})

// 注册全局组件标签
Vue.component(Button.name, Button) // <mt-button></mt-button>

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
