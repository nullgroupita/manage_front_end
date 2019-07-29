<template>
  <el-row>
    <el-col :span="2" class="title-icon">
      <img src="../assets/img/Parking_logo.svg" width="40%">
    </el-col>
    <el-col :span="5" class="title">
      {{title}}
    </el-col>
    <el-col :span="14">&nbsp;</el-col>
    <el-col :span="2" class="logout" @click.native="logout">
      <el-col :span="12">
        <img src="../assets/img/logout.svg" class="logout-icon" />
      </el-col>
      <el-col :span="12" style="margin-top: 40px; margin-left: -45px;">退出</el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      title: 'Easy Parking 管理平台'
    }
  },
  methods: {
    logout () {
      this.$alert('请到login页面')
    }
  }
}
</script>

<style scoped>

  .title-icon {
    position: relative;
    margin-top: 10px;
  }

  .title {
    font-weight: 400;
    font-size: 28px;
    color: #409EFF;
    padding-top: 1%;
  }

  .logout {
    cursor: pointer;
    font-style: normal;
    font-size: 14px;
  }

  .logout-icon {
    position: relative;
    margin-top: 35px;
    width: 40%;
    margin-right: 10px;
  }
</style>
