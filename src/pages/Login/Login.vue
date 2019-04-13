<!--
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-07 15:44:16
 * @LastEditTime: 2019-04-13 23:44:25
 -->
<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">VUE外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginType}" @click="changeLoginType(true)">短信登录</a>
          <a href="javascript:;" :class="{on:!loginType}" @click="changeLoginType(false)">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginType}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :class="{correct_phone:correct_num}" :disabled="!correct_num" class="get_verification" @click.prevent="getVerification">
                {{leftTime ? `已发送(${leftTime}s)` : '获取验证码' }}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginType}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input v-if="showPwd" type="text" maxlength="8" placeholder="密码" v-model="pwd">
                <input v-else type="password" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button off" :class="{on:showPwd,off:!showPwd}" @click="switchPasswordVisibility">
                  <div class="switch_circle"></div>
                  <span class="switch_text">{{showPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha"
                 @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip v-show="showAlert" :alertText="alertText" @closeTip="handleClose"></AlertTip>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import AlertTip from '../../components/AlertTip/AlertTip'
import { reqCode, reqLoginSMS, reqLoginPwd } from '../../api/index'

export default {
  name: 'Login',
  components: {
    AlertTip
  },
  data () {
    return {
      loginType: true, // true: 短信 false: 密码
      leftTime: 0, // 倒计时
      showPwd: false, // 是否显示密码
      phone: '', // 手机号码
      pwd: '123456', // 密码
      code: '', // 短信验证码
      name: 'btbt', // 用户名
      captcha: '', // 图形验证码
      alertText: '', // 提示文本内容
      showAlert: false // 提示框是否显示
    }
  },
  computed: {
    correct_num () {
      const {phone} = this
      return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(+phone)
    }
  },
  methods: {
    ...mapActions(['saveUserInfo']),
    // 切换登录方式
    changeLoginType (flag) {
      this.loginType = flag
    },
    // 获取手机验证码
    async getVerification () {
      if (!this.leftTime) {
        this.leftTime = 30
        // this.correct_num = false
        this.timer = setInterval(() => {
          this.leftTime--
          if (this.leftTime <= 0) {
            clearInterval(this.timer)
          }
        }, 1000)

        // 发送ajax请求(向指定手机号发送验证码短信)
        const result = await reqCode(this.phone)
        console.log(result)
        if (result.code === 1) {
          console.log(111)
          this.handleShowAlert(result.msg)
          if (this.leftTime > 0) {
            this.leftTime = 0
            clearInterval(this.timer)
          }
        } else if (result.code === 0) {
          this.handleShowAlert('验证码已发送,请查看手机')
        }
      }
    },
    // 切换密码显示与隐藏
    switchPasswordVisibility () {
      this.showPwd = !this.showPwd
    },
    // 登录
    async login () {
      let result
      if (this.loginType) {
        // 短信登录
        const {correct_num: correctNum, phone, code} = this
        if (!correctNum) {
          // 手机号格式不正确
          this.handleShowAlert('手机号格式不正确')
          return false
        } else if (!/^\d{6}$/.test(code)) {
          // 验证码格式不正确(6位数字)
          this.handleShowAlert('验证码格式不正确')
          return false
        }
        // 发送ajax请求短信登录
        result = await reqLoginSMS(phone, code)
      } else {
        // 密码登录
        const {name, pwd, captcha} = this
        if (!name) {
          // 用户名不能为空
          this.handleShowAlert('用户名不能为空')
          return false
        } else if (!pwd) {
          // 密码不能为空
          this.handleShowAlert('密码不能为空')
          return false
        } else if (!captcha) {
          // 验证码不能为空
          this.handleShowAlert('验证码不能为空')
          return false
        }
        result = await reqLoginPwd({name, pwd, captcha})
        console.log(result)
      }
      // 停止计时
      if (this.leftTime > 0) {
        this.leftTime = 0
        clearInterval(this.timer)
      }
      // 根据结果,处理数据
      if (result.code === 0) {
        const user = result.data
        // 保存到状态
        this.saveUserInfo(user)
        // 去个人中心页面
        this.$router.replace('/profile')
      } else {
        // 显示新的图片验证码
        this.getCaptcha()
        // 显示警告提示
        const msg = result.msg
        this.handleShowAlert(msg)
      }
    },
    // 显示提示框
    handleShowAlert (text) {
      this.alertText = text
      this.showAlert = true
    },
    // 关闭提示框的事件处理函数
    handleClose () {
      this.showAlert = false
      this.alertText = ''
    },
    // 获取图形验证码
    getCaptcha () {
      // 每次指定的src要不一样
      // event.target.src = 'http://localhost:4000/captcha?time=' + Date.now()
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixins.styl'
  .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.correct_phone
                    color #000 !important
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                    >.switch_circle
                      transform translateX(27px)
                    .switch_text
                      float left
                      color #fff
                  >.switch_circle
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
