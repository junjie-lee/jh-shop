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
        <el-button type="primary" plain @click="addRoleHandler">添加角色</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableRoles" border stripe style="width: 100%">
      <el-table-column type="expand" class="expand-column">
        <template slot-scope="scope">
          <el-row v-for="first in scope.row.children" :key="first.id" class="first">
            <el-col :span="4" class="first-col" v-if="first.children.length > 0">
              <el-tag closable @close="deleteTag(scope.row.id, first.id)">{{ first.authName }}</el-tag>
              <i class="el-icon-arrow-right next-level"></i>
            </el-col>
            <el-col :span="20" v-if="first.children.length > 0">
              <el-row v-for="second in first.children" :key="second.id" class="second">
                <el-col :span="4" class="second-col" v-if="second.children.length > 0">
                  <el-tag closable type="success" @close="deleteTag(scope.row.id, second.id)">
                    {{ second.authName }}
                  </el-tag>
                  <i class="el-icon-arrow-right next-level"></i>
                </el-col>
                <el-col :span="20" class="second-col" v-if="second.children.length > 0">
                  <el-tag closable type="warning" v-for="third in second.children" :key="third.id"
                    class="third-col" @close="deleteTag(scope.row.id, third.id)">
                    {{ third.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
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
          <el-button type="primary" size="small" plain icon="el-icon-edit" title="编辑角色"
            @click="editRoleHandler(scope.row)"></el-button>
          <el-button type="danger" size="small" plain icon="el-icon-delete" title="删除角色"
            @click="deleteRoleHandler(scope.row)"></el-button>
          <el-button type="warning" size="small" plain icon="el-icon-check" title="授权角色"
            @click="allotRoleHandler(scope.row)"></el-button>
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
  <!-- 添加角色 -->
  <add-role ref="addRoleEl" v-on:add-role-success="loadRoles"></add-role>
  <!-- 编辑角色 -->
  <edit-role ref="editRoleEl" v-on:edit-role-success="loadRoles"></edit-role>
  <!-- 分配角色权限 -->
  <allot-role ref="allotRoleEl" v-on:allot-role-success="loadRoles"></allot-role>
</div>
</template>

<script>
import { getRoles, deleteRole, deleteRightsById } from '@/api/roles'
import AddRole from './add-role.vue'
import EditRole from './edit-role.vue'
import AllotRole from './allot-role.vue'
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
  components: {
    AddRole,
    EditRole,
    AllotRole
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
      this.$refs.addRoleEl.showAddDialog()
    },
    editRoleHandler (role) {
      this.$refs.editRoleEl.showDialog(role)
    },
    allotRoleHandler (role) {
      this.$refs.allotRoleEl.showDialog(role)
    },
    async deleteTag (roleId, rightsId) {
      const { meta } = await deleteRightsById(roleId, rightsId)
      if(meta.status === 200) {
        this.$message({
          type: 'success',
          message: '删除权限成功!'
        })
        this.loadRoles()
      }
    },
    deleteRoleHandler (role) {
      this.$confirm('确定要删除该角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(role.id).then(res => {
          const { meta } = res
          if (meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除角色成功!'
            })
            this.loadRoles()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
.roles .first-col {
  padding: 5px 0;
}
.roles .second-col {
  padding-top: 5px;
  padding-bottom: 3px;
}
.roles .third-col {
  margin-right: 2px;
  margin-bottom: 2px;
}
.roles .second {
  border-bottom: 1px solid #EBEEF5;
}
.roles .first:last-child .second {
  border-bottom: none;
}
.roles .next-level {
  font-size: 18px;
  font-weight: 700;
  color: #909399;
}
</style>

<style>
.roles .box-card {
  height: 100%;
}
.roles .el-card__header {
  background-color: #D3DCE6;
}
.roles .el-table__expanded-cell {
  padding: 5px 5px;
}
</style>
