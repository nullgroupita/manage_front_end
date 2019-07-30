<template>
  <el-row>
    <el-row class="nav-bar">
      <el-col :span="22" style="margin-top: 5px; font-weight: bold">用户列表</el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" style="width: 90%" @click="insertDialog">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="displayEmployees" style="width: 100%" stripe max-height="500">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="姓名" sortable prop="name" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.gender}}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号"  align="center">
          <template slot-scope="scope">
            <el-input v-if="editRowIndex===scope.row.id" v-model="scope.row.telephone"></el-input>
            <span v-else>{{scope.row.telephone}}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份证号" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.idCardNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="职位" align="center">
          <template slot-scope="scope">
            <el-select v-if="editRowIndex===scope.row.id" v-model="scope.row.role" placeholder="请选择">
              <el-option label="停车职员" :value="0"></el-option>
              <el-option label="停车场管理员" :value="1"></el-option>
            </el-select>
            <span v-else>{{scope.row.role === 0 ? '停车职员' : '停车场管理员'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="账户状态" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status === 0 ? '激活' : '禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" width="250">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" placeholder="请输入搜索内容" @change="filterList"></el-input>
          </template>
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 0" type="danger" size="small" @click="freezeEmployee(scope.row)">冻结</el-button>
            <el-button v-else type="danger" size="small" @click="activeEmployee(scope.row)">解冻</el-button>
            <el-button type="primary" size="small" v-if="editRowIndex === scope.row.id" @click="saveUpdate(scope.row)">保存</el-button>
            <el-button type="primary" size="small" v-else @click="update(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="table-nav" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="pageable.page" background
                     :page-sizes="[10,20, 100, 200, 500]" :page-size="pageable.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
      <EmployeeDialog v-if="dialogVisible" @showDialog="handleDialog"></EmployeeDialog>
    </el-row>
  </el-row>
</template>

<script>
import api from '../api'
import EmployeeDialog from './EmployeeDialog'
import {ACTIVE_EMPLOYEE, CHANGE_ACTIVE_MENU, IN_ACTIVE_EMPLOYEE} from '../common/constants'

export default {
  components: {
    EmployeeDialog
  },
  data () {
    return {
      allEmployees: [],
      displayEmployees: [],
      pageable: {
        page: 1,
        pageSize: 10
      },
      totalCount: 0,
      search: '',
      dialogVisible: false,
      editRowIndex: ''
    }
  },
  methods: {
    async getEmployees () {
      let response = await api.getEmployees()
      this.allEmployees = response.filter(val => val.role !== 2)
      this.displayEmployees = JSON.parse(JSON.stringify(this.allEmployees)).splice((this.pageable.page - 1) * this.pageable.pageSize, this.pageable.pageSize)
      this.totalCount = this.allEmployees.length
    },
    filterList (val) {
      let filterResult = JSON.parse(JSON.stringify(this.allEmployees.filter(item => item.name.toUpperCase().includes(val.toUpperCase()))))
      this.totalCount = filterResult.length
      this.displayEmployees = filterResult.splice((this.pageable.page - 1) * this.pageable.pageSize, this.pageable.pageSize)
    },
    handleSizeChange (val) {
      this.pageable.pageSize = val
    },
    handleCurrentChange (val) {
      this.pageable.page = val
    },
    insertDialog () {
      this.dialogVisible = true
    },
    handleDialog (value) {
      this.dialogVisible = value
    },
    update (row) {
      this.editRowIndex = row.id
    },
    async saveUpdate (row) {
      this.editRowIndex = ''
      let response = await api.updateEmployee(row.id, row)
      if (response.retCode === 200) {
        this.$alert('修改成功')
      } else {
        this.$alert('修改失败')
        this.getEmployees()
      }
    },
    async freezeEmployee (row) {
      row.status = IN_ACTIVE_EMPLOYEE
      let response = await api.updateEmployee(row.id, row)
      if (response.retCode === 200) {
        this.$alert('冻结成功')
      } else {
        this.$alert('冻结失败，请重试')
        this.getEmployees()
      }
    },
    async activeEmployee (row) {
      row.status = ACTIVE_EMPLOYEE
      let response = await api.updateEmployee(row.id, row)
      if (response.retCode === 200) {
        this.$alert('解冻成功')
      } else {
        this.$alert('解冻失败')
        this.getEmployees()
      }
    }
  },
  mounted () {
    this.getEmployees()
    this.$store.commit(CHANGE_ACTIVE_MENU, this.$route.path.substr(1))
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
