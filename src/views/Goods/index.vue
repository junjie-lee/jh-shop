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
        <el-input placeholder="请输入搜索内容" v-model="searchText" class="input-with-select"
          @keyup.enter.native="loadGoods">
          <el-button slot="append" icon="el-icon-search" @click="loadGoods"></el-button>
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
      <el-table-column label="商品价格(￥)" header-align="center" width="110" align="center">
        <template slot-scope="scope">
          <span v-text="formatFixed(scope.row.goods_price)"></span>
        </template>
      </el-table-column>
      <el-table-column label="商品重量(g)" header-align="center" width="110" align="center">
        <template slot-scope="scope">
          <span v-text="formatFixed(scope.row.goods_weight, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column label="添加时间" header-align="center" width="200" align="center">
        <template slot-scope="scope">
          <span v-text="formatGoodsDate(scope.row.add_time)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="goods_state" label="商品状态" header-align="center" width="80" align="center"></el-table-column>
      <el-table-column label="操作" header-align="center"  align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain icon="el-icon-edit" title="编辑"></el-button>
          <el-button type="danger" size="small" plain icon="el-icon-delete" title="删除"
            @click="deleteGoods(scope.row)"></el-button>
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
import { getGoods, deleteGoodsById } from '@/api/goods'
import { formatDate } from '@/utils/format'
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
      }, this.searchText).then(res => {
        let { data, meta } = res
        if (meta.status === 200) {
          this.tableGoods = data.goods
          this.total = data.total
        }
      })
    },
    deleteGoods (goods) {
      this.$confirm('确定要删除该商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoodsById(goods.goods_id).then(res => {
          const { meta } = res
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除商品成功!'
            })
            this.loadGoods()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
    },
    formatGoodsDate (date) {
      return formatDate(date)
    },
    formatFixed (number, fix = 2) {
      return number.toFixed(fix)
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
