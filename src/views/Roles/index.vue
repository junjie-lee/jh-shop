<template>
<div class="roles">
  <el-card class="box-card">
    <div slot="header" class="header clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20" style="margin-top: -10px;margin-bottom: 5px;">
      <el-col :span="6">
        <el-button type="primary" plain @click="addRoleVisible = true">添加角色</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableRoles" border stripe style="width: 900px">
      <el-table-column width="80"></el-table-column>
      <!-- <el-table-column label="序号" width="80" header-align="center" align="center">
        <template slot-scope="scope">
          <span v-text="caculateOrder(scope.$index)"></span>
        </template>
      </el-table-column> -->
      <el-table-column type="index" label="序号" width="80" header-align="center" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" header-align="center"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" header-align="center"></el-table-column>
      <el-table-column label="操作" header-align="center"  align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain icon="el-icon-edit" title="编辑角色"></el-button>
          <el-button type="danger" size="small" plain icon="el-icon-delete" title="删除角色"></el-button>
          <el-button type="warning" size="small" plain icon="el-icon-check" title="授权角色"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="role-page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page.sync="pagenum" :page-sizes="[10, 20, 30, 100]" :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div> -->
  </el-card>
  <el-dialog title="添加角色" :visible.sync="addRoleVisible" width="500px">
    <el-form :model="addForm" label-position="left" :rules="rules" ref="addForm">
      <el-form-item label="角色名称" prop="roleName" label-width="80px">
        <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc" label-width="80px">
        <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addRoleVisible = false">取 消</el-button>
      <el-button type="primary" @click="addRoleHandler">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { getRoles, addRole } from '@/api/roles'
export default {
  name: 'Roles',
  created () {
    this.loadRoles()
  },
  data () {
    return {
      tableRoles: [],
      addRoleVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      // pagenum: 1,
      // pagesize: 10,
      // total: 0,
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loadRoles () {
      getRoles().then(res => {
        let { data, meta } = res
        if (meta.status === 200) {
          this.tableRoles = data
          // this.total = data.total
        }
      })
    },
    addRoleHandler () {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          addRole(this.addForm).then(res => {
            let { meta } = res
            console.log(meta)
            if (meta.status === 201) {
              this.$refs['addForm'].resetFields()
              this.addRoleVisible = false
            }
          })
        }
      })
    }
    // handleSizeChange (val) {
    //   this.pagesize = val
    //   this.loadUsers()
    // },
    // handleCurrentChange (val) {
    //   this.pagenum = val
    //   this.loadUsers()
    // },
    // caculateOrder (index) {
    //   return (this.pagenum - 1) * this.pagesize + index + 1
    // }
  }
}
</script>

<style scoped>
.roles {
  height: 100%;
}
.roles .role-page {
  height: 50px;
  background-color: #D3DCE6;
  display: flex;
  align-items: center;
}
</style>

<style>
.roles .box-card {
  height: 100%;
}
.roles .el-card__header {
  background-color: #D3DCE6;
}
</style>
