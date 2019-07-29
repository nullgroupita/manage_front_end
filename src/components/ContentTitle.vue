<template>
  <el-row style="background-color: #FFFFFF; margin-bottom: 10px;">
    <el-row class="parent-title">{{parentTitle}}</el-row>
    <el-row>
      <hr size="2" color="#e4e7ec">
    </el-row>
    <el-row class="sub-title">
      {{subTitle}}
    </el-row>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      parentTitle: '',
      subTitle: ''
    }
  },
  computed: {
    menuInformation () {
      return this.$store.state.activeMenu
    }
  },
  watch: {
    menuInformation (newVal) {
      this.parentTitle = newVal.parentTitle
      this.subTitle = newVal.subTitle
    }
  }
}
</script>

<style scoped>

  .parent-title {
    font-weight: 400;
    font-size: 20px;
    color: rgb(112, 112, 112);
    line-height: 29px;
    text-decoration: none;
    text-align: left;
    padding-left: 20px;
  }

  .sub-title {
    font-weight: 700;
    font-size: 18px;
    color: rgb(16, 16, 16);
    font-style: normal;
    letter-spacing: 0px;
    line-height: 26px;
    text-decoration: none;
    text-align: left;
    padding-left: 10px;
  }
</style>
