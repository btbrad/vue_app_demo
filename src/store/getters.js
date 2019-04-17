/*
 * @Author: btbrad
 * @LastEditors: btbrad
 * @Description:
 * @Date: 2019-04-08 00:16:38
 * @LastEditTime: 2019-04-16 20:44:38
 */
export default {
  totalCount (state) {
    return state.cartFoods.reduce((preTotal, item) =>
      preTotal + item.count
      , 0)
  },
  totalPrice (state) {
    return state.cartFoods.reduce((preTotal, item) =>
      preTotal + item.count * item.price
      , 0)
  }
}
