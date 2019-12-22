import axios from 'axios'
import { Message } from 'element-ui'
import router from '../../permissions/router'

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
  let status = error.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      // token过期或者失效
      // this.$router
      window.localStorage.removeItem('user-token') // 删除过期的token
      router.push('/login') // 跳转到登录页
      break
    case 403:
      message = '没有设置这条评论的权限'
      break
    default:
      break
  }
  Message({ type: 'warning', message })
})

export default axios
