/**
 * 封装axios请求模块
 */
import axios from 'axios'
import router from '@/routers/router'

// 创建axios实例
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

/**
 * axios请求拦截器
 */
http.interceptors.request.use(function (config) {
  if (config.url !== 'login') {
    config.headers.Authorization = window.localStorage.getItem('token')
  }

  return config
}, function (error) {
  // 处理请求错误
  return Promise.reject(error)
})

/**
 * axios响应拦截器
 */
axios.interceptors.response.use(function (response) {
  // 处理响应数据
  if (response.data.meta.status === 401) {
    router.replace('/login')
  }
  return response
}, function (error) {
  // 处理响应错误
  return Promise.reject(error)
})

export default http
