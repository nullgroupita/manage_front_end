<template>
  <el-row style="background-color: #dddfe6">
    <el-row class="header">
      <el-row class="header-content">
        <Header></Header>
      </el-row>
    </el-row>
    <el-row>
      <el-col :span="3" class="aside">
        <el-row class="menu-content">
          <Menu></Menu>
        </el-row>
      </el-col>
      <el-col :span="21" class="main">
        <el-row class="main-content">
          <ContentTitle></ContentTitle>
          <router-view />
        </el-row>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import Menu from '../components/Menu'
import Header from '../components/Header'
import ContentTitle from '../components/ContentTitle'
export default {
  components: {
    Menu, Header, ContentTitle
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    text-align: center;
    height: 100px;
  }

  .header-content {
    background-color: #f4f5f9;
    margin: 10px;
    height: 80px;
  }

  .aside {
    color: #333;
    text-align: center;
    height: 870px;
  }

  .menu-content {
    margin: 10px;
    background-color: #f4f5f9;
    height: 850px;
  }

  .main {
    color: #333;
    text-align: center;
    height: 870px;
  }

  .main-content {
    margin: 10px;
    background-color: #f4f5f9;
    height: 850px;
  }
</style>
