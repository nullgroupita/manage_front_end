<template>
  <el-header style=" font-size: 12px">
    <el-row>
      <el-col :span="1">
        <i class="el-icon-alitingchechang" style="font-size:60px;color: #FFF;"></i>
      </el-col>
      <el-col :span="5">
        <span class="title">{{title}}</span>
      </el-col>
      <el-col :span="1" :offset="15">
        <i class="el-icon-user" style="color: #FFF;font-size: 40px;line-height: unset"></i>
      </el-col>
      <el-col :span="2" :offset="0">
        <span class="username">{{username}}</span>
      </el-col>
    </el-row>
<!--    <span style="float: left; margin-top: 10px">-->
<!--      <img src="../assets/img/p-logo-white.png" width="40px">-->
<!--    </span>-->
<!--    <span class="title">{{title}}</span>-->
<!--    <span style="float: right">-->
<!--      place Holder-->
<!--    </span>-->
<!--    <span class="logout" @click.native="logout">-->
<!--      <span>-->
<!--        <i class="el-icon-user" style="color: #FFF;font-size: 34px"></i>-->
<!--      </span>-->
<!--    </span>-->
  </el-header>
</template>

<script>
import Avatar from 'vue-avatar'
import api from '../api/index'

export default {
  data () {
    return {
      title: 'Easy Parking 管理平台',
      username: ''
    }
  },
  components: {
    Avatar
  },
  methods: {
    async checkUserRole () {
      let response = await api.getLoginUserInformation()
      this.username = response.name
    }
  },
  mounted () {
    this.checkUserRole()
  }
}
</script>

<style scoped>

  .title-icon {
    position: relative;
    margin-top: 13px;
  }

  .title {
    font-weight: 400;
    font-size: 28px;
    text-align: left;
    color: #FFFFFF;
    padding-top: 0px;
    float: left;
    margin-left: 5px
  }
  .username {
    font-weight: 300;
    font-size: 20px;
    text-align: left;
    color: #FFFFFF;
    padding-top: 0px;
    float: left;
    margin-left: 5px
  }

  .el-header {

    color: #333;
    line-height: 60px;
  }

  .logout {
    cursor: pointer;
    font-style: normal;
    font-size: 14px;
  }

  .logout-icon {
    position: relative;
    margin-top: 15px;
    width: 30px;
  }

</style>
