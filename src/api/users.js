/**
 * 用户的请求接口
 */
import request from '@/utils/request'

/**
 * 获取用户
 */
export const getUsers = params => request({
  method: 'GET',
  url: '/users',
  params: {
    pagenum: params.pagenum,
    pagesize: params.pagesize
  }
}).then(res => res.data)

/**
 * 添加用户
 */
export const addUser = data => request({
  method: 'POST',
  url: '/users',
  data: {
    username: data.username,
    password: data.password,
    email: data.email,
    mobile: data.mobile
  }
}).then(res => res.data)
