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
        <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="addUserVisible = true">添加用户</el-button>
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
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center"  align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain icon="el-icon-edit" title="编辑用户"></el-button>
          <el-button type="danger" size="small" plain icon="el-icon-delete" title="删除用户"></el-button>
          <el-button type="warning" size="small" plain icon="el-icon-check" title="分配角色"></el-button>
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
  <el-dialog title="添加用户" :visible.sync="addUserVisible" width="500px">
    <el-form :model="addForm" label-position="left" :rules="rules" ref="addForm">
      <el-form-item label="用户名" prop="username" label-width="80px">
        <el-input v-model="addForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" label-width="80px">
        <el-input type="password" v-model="addForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" label-width="80px">
        <el-input v-model="addForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile" label-width="80px">
        <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addUserVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUserHandler">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { getUsers, addUser } from '@/api/users'
export default {
  name: 'Users',
  created () {
    this.loadUsers()
  },
  data () {
    return {
      tableUsers: [],
      searchText: '',
      addUserVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      pagenum: 1,
      pagesize: 10,
      total: 0,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度在6至16个字符之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { min: 11, max: 11, message: '手机号必须为11位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loadUsers () {
      getUsers({
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        let { data, meta } = res
        console.log(data)
        if (meta.status === 200) {
          this.tableUsers = data.users
          this.total = data.total
        }
      })
    },
    addUserHandler () {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          addUser(this.addForm).then(res => {
            let { meta } = res
            console.log(meta)
            if (meta.status === 201) {
              this.$refs['addForm'].resetFields()
              this.addUserVisible = false
            }
          })
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
