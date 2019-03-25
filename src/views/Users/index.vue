<template>
<div class="users">
  <el-card class="box-card">
    <div slot="header" class="header clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20" style="margin-top: -10px;margin-bottom: 5px;">
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select"
          @keyup.enter.native="loadUsers">
          <el-button slot="append" icon="el-icon-search" @click="loadUsers"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" plain @click="$refs.addUserEl.showAddDialog()">
          添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableUsers" border stripe style="width: 100%">
      <el-table-column label="序号" width="80" header-align="center" align="center">
        <template slot-scope="scope">
          <span v-text="caculateOrder(scope.$index)"></span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="姓名" header-align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" header-align="center"></el-table-column>
      <el-table-column prop="mobile" label="电话" header-align="center"></el-table-column>
      <el-table-column label="用户状态" header-align="center" align="center" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" @change="changeUserState(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center"  align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain icon="el-icon-edit"
            title="编辑用户" @click="$refs.editUserEl.showEditDialog(scope.row)"></el-button>
          <el-button type="danger" size="small" plain icon="el-icon-delete"
            title="删除用户" @click="deleteUser(scope.row)"></el-button>
          <el-button type="warning" size="small" plain icon="el-icon-check"
            title="分配角色" @click="$refs.allotUserEl.showAllotDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="user-page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="pagenum" :page-sizes="[10, 20, 30, 100]" :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </el-card>

  <!-- 添加用户组件 -->
  <add-user ref="addUserEl" v-on:add-success="loadUsers"></add-user>
  <!-- 编辑用户组件 -->
  <edit-user ref="editUserEl" v-on:edit-success="loadUsers"></edit-user>
  <!-- 分配用户角色 -->
  <allot-user ref="allotUserEl"></allot-user>
</div>
</template>

<script>
import AddUser from './add.vue'
import EditUser from './edit.vue'
import AllotUser from './allot-user'
import { getUsers, deleteUserById, changeUserState } from '@/api/users'
export default {
  name: 'Users',
  created () {
    this.loadUsers()
  },
  data () {
    return {
      tableUsers: [],
      searchText: '',
      pagenum: 1,
      pagesize: 10,
      total: 0
    }
  },
  components: {
    AddUser,
    EditUser,
    AllotUser
  },
  methods: {
    loadUsers () {
      getUsers({
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }, this.searchText).then(res => {
        let { data, meta } = res
        console.log(data)
        if (meta.status === 200) {
          this.tableUsers = data.users
          this.total = data.total
        }
      })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.loadUsers()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadUsers()
    },
    caculateOrder (index) {
      return (this.pagenum - 1) * this.pagesize + index + 1
    },
    deleteUser (user) {
      this.$confirm('确定要删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUserById(user.id).then(res => {
          const { meta } = res
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除用户成功!'
            })
            this.loadUsers()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async changeUserState (user) {
      const { meta, data } = await changeUserState(user.id, user.mg_state)
      console.log(data)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: `${data.mg_state ? '开启' : '禁用'}用户成功`
        })
      }
    }
  }
}
</script>

<style scoped>
.users {
  height: 100%;
}
.users .user-page {
  height: 50px;
  background-color: #D3DCE6;
  display: flex;
  align-items: center;
}
</style>

<style>
.user .box-card {
  height: 100%;
}
.users .el-card__header {
  background-color: #D3DCE6;
}
</style>
