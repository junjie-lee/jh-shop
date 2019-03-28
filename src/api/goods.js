/**
 * 商品列表的请求接口
 */
import request from '@/utils/request'

/**
 * 获取商品列表
 */
export const getGoods = (params, query) => request({
  method: 'GET',
  url: '/goods',
  params: {
    query,
    pagenum: params.pagenum,
    pagesize: params.pagesize
  }
}).then(res => res.data)

/**
 * 添加用户
 */
// export const addUser = data => request({
//   method: 'POST',
//   url: '/users',
//   data: {
//     username: data.username,
//     password: data.password,
//     email: data.email,
//     mobile: data.mobile
//   }
// }).then(res => res.data)

/**
 * 删除商品
 */
export const deleteGoodsById = id => request({
  method: 'DELETE',
  url: `goods/${id}`
}).then(res => res.data)
