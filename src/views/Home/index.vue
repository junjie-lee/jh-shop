<template>
<div class="home">
  <ul>
    <li>
      <a href="/#/users">
        <i class="iconfont icon-yonghuguanli1"></i>
        <div class="text">
          <h2>用户管理</h2>
          <p>用户信息操作管理</p>
        </div>
      </a>
    </li>
    <li>
      <a href="/#/roles">
        <i class="iconfont icon-zhanghaoquanxianguanli"></i>
        <div class="text">
          <h2>角色列表</h2>
          <p>角色信息操作管理</p>
        </div>
      </a>
    </li>
    <li>
      <a href="/#/rights">
        <i class="iconfont icon-quanxianguanli"></i>
        <div class="text">
          <h2>权限列表</h2>
          <p>用户权限操作管理</p>
        </div>
      </a>
    </li>
    <li>
      <a href="/#/goods">
        <i class="iconfont icon-3dtouchshangpinliebiao"></i>
        <div class="text">
          <h2>商品列表</h2>
          <p>商品信息操作管理</p>
        </div>
      </a>
    </li>
    <li>
      <a href="/#">
        <i class="iconfont icon-xitongcanshu"></i>
        <div class="text">
          <h2>分类参数</h2>
          <p>商品分类参数管理</p>
        </div>
      </a>
    </li>
    <li>
      <a href="/#/categories">
        <i class="iconfont icon-shangpinfenlei"></i>
        <div class="text">
          <h2>商品分类</h2>
          <p>商品分类信息管理</p>
        </div>
      </a>
    </li>
    <li>
      <a href="/#/orders">
        <i class="iconfont icon-dingdanguanli1"></i>
        <div class="text">
          <h2>订单管理</h2>
          <p>订单详情操作管理</p>
        </div>
      </a>
    </li>
    <li>
      <a href="/#">
        <i class="iconfont icon-renwutongjibaobiao"></i>
        <div class="text">
          <h2>数据报表</h2>
          <p>商品数据报表展示</p>
        </div>
      </a>
    </li>
  </ul>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.home ul {
  padding-left: 50px;
  padding-top: 20px;
}
.home li {
  float: left;
}
.home li a {
  display: block;
  text-decoration: none;
  background-color: #D3DCE6;
  border-radius: 10px;
  padding: 10px 300px 10px 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  color: #9d9d9d;
  cursor: pointer;
}
.home li a:hover {
  color: #fff;
}
.home li i {
  font-size: 96px;
  vertical-align: middle;
  margin-right: 20px;
}
.home li .text {
  display: inline-block;
  vertical-align: top;
}
.home li .text h2 {
  text-align: center;
  font-size: 24px;
  margin-top: 15px;
}
.home li .text p {
  text-align: center;
  font-size: 18px;
  margin-top: 15px;
}
</style>
