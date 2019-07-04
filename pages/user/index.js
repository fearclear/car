const app = getApp()

Page({
  data: {
    type: 3,
    userInfo: {}
  },
  onLoad() {
    // 获取丧失信息
    if(app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
  },
  showQrcode() {
    wx.previewImage({
      urls: ['/image/qrcode.jpg'],
      current: '/image/qrcode.jpg', // 当前显示图片的http链接      
      fail: err => console.error(err, 'err')
    })
  },
  bindGetUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
