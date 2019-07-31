<template>
<div>
  <el-row>
    <!--    <el-row class="search-bar">-->
    <!--      <el-col>-->
    <!--        <el-col :span="20">&nbsp; <img src="../assets/img/tip.svg" width="3%"></el-col>-->
    <!--        <el-col :span="3">-->
    <!--          <el-input v-model="searchForm.name" placeholder="请输入搜索内容" class="search-input"></el-input>-->
    <!--        </el-col>-->
    <!--      </el-col>-->
    <!--    </el-row>-->
    <el-row class="nav-bar">
      <el-col :span="22" style="margin-top: 5px; font-weight: bold">用户列表</el-col>
      <!-- <el-col :span="2">
        <el-button type="primary" size="small" @click="addParkingLot" style="width: 90%">新增</el-button>
      </el-col> -->
    </el-row>
    <el-row>
      <!--      <el-table :data="displayParkingLots.splice((this.pageable.page - 1) * this.pageable.pageSize, this.pageable.pageSize)" style="width: 100%" stripe max-height="500">-->
      <el-table :data="displayEmployees" style="width: 100%" stripe max-height="500">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="名称" sortable prop="name" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="位置"  align="center">
          <template slot-scope="scope">
            <span>{{scope.row.position}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.gender}}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" sortable prop="capacity" align="center">
          <template slot-scope="scope">
            <span v-if="!isEditTelephone" @dblclick="editTelephone">{{scope.row.telephone}}</span>
            <input v-else v-model="inputTelephone" @keyup:enter="updateEmployeeTelephone">
          </template>
        </el-table-column>
        <el-table-column label="身份证号" sortable prop="capacity" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.idCardNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="账户状态" sortable prop="capacity" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status === 1 ? '冻结' : '激活'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" width="250">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" placeholder="请输入搜索内容" @change="filterList"></el-input>
          </template>
          <template slot-scope="scope">
            <el-button  type="danger" size="small" @click="freezeEmployee(scope.row)">{{scope.row.status === 1 ? '激活' : '冻结'}}
            </el-button>
            <el-button type="primary" size="small"   @click="changeDialogVisible(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="table-nav" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="pageable.page" background :page-sizes="[10,20, 100, 200, 500]" :page-size="pageable.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </el-row>
  </el-row>
  <div v-if="isShowDialog">
  <el-dialog title="修改管理停车场" :visible.sync="dialogVisible "  >
    <ParkingLotsTransfer v-on:updateEmployeeParkingLots="updateEmployeeParkingLots" :parkingClerk="currentEmployee" ></ParkingLotsTransfer>
  </el-dialog>
  </div>
</div>
</template>

<script>
import api from '../api'
import cookies from 'vue-cookies'
import ParkingLotsTransfer from './ParkingLotsTransfer'
import {
  // CHANGE_ACTIVE_MENU,
  // IN_ACTIVE,
  USER_INFO
} from '../common/constants'

export default {
  data () {
    return {
      allEmployees: [],
      displayEmployees: [],
      managerId: '',
      searchForm: {
        name: '',
        position: '',
        pageSize: 10,
        page: 1
      },
      pageable: {
        page: 1,
        pageSize: 10
      },
      totalCount: 0,
      search: '',
      inputTelephone: '',
      isEditTelephone: false,
      isChangeEmployee: false,
      dialogVisible: false,
      currentEmployee: '',
      isShowDialog: false
    }
  },
  components: {
    ParkingLotsTransfer
  },
  methods: {
    async getEmployees () {
      let response = await api.getEmployeesForQuery(this.managerId)
      this.allEmployees = response
      this.displayEmployees = JSON.parse(JSON.stringify(this.allEmployees)).splice((this.pageable.page - 1) * this.pageable.pageSize, this.pageable.pageSize)
      this.totalCount = this.allEmployees.length
    },
    async freezeEmployee (employee) {
      let successMessage = ''
      if (employee.status === 0) {
        employee.status = 1
        successMessage = '冻结成功'
      } else {
        employee.status = 0
        successMessage = '激活成功'
      }
      let result = {}
      result.parkingLots = employee.parkingLots
      result.telephone = employee.telephone
      result.status = employee.status
      result.id = employee.id
      let response = await api.updateEmployeeById(result)
      if (response.retCode === 200) {
        this.$message.success(successMessage)
      }
    },
    async updateEmployeeTelephone (employee) {
      this.editTelephone = !this.editTelephone
      employee.telephone = this.inputTelephone
      let response = await api.updateEmployee(employee)
      if (response.retCode === 200) {
        this.$message.success('冻结成功')
      }
    },
    changeDialogVisible (item) {
      this.currentEmployee = item
      this.dialogVisible = true
      this.isShowDialog = !this.isShowDialog
    },
    updateEmployeeParkingLots (newParkingLots, id) {
      let employee = this.allEmployees.find(item => item.id === id)
      employee.parkingLots = newParkingLots
      this.dialogVisible = !this.dialogVisible
      this.isShowDialog = !this.isShowDialog
      this.getEmployees()
    },
    editTelephone () {
      this.editTelephone = !this.editTelephone
    },
    handleSizeChange (val) {
      this.pageable.pageSize = val
      this.displayParkingLots = JSON.parse(JSON.stringify(this.allParkingLots)).splice((this.pageable.page - 1) * this
        .pageable.pageSize, this.pageable.pageSize)
    },
    handleCurrentChange (val) {
      this.pageable.page = val
      this.displayParkingLots = JSON.parse(JSON.stringify(this.allParkingLots)).splice((this.pageable.page - 1) * this
        .pageable.pageSize, this.pageable.pageSize)
    },
    filterList (val) {
      let filterResult = JSON.parse(JSON.stringify(this.allEmployees.filter(
        item => item.name.toUpperCase().includes(val.toUpperCase())
      )))
      this.totalCount = filterResult.length
      this.displayEmployees = filterResult.splice((this.pageable.page - 1) * this.pageable.pageSize, this.pageable
        .pageSize)
    }
  },
  mounted () {
    let userInfo = cookies.get(USER_INFO)
    this.managerId = userInfo.id
    this.getEmployees()
    // this.$store.commit(CHANGE_ACTIVE_MENU, this.$route.path.substr(1))
  }
}

</script>

<style scoped>
  .search-bar {
    text-align: left;
    padding: 10px;
    background-color: #FFFFFF;
    margin-top: 5px;
  }

  .nav-bar {
    background-color: #FFFFFF;
    text-align: left;
    margin-bottom: 10px;
    padding: 10px;
    font-weight: 200;
  }

  .table-nav {
    position: fixed;
    bottom: 45px;
  }

  .search-input {
    padding-left: 15px;
  }

</style>
