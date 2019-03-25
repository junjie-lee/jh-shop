/**
 * 权限管理的请求接口
 */
import request from '@/utils/request'

/**
 * 获取权限列表
 */
export const getRights = () => request({
  method: 'GET',
  url: '/rights/list'
}).then(res => res.data)
