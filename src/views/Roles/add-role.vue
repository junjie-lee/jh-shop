<template>
<el-dialog title="添加角色" :visible.sync="dialogVisible" width="500px">
  <el-form :model="addForm" label-position="left" :rules="rules" ref="addForm">
    <el-form-item label="角色名称" prop="roleName" label-width="80px">
      <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc" label-width="80px">
      <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addRoleHandler">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { addRole } from '@/api/roles'
export default {
  name: 'AddRole',
  data () {
    return {
      dialogVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
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
    addRoleHandler () {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          addRole(this.addForm).then(res => {
            const { meta } = res
            if (meta.status === 201) {
              this.$message({
                message: '添加角色成功',
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.dialogVisible = false
              this.$emit('add-role-success')
            }
          })
        }
      })
    },
    showAddDialog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style>

</style>
