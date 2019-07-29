<template>
  <el-container>
    <el-col :span="2" class="title-icon">
      <img src="../assets/img/Parking_logo.svg" width="40%">
    </el-col>
    <el-col :span="10" class="title">
      {{title}}
    </el-col>
    <el-col :span="10">&nbsp;</el-col>
    <el-col :span="2" class="logout" @click.native="logout">
      <el-col :span="12">
        <img src="../assets/img/logout.svg" class="logout-icon" />
      </el-col>
      <el-col :span="12" style="margin-top: 30px; margin-left: -48px;">退出</el-col>
    </el-col>
  </el-container>
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
    text-align: left;
    color: #409EFF;
    padding-top: 5px;
  }

  .logout {
    cursor: pointer;
    font-style: normal;
    font-size: 14px;
  }

  .logout-icon {
    position: relative;
    margin-top: 12px;
    width: 40%;
    margin-right: 10px;
  }
</style>
