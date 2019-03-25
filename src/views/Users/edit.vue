<template>
<el-dialog title="编辑用户" :visible.sync="editUserVisible" width="500px">
  <el-form :model="editForm" label-position="left" :rules="rules" ref="editForm">
    <el-form-item label="用户名" prop="username" label-width="80px">
      <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email" label-width="80px">
      <el-input v-model="editForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile" label-width="80px">
      <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editUserVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserHandler">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { editUser, getUserById } from '@/api/users'

export default {
  name: 'EditUser',
  data () {
    return {
      editUserVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
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
    editUserHandler () {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          editUser(this.editForm.id, this.editForm).then(res => {
            const { meta } = res
            if (meta.status === 200) {
              this.$message({
                message: '修改用户信息成功',
                type: 'success'
              })
              this.editUserVisible = false
              this.$emit('edit-success')
            }
          })
        }
      })
    },
    async showEditDialog (user) {
      const { meta, data } = await getUserById(user.id)
      if (meta.status === 200) {
        this.editUserVisible = true
        this.editForm = data
      }
    }
  }
}
</script>

<style>

</style>
