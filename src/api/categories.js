/**
 * 商品分类的请求接口
 */
import request from '@/utils/request'

/**
 * 获取用户
 */
export const getCategories = () => request({
  method: 'GET',
  url: '/categories',
  params: {
    type: [1]
  }
}).then(res => res.data)
