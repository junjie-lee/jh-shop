<template>
<el-dialog title="分配角色" :visible.sync="allotUserVisible" width="500px">
  <el-form :model="allotForm" label-position="left" ref="allotForm">
    <el-form-item label="当前用户" prop="username" label-width="80px">
      <el-input v-model="allotForm.username" disabled></el-input>
    </el-form-item>
    <el-form-item label="角色选择" label-width="80px">
      <el-select v-model="allotForm.rid" placeholder="请选择">
        <el-option :value="-1" label="请选择"></el-option>
        <el-option
          v-for="role in roles"
          :key="role.id"
          :label="role.roleName"
          :value="role.id">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="allotUserVisible = false">取 消</el-button>
    <el-button type="primary" @click="allotUserHandler">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { getUserById, allotUserRole } from '@/api/users'
import { getRoles } from '@/api/roles'
export default {
  name: 'AllotUser',
  data () {
    return {
      roles: [],
      allotUserVisible: false,
      allotForm: {
        username: '',
        rid: -1,
        id: 0
      }
    }
  },
  methods: {
    async allotUserHandler () {
      const { meta } = await allotUserRole(this.allotForm.id, this.allotForm.rid)
      if (meta.status === 200) {
        this.$message({
          message: '分配用户角色成功',
          type: 'success'
        })
        this.allotUserVisible = false
      }
    },
    async showAllotDialog (user) {
      this.allotUserVisible = true
      const { meta, data } = await getUserById(user.id)
      if (meta.status === 200) {
        this.allotForm = data
      }
      const { meta: roleMeta, data: roleData } = await getRoles()
      if (roleMeta.status === 200) {
        this.roles = roleData
      }
    }
  }
}
</script>

<style>

</style>
