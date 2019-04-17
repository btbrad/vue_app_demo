/*
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-17 19:16:11
 * @LastEditTime: 2019-04-17 20:20:45
 */
import Vue from 'vue'
// import moment from 'moment'

import format from 'date-fns/format'

Vue.filter('date-format', function (value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  return format(value, formatStr)
})
