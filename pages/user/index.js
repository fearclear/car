const app = getApp()

Component({
  options: {
    addGlobalClass: true
  },
  data: {
    type: 3
  },
  properties: {
    userInfo: {
      type: Object,
      value: {}
    }
  },
  methods: {
    showQrcode() {
      wx.previewImage({
        urls: ['/image/qrcode.jpg'],
        current: '/image/qrcode.jpg', // 当前显示图片的http链接      
        fail: err => console.error(err, 'err')
      })
    },
    bindGetUserInfo: function(e) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
  }
})
