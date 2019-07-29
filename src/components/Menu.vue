<template>
  <el-row>
    <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :router="true">
      <el-submenu index="1" :collapse="true">
        <template slot="title">
          <span class="icon-margin"><img src="../assets/img/employees.svg" class="menu-icon"/></span>
          <span slot="title">&nbsp;&nbsp;员工管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">查看员工</el-menu-item>
          <el-menu-item index="1-2">新增员工</el-menu-item>
          <el-menu-item index="1-3">修改员工</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2" :collapse="true">
        <template slot="title">
          <span class="icon-margin"><img src="../assets/img/p.svg" class="menu-icon"/></span>
          <span slot="title">停车场管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">查看停车场</el-menu-item>
          <el-menu-item index="2-2">新增停车场</el-menu-item>
          <el-menu-item index="2-3">修改停车场</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
        <span class="icon-margin"><img src="../assets/img/parking_clerk.svg" class="menu-icon"/></span>
        <span slot="title">停车员管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <span class="icon-margin"><img src="../assets/img/manager_status.svg" class="menu-icon"/></span>
        <span slot="title">停车场状态</span>
      </el-menu-item>
      <el-menu-item index="5">
        <span class="icon-margin"><img src="../assets/img/list.svg" class="menu-icon"/></span>
        <span slot="title">&nbsp;&nbsp;订单管理</span>
      </el-menu-item>
      <el-menu-item index="6">
        <span class="icon-margin"><img src="../assets/img/customer.svg" class="menu-icon"/></span>
        <span slot="title">&nbsp;&nbsp;客户管理</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .menu-icon {
    width: 10%;
    margin-right: 5px;
  }

  .icon-margin {
    position: relative;
    left: -10px;
  }
</style>
