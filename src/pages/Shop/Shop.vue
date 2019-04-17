<!--
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-14 14:41:07
 * @LastEditTime: 2019-04-17 18:22:43
 -->
<template>
    <div>
      <ShopHeader></ShopHeader>
      <div class="tab">
        <router-link class="tab-item" to="/shop/goods" replace>点餐</router-link>
        <router-link class="tab-item" to="/shop/ratings" replace>评价</router-link>
        <router-link class="tab-item" to="/shop/info" replace>商家</router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
</template>

<script>
// import { mapActions } from 'vuex'
import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
export default {
  name: 'Shop',
  components: {
    ShopHeader
  },
  methods: {
    // ...mapActions(['getShopGoods', 'getShopRatings', 'getShopInfo'])
  },
  mounted () {
    // this.getShopGoods()
    // this.getShopRatings()
    // this.getShopInfo()
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
      &.router-link-active
        position relative
        color #02a774
        &::after
          content ''
          position absolute
          left 50%
          bottom 1px
          width 35px
          height 2px
          transform translateX(-50%)
          background #02a774
</style>
