import amapFile from '../../libs/amap-wx/amap-wx.js'

Page({
  data: {
    polyline: [{
      points: [
      ],
      color: "#FF0000DD",
      width: 2,
      arrowLine: true
    }],
  },
  onLoad() {
    let myAmapFun = new amapFile.AMapWX({ key: '3d9b6298003029e4d88282ffea205bbb' })
    const self = this
    myAmapFun.getPoiAround({
      success(data) {
        self.setData({
          latitude: data.markers[0].latitude,
          longitude: data.markers[0].longitude
        })
      },
      fail(error) {
        console.log(error)
      }
    })
    myAmapFun.getDrivingRoute({
      origin: '116.451028,39.969643',
      destination: '116.432646,39.91216',
      success: function (data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(';');
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(',')[0]),
                latitude: parseFloat(poLen[j].split(',')[1])
              })
            }
          }
        }
        let carOrientation = 'active-car'
        let anchor = { x: 0, y: 0.625 }
        let width = 22
        try {
          let orientation = data.paths[0].steps[data.paths[0].steps.length - 1].orientation
          switch (orientation) {
            case '北':
              carOrientation = 'active-car-up'
              anchor = {x: 0.5, y: 1}
              width = 11
              break
            case '南':
              carOrientation = 'active-car-down'
              anchor = {x: 0.5, y: 0}
              width = 11
              break
            case '西':
              carOrientation = 'active-car-left'
              anchor = { x: 1, y: 0.625 }
              break
          }
        } catch (error) {
          throw error
        }
        self.setData({
          markers: [
            {
              id: 0,
              latitude: points[0].latitude,
              longitude: points[0].longitude,
              width: 50,
              height: 50,
              title: '起点'
            },
            {
              iconPath: `/image/${carOrientation}.png`,
              id: 1,
              latitude: points[points.length - 1].latitude,
              longitude: points[points.length - 1].longitude,
              width,
              height: 22,
              anchor
            }
          ],
          polyline: [{
            points: points,
            color: "#39b54a",
            width: 6,
            arrowLine: true
          }]
        });
        if (data.paths[0] && data.paths[0].distance) {
          self.setData({
            distance: data.paths[0].distance + '米'
          });
        }
        if (data.taxi_cost) {
          self.setData({
            cost: '打车约' + parseInt(data.taxi_cost) + '元'
          });
        }

      },
      fail: function (info) {

      }
    })
  },
  markertap(data) {
    console.log(data, 'mark data')
  }
})