import amapFile from '../../libs/amap-wx/amap-wx.js'

console.log(amapFile)

Component({
  options: {
    addGlobalClass: true,
  },
  data: {

  },
  ready() {
    let myAmapFun = new amapFile.AMapWX({ key: '3d9b6298003029e4d88282ffea205bbb' })
    const self = this
    myAmapFun.getPoiAround({
      success(data) {
        console.log(data)
        self.setData({
          latitude: data.markers[0].latitude,
          longitude: data.markers[0].longitude
        })
      },
      fail(error) {
        console.log(error)
      }
    })
  },
  method: {
    markertap(data) {
      console.log(data, 'mark data')
    }
  }
})