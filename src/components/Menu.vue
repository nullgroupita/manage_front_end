<template>
  <el-row>
    <el-menu default-active="employee-list" class="el-menu-vertical-demo" @select="selectMenu">
<!--  @open="handleOpen" @close="handleClose"     :router="true"-->
      <el-submenu index="#" :collapse="true">
        <template slot="title">
          <span class="icon-margin"><img src="../assets/img/employees.svg" class="menu-icon"/></span>
          <span slot="title">&nbsp;&nbsp;员工管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="employee-list">查看员工</el-menu-item>
          <el-menu-item index="add-employee">新增员工</el-menu-item>
          <el-menu-item index="update-employee">修改员工</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="#" :collapse="true">
        <template slot="title">
          <span class="icon-margin"><img src="../assets/img/p.svg" class="menu-icon"/></span>
          <span slot="title">停车场管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="parking-lots">查看停车场</el-menu-item>
          <el-menu-item index="add-parking-lot">新增停车场</el-menu-item>
          <el-menu-item index="update-parking-lot">修改停车场</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
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
      <el-menu-item index="#">
        <span class="icon-margin"><img src="../assets/img/customer.svg" class="menu-icon"/></span>
        <span slot="title">&nbsp;&nbsp;客户管理</span>
      </el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
import {CHANGE_ACTIVE_MENU} from '../common/constants'

export default {
  methods: {
    selectMenu (index) {
      this.$store.commit(CHANGE_ACTIVE_MENU, index)
      this.$router.push(index)
    }
  },
  mounted () {
    this.$store.commit(CHANGE_ACTIVE_MENU, 'employee-list')
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
