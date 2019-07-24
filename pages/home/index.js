Page({
  data: {
    socketOpen: false,
    socketMsgQueue: ['a', 'b', 'c']
  },
  onLoad() {
    const ws = wx.connectSocket({
      url: 'ws://127.0.0.1:3001'
    })
    this.ws = ws
    ws.onOpen(this.wsOpen)
    ws.onMessage(this.wsMessage)
  },
  wsOpen() {
    let { socketMsgQueue } = this.data
    this.setData({
      socketOpen: true
    })
    for (let i = 0; i < socketMsgQueue.length; i++) {
      this.sendSocketMessage(socketMsgQueue[i])
    }
    socketMsgQueue = []
  },
  wsMessage(data) {
    console.log(data, 'data')
  },
  sendSocketMessage(msg) {
    if (this.data.socketOpen) {
      this.ws.send({
        data: msg
      })
    } else {
      this.data.socketMsgQueue.push(msg)
    }
  },
  sendMsg() {
    this.ws.send({
      data: 'msg'
    })
  }
})