/**
 * 权限管理的请求接口
 */
import request from '@/utils/request'

/**
 * 获取权限列表
 */
export const getRights = (type = 'list') => request({
  method: 'GET',
  url: `/rights/${type}`
}).then(res => res.data)
