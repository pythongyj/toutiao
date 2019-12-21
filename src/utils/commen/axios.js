import axios from 'axios'

// 设置基础URL
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

/**
 * axios 拦截器
 * 请求时的拦截器
 * 主要用于同意携带token，不必再单独为每个请求设置token
 */
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  // console.log(config)
  return config
}, function (error) {
  return Promise.reject(error)
})

/**
 * axios 拦截器
 * 返回时的拦截器
 *  主要用于对返回的数据做处理
 *    判断返回的结果的data中书否有数据，有就返回，没有就返回空对象
 */
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  return Promise.reject(error)
})

export default axios
