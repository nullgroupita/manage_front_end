<template>
    <el-menu :default-active="$route.path.substr(1)" router class="el-menu-vertical-demo" background-color="#FFF" text-color="#303133" active-text-color="#1297ff">
      <el-menu-item index="employee-list">
        <span class="icon-margin"><i class="el-icon-aliyuangongzhanghaoguanli" style="font-size: 30px"></i> </span>
        <span slot="title">员工管理</span>
      </el-menu-item>
      <el-menu-item index="parking-lots">
        <span class="icon-margin"><i class="el-icon-aliyuangongxinxi " style="margin-right: 5px;font-size: 34px"></i></span>
        <span slot="title">停车场管理</span>
      </el-menu-item>
      <el-menu-item index="parking-clerks-maintenance">
        <span class="icon-margin"><img src="../assets/img/parking_clerk.svg" class="menu-icon"/></span>
        <span slot="title">停车员管理</span>
      </el-menu-item>
      <el-menu-item index="parking-lots-status">
        <span class="icon-margin"><img src="../assets/img/manager_status.svg" class="menu-icon"/></span>
        <span slot="title">停车场状态</span>
      </el-menu-item>
      <el-menu-item index="orders-maintenance">
        <span class="icon-margin"><img src="../assets/img/list.svg" class="menu-icon"/></span>
        <span slot="title">&nbsp;&nbsp;订单管理</span>
      </el-menu-item>
    </el-menu>
</template>

<script>

export default {
}
</script>

<style scoped>

  .menu-icon {
    width: 16%;
    margin-right: 5px;
  }

  .icon-margin {
    position: relative;
    left: -10px;
  }
  .el-menu{
    border-right: none;
  }
  .el-menu-item{
    font-size: 20px;
  }

</style>
