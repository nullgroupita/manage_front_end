<template>
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
      <el-col :span="22" style="margin-top: 5px; font-weight: bold">停车场列表</el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" @click="addParkingLot" style="width: 90%">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
<!--      <el-table :data="displayParkingLots.splice((this.pageable.page - 1) * this.pageable.pageSize, this.pageable.pageSize)" style="width: 100%" stripe max-height="500">-->
      <el-table :data="displayParkingLots" style="width: 100%" stripe max-height="500">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="名称" sortable prop="name" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="位置"  align="center">
          <template slot-scope="scope">
            <span>{{scope.row.position}}</span>
          </template>
        </el-table-column>
        <el-table-column label="容量" sortable prop="capacity" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.capacity}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" width="250">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" placeholder="请输入搜索内容" @change="filterList"></el-input>
          </template>
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === 0" type="danger" size="small" @click="freezeParkingLot(scope.row)">冻结</el-button>
            <el-button type="primary" size="small" @click="modifyParkingLot(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="table-nav" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="pageable.page" background
                     :page-sizes="[10,20, 100, 200, 500]" :page-size="pageable.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
import api from '../api'
import cookies from 'vue-cookies'
import {CHANGE_ACTIVE_MENU, IN_ACTIVE, USER_INFO} from '../common/constants'

export default {
  data () {
    return {
      allParkingLots: [],
      displayParkingLots: [],
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
      search: ''
    }
  },
  methods: {
    async getParkingLots () {
      let response = await api.getParkingLotsByManagerId(this.managerId)
      this.allParkingLots = response.pageContent
      this.displayParkingLots = JSON.parse(JSON.stringify(this.allParkingLots)).splice((this.pageable.page - 1) * this.pageable.pageSize, this.pageable.pageSize)
      this.totalCount = this.allParkingLots.length
    },
    async freezeParkingLot (parkingLot) {
      parkingLot.status = IN_ACTIVE
      let response = await api.updateParkingLot(parkingLot)
      if (response.retCode === 200) {
        this.$message.success('冻结成功')
      }
    },
    modifyParkingLot (parkingLot) {
      this.$router.push({name: 'updateParkingLot', params: {data: parkingLot}})
    },
    addParkingLot () {
      this.$router.push('add-parking-lot')
    },
    handleSizeChange (val) {
      this.pageable.pageSize = val
      this.displayParkingLots = JSON.parse(JSON.stringify(this.allParkingLots)).splice((this.pageable.page - 1) * this.pageable.pageSize, this.pageable.pageSize)
    },
    handleCurrentChange (val) {
      this.pageable.page = val
      this.displayParkingLots = JSON.parse(JSON.stringify(this.allParkingLots)).splice((this.pageable.page - 1) * this.pageable.pageSize, this.pageable.pageSize)
    },
    filterList (val) {
      let filterResult = JSON.parse(JSON.stringify(this.allParkingLots.filter(
        item => item.name.toUpperCase().includes(val.toUpperCase()) || item.position.toUpperCase().includes(val.toUpperCase())
      )))
      this.totalCount = filterResult.length
      this.displayParkingLots = filterResult.splice((this.pageable.page - 1) * this.pageable.pageSize, this.pageable.pageSize)
    }
  },
  mounted () {
    let userInfo = cookies.get(USER_INFO)
    this.managerId = userInfo.id
    this.getParkingLots()
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
