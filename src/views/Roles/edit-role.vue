<template>
<el-dialog title="编辑角色" :visible.sync="dialogVisible" width="500px">
  <el-form :model="formData" label-position="left" :rules="rules" ref="form">
    <el-form-item label="角色名称" prop="roleName" label-width="80px">
      <el-input v-model="formData.roleName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc" label-width="80px">
      <el-input v-model="formData.roleDesc" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitHandler">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { editRole, getRoleById } from '@/api/roles'
export default {
  name: 'EditRole',
  data () {
    return {
      dialogVisible: false,
      formData: {
        roleName: '',
        roleDesc: ''
      },
      id: '',
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
    submitHandler () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          editRole(this.id, this.formData).then(res => {
            const { meta } = res
            if (meta.status === 200) {
              this.$message({
                message: '编辑角色成功',
                type: 'success'
              })
              this.dialogVisible = false
              this.$emit('edit-role-success')
            }
          })
        }
      })
    },
    async showDialog (role) {
      this.id = role.id
      this.dialogVisible = true
      const { data, meta } = await getRoleById(role.id)
      if (meta.status === 200) {
        this.formData = data
      }
    }
  }
}
</script>

<style>

</style>
