<template>
<div class="rights">
  <el-card class="box-card">
    <div slot="header" class="header clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="tableRights" border stripe style="width: 600px;">
      <el-table-column label="序号" width="80" header-align="center" align="center" type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" header-align="center"></el-table-column>
      <el-table-column prop="path" label="路径" header-align="center"></el-table-column>
      <el-table-column label="层级" header-align="center">
        <template slot-scope="scope">
          <span v-text="getLevel(scope.row.level)"></span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
import { getRights } from '@/api/rights'
export default {
  name: 'Rights',
  created () {
    this.loadRights()
  },
  data () {
    return {
      tableRights: []
    }
  },
  methods: {
    loadRights () {
      getRights().then(res => {
        console.log(res)
        let { meta, data } = res
        if (meta.status === 200) {
          this.tableRights = data
        }
      })
    },
    getLevel (level) {
      let levels = {
        '0': '一级',
        '1': '二级',
        '2': '三级'
      }
      return levels[level]
    }
  }
}
</script>

<style scoped>
.rights {
  height: 100%;
}
</style>

<style>
.rights .box-card {
  height: 100%;
}
.rights .el-card__header {
  background-color: #D3DCE6;
}
</style>
