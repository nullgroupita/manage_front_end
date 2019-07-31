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
          <ContentTitle></ContentTitle>
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
import {GET_MANAGER_PARKINGLOTS, GET_USER_INFORMATION} from '../common/constants'
export default {
  components: {
    Menu, Header, ContentTitle
  },
  mounted () {
    this.$store.dispatch(GET_USER_INFORMATION).then(val => {
      this.$store.dispatch(GET_MANAGER_PARKINGLOTS, this.$store.state.user.id)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    text-align: center;
    height: 100px;
    color: #FFFFFF;
  }

  .aside {
    color: #333;
    text-align: center;
    display: block;
    position: relative;
    overflow-y: scroll;
  }

  .menu-content {
    margin: 10px;
    background-color: #f4f5f9;
    height: 100%;

  }

  .main {
    color: #333;
    text-align: center;
    height: 100%;
  }

  .main-content {
    margin: 10px;
    background-color: #f4f5f9;
    height: 100%;
  }

  >>> .el-header {
    background-color: #FFFFFF;
  }
</style>
