<template>
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
</template>

<script>
import { addUser } from '@/api/users'
export default {
  name: 'AddUser',
  data () {
    return {
      addUserVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
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
    addUserHandler () {
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          addUser(this.addForm).then(res => {
            const { meta } = res
            if (meta.status === 201) {
              this.$message({
                message: '添加用户成功',
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.addUserVisible = false
              this.$emit('add-success')
            }
          })
        }
      })
    },
    showAddDialog () {
      this.addUserVisible = true
    }
  }
}
</script>

<style>

</style>
