/**
 * 公共的接口封装
 */
import request from '@/utils/request'

export const login = data => request({
  method: 'POST',
  url: '/login',
  data: {
    username: data.username,
    password: data.password
  }
}).then(res => res.data)
