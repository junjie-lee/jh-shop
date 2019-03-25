<template>
<div class="goods">
  <el-card class="box-card">
    <div slot="header" class="header clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20" style="margin-top: -10px;margin-bottom: 5px;">
      <el-col :span="8">
        <el-input placeholder="请输入搜索内容" v-model="searchText" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" plain @click="addGoodVisible = true">添加商品</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableGoods" border stripe style="width: 100%">
      <el-table-column label="编号" width="60" header-align="center" align="center">
        <template slot-scope="scope">
          <span v-text="caculateOrder(scope.$index)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" header-align="center"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(￥)" header-align="center" width="110" align="center"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量(g)" header-align="center" width="110" align="center"></el-table-column>
      <el-table-column prop="add_time" label="添加时间" header-align="center" width="200" align="center"></el-table-column>
      <el-table-column prop="goods_state" label="商品状态" header-align="center" width="80" align="center"></el-table-column>
      <el-table-column label="操作" header-align="center"  align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain icon="el-icon-edit" title="编辑"></el-button>
          <el-button type="danger" size="small" plain icon="el-icon-delete" title="删除"></el-button>
          <el-button type="warning" size="small" plain icon="el-icon-check" title="审核"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="good-page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="pagenum" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </el-card>
</div>
</template>

<script>
import { getGoods } from '@/api/goods'
export default {
  name: 'Goods',
  created () {
    this.loadGoods()
  },
  data () {
    return {
      tableGoods: [],
      searchText: '',
      addGoodVisible: false,
      pagenum: 1,
      pagesize: 10,
      total: 0
    }
  },
  methods: {
    loadGoods () {
      getGoods({
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        let { data, meta } = res
        if (meta.status === 200) {
          this.tableGoods = data.goods
          this.total = data.total
        }
      })
    },
    addGoodHandler () {

    },
    handleSizeChange (val) {
      this.pagesize = val
      this.loadGoods()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadGoods()
    },
    caculateOrder (index) {
      return (this.pagenum - 1) * this.pagesize + index + 1
    }
  }
}
</script>

<style scoped>
.goods {
  height: 100%;
}
.goods .good-page {
  height: 50px;
  background-color: #D3DCE6;
  display: flex;
  align-items: center;
}
</style>

<style>
.goods .box-card {
  height: 100%;
}
.goods .el-card__header {
  background-color: #D3DCE6;
}
</style>
