<template>
  <el-row>
    <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" @select="selectMenu">
      <el-menu-item index="employee-list">
        <span class="icon-margin"><img src="../assets/img/employees.svg" class="menu-icon"/></span>
        <span slot="title">&nbsp;&nbsp;员工管理</span>
      </el-menu-item>
      <el-menu-item index="parking-lots">
        <span class="icon-margin"><img src="../assets/img/p.svg" class="menu-icon"/></span>
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
  computed: {
    activeMenu () {
      return this.$store.state.activeMenu.key
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
