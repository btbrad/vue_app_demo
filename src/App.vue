<!--
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-01 21:11:52
 * @LastEditTime: 2019-04-12 15:24:05
 -->
<template>
    <div id="app">
      <router-view></router-view>
      <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
const FooterGuide = () => import('./components/FooterGuide/FooterGuide.vue')
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  data () {
    return {

    }
  },
  methods: {
    ...mapActions(['getAddress'])
  },
  mounted () {
    this.getAddress()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
