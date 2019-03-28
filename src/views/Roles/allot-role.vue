<template>
<div class="allot-role">
  <el-dialog title="授权角色" :visible.sync="dialogVisible" width="500px">
    <el-tree
      :data="rights"
      show-checkbox
      node-key="id"
      :default-expand-all="true"
      :default-checked-keys="checkedRights"
      :props="defaultProps"
      ref="rightsTreeEl">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitHandler">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { allotRole } from '@/api/roles'
import { getRights } from '@/api/rights'
export default {
  name: 'AllotRole',
  data () {
    return {
      rid: '',
      rights: [],
      checkedRights: [],
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    async submitHandler () {
      let checkedKeys = this.$refs.rightsTreeEl.getCheckedKeys()
      checkedKeys = checkedKeys.concat(this.$refs.rightsTreeEl.getHalfCheckedKeys())
      // console.log(this.$refs.rightsTreeEl.getHalfCheckedKeys())
      console.log(checkedKeys.join(','))
      const { meta } = await allotRole(this.rid, checkedKeys.join(','))
      console.log(meta)
      if (meta.status === 200) {
        this.$message({
          message: '角色授权成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.$emit('allot-role-success')
      }
    },
    async showDialog (role) {
      this.dialogVisible = true
      this.rid = role.id

      const { meta, data } = await getRights('tree')
      if (meta.status === 200) {
        this.rights = data
      }

      let temp = []
      role.children.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(third => {
            temp.push(third.id)
          })
        })
      })
      this.checkedRights = temp
    }
  }
}
</script>

<style>
/* .allot-role .el-dialog {
  height: 600px;
  overflow-y: auto;
} */
</style>
