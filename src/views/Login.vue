<template>
<el-row>
  <el-col :span = 6 :offset="9">
    <img src="../assets/img/Parking_logo.svg" class="logo-icon">
  </el-col>
  <el-col :span = 6 :offset="9">
  <el-form ref="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" v-model="password"></el-input>
    </el-form-item>
  </el-form>
  </el-col>
  <el-col :span = 6 :offset="10" class="button-margin">
    <el-button type="primary" @click="onLogin" style="margin-right: 5%">登录</el-button>
    <el-button type="reset" @click="onReset">重置</el-button>
  </el-col>
</el-row>
</template>

<script>
import api from '../api'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onLogin () {
      let loginInformation = {
        telephone: this.username,
        password: this.password
      }
      let isLogin = await api.login(loginInformation)
      if (isLogin) {
        this.$router.push('/home')
      } else {
        this.$message.error('用户名或密码错误')
      }
    },
    onReset () {
      this.username = ''
      this.password = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row {
    margin-top: 200px;
  }

  .logo-icon {
    width: 30%;
    margin-left: 40%;
    margin-bottom: 50px;
  }

  .button-margin {
    position: relative;
    left: 5%;
  }
</style>
