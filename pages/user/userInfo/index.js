const app = getApp()
import { request, config } from '../../../utils/index'

Page({
  data: {
    date: null,
    userInfo: {}
  },
  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  getPhoneNumber(e) {
    let params = e.detail
    request({
      url: config.api.login,
      method: 'post',
      data: params
    })
  }
})