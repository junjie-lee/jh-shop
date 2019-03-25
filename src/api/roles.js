/**
 * 角色的请求接口
 */
import request from '@/utils/request'

/**
 * 获取角色列表
 */
export const getRoles = () => request({
  method: 'GET',
  url: '/roles'
}).then(res => res.data)

/**
 * 添加角色
 */
export const addRole = data => request({
  method: 'POST',
  url: '/roles',
  data: {
    roleName: data.roleName,
    roleDesc: data.roleDesc
  }
}).then(res => res.data)
