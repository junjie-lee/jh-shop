<template>
<div class="login">
  <div class="login-frame">
    <div class="login-pic">
      <img src="./login.jpg" alt="">
    </div>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px"
      class="loginForm" label-position='top'>
      <el-form-item prop="username" tabindex="0">
        <i class="iconfont icon-yonghu login-font"></i>
        <el-input v-model="loginForm.username" class="login-input"></el-input>
      </el-form-item>
      <el-form-item prop="password" tabindex="1">
        <i class="iconfont icon-icon2 login-font"></i>
        <el-input type="password" v-model="loginForm.password" class="login-input">
        </el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn" @click="onLogin">登录</el-button>
    </el-form>
  </div>
</div>
</template>

<script>
import { login } from '@/api'
import { setToken } from '@/utils/auth'

export default {
  name: 'Login',
  data () {
    // let validateName = (rule, value, callback) => {
    //   console.log(this.msg)
    //   if(this.msg === '用户名不存在') {
    //     callback(new Error(this.msg))
    //   } else {
    //     callback()
    //   }
    // }
    // let validatePassword = (rule, value, callback) => {
    //   if(this.msg === '密码错误') {
    //     callback(new Error(this.msg))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      msg: '',
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          login(this.loginForm).then(res => {
            console.log(res)
            const { data, meta } = res
            const { msg, status } = meta

            if (status === 200) {
              // 将用户的登录令牌存入本地
              setToken(data.token)
              this.$router.replace('/')
            } else if (status === 400) {
              console.log(msg)
              // new Error(msg)
              // this.msg = msg
              // console.log('check' + this.msg)
              // this.checkLogin()
            }
          })
        }
      })
    }
    // checkLogin () {
    //   console.log('check')
    // }
  }
}
</script>

<style scoped>
.login {
  height: 100%;
  background-color: #545C64;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login .login-frame {
  width: 500px;
  height: 350px;
  border-radius: 10px;
  padding-top: 50px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.login .login-frame .login-pic {
  position: absolute;
  border-radius: 100%;
  overflow: hidden;
  border: 10px solid rgba(217, 236, 255, 0.5);
  top: -90px;
  left: 170px;
  width: 160px;
  height: 160px;
}
.login .login-frame .login-pic img {
  display: block;
  width: 100%;
  height: 100%;
}
.login .login-frame .loginForm {
  width: 350px;
}
.login .el-form-item {
  position: relative;
}
.login .login-font {
  position: absolute;
  font-size: 20px;
  color: #DCDFE6;
  z-index: 5;
  left: 10px;
}

.login .login-frame .login-btn {
  margin-top: 20px;
  width: 350px;
}
</style>

<style>
.login .login-frame .login-input input {
  padding-left: 35px;
}
.login .login-frame .is-error .login-font {
  color: #F56C6C;
}
.login .login-frame .is-success .login-font {
  color: #67C23A;
}
</style>
