/*
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-07 17:42:47
 * @LastEditTime: 2019-04-07 18:34:28
 */

/**
 * ajax请求函数模块
 * 返回值: promise对象(异步返回的数据是:response.data)
 */

import axios from 'axios'

export default function ajax (url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      let dataStr = ''
      Object.keys(data).forEach(item => {
        dataStr += item + '=' + data[item] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url += '?' + dataStr
      }
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise.then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
