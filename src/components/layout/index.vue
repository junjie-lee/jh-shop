<template>
<div class="layout">
  <el-container>
    <el-aside width="200px" :class="{'aside-collapse': isCollapse}">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#545c64" text-color="#9d9d9d" active-text-color="#ffd04b"
        unique-opened router>
        <div class="logo"></div>
        <el-menu-item index="/">
          <i class="iconfont icon-shouye1 icon-menu"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-menu-item index="/users">
          <i class="iconfont icon-yonghuguanli1 icon-menu"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">
            <i class="iconfont icon-quanxianguanli2 icon-menu"></i>
            <span slot="title">权限管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/roles">
              <i class="iconfont icon-zhanghaoquanxianguanli icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="iconfont icon-quanxianguanli icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="iconfont icon-shangpinguanli icon-menu"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/goods">
              <i class="iconfont icon-3dtouchshangpinliebiao icon-menu"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
            <el-menu-item index="4-2">
              <i class="iconfont icon-xitongcanshu icon-menu"></i>
              <span slot="title">分类参数</span>
            </el-menu-item>
            <el-menu-item index="/categories">
              <i class="iconfont icon-shangpinfenlei icon-menu"></i>
              <span slot="title">商品分类</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/orders">
          <i class="iconfont icon-dingdanguanli1 icon-menu"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-submenu index="6">
          <template slot="title">
            <i class="iconfont icon-baobiaoguanli icon-menu"></i>
            <span slot="title">数据统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1">
              <i class="iconfont icon-renwutongjibaobiao icon-menu"></i>
              <span slot="title">数据报表</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <i class="iconfont icon-caidan header-menu" @click="switchCollapse"></i>
        <span class="shop-title">商城后台管理系统</span>
        <i class="iconfont icon-tuichu header-menu header-logout" @click="logout"></i>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script>
import { removeToken } from '@/utils/auth'

export default {
  name: 'Layout',
  data () {
    return {
      isCollapse: false,
      currentRouter: '/'
    }
  },
  methods: {
    switchCollapse () {
      this.isCollapse = !this.isCollapse
    },
    logout () {
      this.$confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已退出登录'
        })
        removeToken()
        this.$router.replace('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    handleOpen () {

    },
    handleClose () {

    }
  }
}
</script>

<style scoped>
.layout {
  height: 100%;
}
.layout .logo {
  height: 60px;
  background: url("./www.XJH.com.png") no-repeat 7px 5px;
  background-color: #545c64;
}
.layout .header-menu {
  font-size: 30px;
  color: #9d9d9d;
}
.layout .aside-collapse {
  width: 65px !important;
}
.layout .header-menu:hover {
  color: #fff;
}
.layout .shop-title {
  font-size: 28px;
  color: #9d9d9d;
}
.layout .icon-menu {
  font-size: 20px;
  color: #9d9d9d;
  margin-right: 10px;
  vertical-align: middle;
}
</style>

<style>
.layout .el-container {
  height: 100%;
}
.layout .el-aside {
  height: 100%;
}
.layout .el-aside .el-menu {
  height: 100%;
}
.layout .el-menu li span {
  font-size: 16px;
}
.layout .el-menu li:hover > span {
  color: #fff;
}
.layout .el-menu li:hover > i {
  color: #fff;
}
.layout .el-menu li:hover .el-submenu__title > span {
  color: #fff;
}
.layout .el-menu li:hover .el-submenu__title > i {
  color: #fff;
}
.layout .el-menu .is-active span {
  color: #fff;
}
.layout .el-menu .is-active i {
  color: #fff;
}
.layout .el-menu .is-active .el-menu-item span {
  color: #9d9d9d;
}
.layout .el-menu .is-active .is-active span {
  color: #ffd04b;
}
.layout .el-menu .is-active .el-menu-item i {
  color: #9d9d9d;
}
.layout .el-menu .is-active .is-active i {
  color: #ffd04b;
}
.layout .el-header {
  background-color: #545c64;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
