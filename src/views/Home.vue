<template>
  <el-container style="background-color: #dddfe6;height: 100%">
    <el-header class="header">
      <Header class="header-content"></Header>
    </el-header>
    <el-container>
      <el-aside width="230px" class="aside">
        <Menu class="menu-content"></Menu>
      </el-aside>
      <el-container class="main">
        <el-main class="main-content">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">员工管理</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
<!--  <el-row style="background-color: #dddfe6">-->
<!--    <el-row class="header">-->
<!--      <el-row class="header-content">-->
<!--        <Header></Header>-->
<!--      </el-row>-->
<!--    </el-row>-->
<!--    <el-row>-->
<!--      <el-col :span="3" class="aside">-->
<!--        <el-row class="menu-content">-->
<!--          <Menu></Menu>-->
<!--        </el-row>-->
<!--      </el-col>-->
<!--      <el-col :span="21" class="main">-->
<!--        <el-row class="main-content">-->
<!--          <ContentTitle></ContentTitle>-->
<!--          <router-view />-->
<!--        </el-row>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--  </el-row>-->
</template>

<script>
import Menu from '../components/Menu'
import Header from '../components/Header'
import ContentTitle from '../components/ContentTitle'
import {GET_USER_INFORMATION} from '../common/constants'
export default {
  components: {
    Menu, Header, ContentTitle
  },
  mounted () {
    this.$store.dispatch(GET_USER_INFORMATION)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    text-align: center;
    height: 100px;
    color: rgb(34,167,127);
  }

  .aside {
    background-color:#2a2a2a;
    text-align: center;
    display: block;
    position: relative;
    overflow-y: scroll;
  }

  .menu-content {
    height: 100%;
  }

  .main {
    color: #333;
    text-align: center;
    height: 100%;
  }

  .main-content {

    background-color: #f4f5f9;

    padding-bottom: 0px;
  }

  >>> .el-header {
    background-color: rgb(24,144,255);
  }
</style>
