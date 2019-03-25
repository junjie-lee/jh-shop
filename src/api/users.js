/**
 * 用户的请求接口
 */
import request from '@/utils/request'

/**
 * 获取用户
 */
export const getUsers = (params, query) => request({
  method: 'GET',
  url: '/users',
  params: {
    pagenum: params.pagenum,
    pagesize: params.pagesize,
    query
  }
}).then(res => res.data)

/**
 * 根据id获取用户
 */
export const getUserById = id => request({
  method: 'GET',
  url: `/users/${id}`
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

/**
 * 编辑用户信息
 */
export const editUser = (id, data) => request({
  method: 'PUT',
  url: `users/${id}`,
  data: {
    email: data.email,
    mobile: data.mobile
  }
}).then(res => res.data)

/**
 * 修改用户状态
 */
export const changeUserState = (id, state) => request({
  method: 'PUT',
  url: `users/${id}/state/${state}`
}).then(res => res.data)

/**
 * 删除用户
 */
export const deleteUserById = id => request({
  method: 'DELETE',
  url: `users/${id}`
}).then(res => res.data)

/**
 * 分配用户角色
 */
export const allotUserRole = (id, rid) => request({
  method: 'PUT',
  url: `users/${id}/role`,
  data: {
    rid
  }
}).then(res => res.data)
