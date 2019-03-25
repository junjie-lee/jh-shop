import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/components/Layout'
import Home from '@/views/Home'
import Users from '@/views/Users'
import Rights from '@/views/Rights'
import Roles from '@/views/Roles'
import Goods from '@/views/Goods'
import Categories from '@/views/Categories'
import Orders from '@/views/Orders'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', component: Home },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/goods', component: Goods },
        { path: '/categories', component: Categories },
        { path: '/orders', component: Orders }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 如果路由是登录状态则直接运行通过，否则跳转回登录页
  if (to.path === '/login') {
    return next()
  }

  const token = window.localStorage.getItem('token')

  if (!token) {
    return next('/login')
  }
  next()
})

export default router
