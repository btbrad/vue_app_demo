<!--
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-02 10:45:43
 * @LastEditTime: 2019-04-14 11:50:44
 -->
<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <router-link to="/search" class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link :to="userInfo._id ? '/userInfo' : '/login'" class="header_login" slot="right">
        <span v-if="!userInfo._id" class="header_login_text">登录|注册</span>
        <i v-else class="iconfont icon-person"></i>
      </router-link>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categories.length>0">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(arr,index) in categoryArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="item in arr" :key="item.id">
              <div class="food_container">
                <img :src="baseUrl+item.image_url">
              </div>
              <span>{{item.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'

import {mapState, mapActions} from 'vuex'

export default {
  name: 'Msite',
  components: {
    HeaderTop,
    ShopList
  },
  data () {
    return {
      baseUrl: 'http://fuss10.elemecdn.com'
    }
  },
  computed: {
    ...mapState(['address', 'categories', 'userInfo']),
    categoryArr () {
      const {categories} = this
      let cateArr = []
      let minArr = []
      categories.forEach((item, index) => {
        minArr.push(item)
        if (index % 8 === 7) {
          cateArr.push(minArr)
          minArr = []
        }
      })
      return cateArr
    }
  },
  watch: {
    categories (value) { // categorys数组中有数据了,在异步更新界面之前执行
      this.$nextTick(() => { // 界面更新就立即创建swiper对象
        // 创建一个swiper对象,用于轮播
        // eslint-disable-next-line no-new
        new Swiper('.swiper-container', {
          // 创建一个swiper实例对象,来实现轮播
          loop: true,
          // 分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  methods: {
    ...mapActions(['getCategories', 'getShops'])
  },
  mounted () {
    this.getCategories()
    this.getShops()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
        .msite  //首页
          width 100%
          .header
            background-color #02a774
            position fixed
            z-index 100
            left 0
            top 0
            width 100%
            height 45px
            .header_search
              position absolute
              left 15px
              top 50%
              transform translateY(-50%)
              width 10%
              height 50%
              .icon-sousuo
                font-size 25px
                color #fff
            .header_title
              position absolute
              top 50%
              left 50%
              transform translate(-50%, -50%)
              width 50%
              color #fff
              text-align center
              .header_title_text
                font-size 20px
                color #fff
                display block
            .header_login
              font-size 14px
              color #fff
              position absolute
              right 15px
              top 50%
              transform translateY(-50%)
              .header_login_text
                color #fff
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>
