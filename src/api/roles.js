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
 * 根据ID获取角色
 */
export const getRoleById = id => request({
  method: 'GET',
  url: `/roles/${id}`
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

/**
 * 删除角色
 */
export const deleteRole = id => request({
  method: 'DELETE',
  url: `/roles/${id}`
}).then(res => res.data)

/**
 * 编辑角色
 */
export const editRole = (id, data) => request({
  method: 'PUT',
  url: `/roles/${id}`,
  data: {
    roleName: data.roleName,
    roleDesc: data.roleDesc
  }
}).then(res => res.data)

/**
 * 角色授权
 */
export const allotRole = (id, rids) => request({
  method: 'POST',
  url: `roles/${id}/rights`,
  data: {
    rids
  }
}).then(res => res.data)

/**
 * 删除角色指定权限
 */
export const deleteRightsById = (roleId, rightsId) => request({
  method: 'DELETE',
  url: `roles/${roleId}/rights/${rightsId}`
}).then(res => res.data)
