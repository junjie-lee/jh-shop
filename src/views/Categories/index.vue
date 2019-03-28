<template>
<div class="categories">
  <el-card class="box-card">
    <div slot="header" class="header clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20" style="margin-top: -10px;margin-bottom: 5px;">
      <el-col :span="6">
        <el-button type="primary" plain @click="addCateVisible = true">添加分类</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableCates" border stripe style="width: 100%">
      <el-table-column label="序号" width="80" header-align="center" align="center">
        <template slot-scope="scope">
          <span v-text="caculateOrder(scope.$index)"></span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="cat_name" label="分类名称" header-align="center">
        <template slot-scope="scope">
        <el-tree
          :data="tableCates[scope.$index].children"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick"
          icon-class="el-icon-circle-plus-outline">
        </el-tree>
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="email" label="邮箱" header-align="center"></el-table-column>
      <el-table-column prop="mobile" label="电话" header-align="center"></el-table-column>
      <el-table-column label="用户状态" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66"></el-switch>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" header-align="center"  align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain icon="el-icon-edit" title="编辑用户"></el-button>
          <el-button type="danger" size="small" plain icon="el-icon-delete" title="删除用户"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="cate-page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="pagenum" :page-sizes="[10, 20, 30, 100]" :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </el-card>
</div>
</template>

<script>
import { getCategories } from '@/api/categories'
export default {
  name: 'Categories',
  created () {
    this.loadCates()
  },
  data () {
    return {
      tableCates: [],
      searchText: '',
      addCateVisible: false,
      pagenum: 1,
      pagesize: 10,
      total: 0,
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      }
    }
  },
  methods: {
    async loadCates () {
      const { data } = await getCategories()
      console.log(data)
      this.tableCates = data
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.loadCates()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadCates()
    },
    caculateOrder (index) {
      return (this.pagenum - 1) * this.pagesize + index + 1
    },
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>
.categories {
  height: 100%;
}
.categories .cate-page {
  height: 50px;
  background-color: #D3DCE6;
  display: flex;
  align-items: center;
}
</style>

<style>
.categories .box-card {
  height: 100%;
}
.categories .el-card__header {
  background-color: #D3DCE6;
}
</style>
