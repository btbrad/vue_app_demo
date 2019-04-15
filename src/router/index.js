/*
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-01 19:39:49
 * @LastEditTime: 2019-04-14 17:25:35
 */
import Vue from 'vue'
import Router from 'vue-router'

const Msite = () => import('../pages/Msite/Msite.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')
const Search = () => import('../pages/Search/Search.vue')
const Login = () => import('../pages/Login/Login.vue')
const Shop = () => import('../pages/Shop/Shop.vue')
const ShopInfo = () => import('../pages/Shop/ShopInfo/ShopInfo.vue')
const ShopGoods = () => import('../pages/Shop/ShopGoods/ShopGoods.vue')
const ShopRatings = () => import('../pages/Shop/ShopRatings/ShopRatings.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/msite',
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: 'info',
          component: ShopInfo
        },
        {
          path: 'goods',
          component: ShopGoods
        },
        {
          path: 'ratings',
          component: ShopRatings
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ]
})
