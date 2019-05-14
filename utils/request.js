import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
import qs from 'qs'
import config from './config'

axios.defaults.adapter = mpAdapter

// 创建axios实例
const service = axios.create({
  baseURL: config.baseURL, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  axiosConfig => {
    // config.headers['x-ada-terminal'] = 'Manager'
    if (axiosConfig.method === 'post' || axiosConfig.method === 'put') {
      axiosConfig.headers['Content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
      axiosConfig.data = qs.stringify(axiosConfig.data)
    }
    if (wx.getStorageSync(config.key.token)) {
      // axiosConfig.headers['x-ada-token'] = wx.getStorageSync(config.key.token) // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return axiosConfig
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data
    res.code = res.code || response.status
    if (res.code !== 200) {
      wx.showToast({
        title: res.message,
        icon: 'none'
      })

      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    wx.showToast({
      title: error.message,
      icon: 'none'
    })
    return Promise.reject(error)
  }
)

export default service
