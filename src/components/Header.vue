<template>
  <el-header  style="text-align: right; font-size: 12px">
    <span style="float: left; margin-top: 10px">
      <img src="../assets/img/Parking_logo.svg" width="40px">
    </span>
    <span class="title">{{title}}</span>
    <span><span style="margin-top: 1px"></span>
    <img src="../assets/img/logout.svg" class="logout-icon" /></span>

<!--    <el-col :span="2" class="title-icon">-->
<!--      <img src="../assets/img/Parking_logo.svg" width="40px">-->
<!--    </el-col>-->
<!--    <el-col :span="10" class="title">-->
<!--      {{title}}-->
<!--    </el-col>-->
<!--    <el-col :span="10">&nbsp;</el-col>-->
<!--    <el-col :span="2" class="logout" @click.native="logout">-->
<!--      <el-col :span="12">-->
<!--        <img src="../assets/img/logout.svg" class="logout-icon" />-->
<!--      </el-col>-->
<!--      <el-col :span="12" style="margin-top: 30px; margin-left: -48px;">退出</el-col>-->
<!--    </el-col>-->
  </el-header>
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
    margin-top: 13px;
  }

  .title {
    font-weight: 400;
    font-size: 28px;
    text-align: left;
    color: #409EFF;
    padding-top: 0px;
    float: left;
    margin-left: 5px
  }
  .el-header {
    background-color: #B3C0D1;
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
    margin-right: 10px;
  }
</style>
