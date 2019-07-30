<template>
  <el-row>
    <el-row class="search-bar">
      <el-col style="margin-top: 5px;">
        <el-col :span="21" style="font-weight: bold">查找条件</el-col>
        <el-col :span="3">
          <img src="../assets/img/tip.svg" width="15%">
        </el-col>
        <el-row>
          <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="名称">
              <el-input v-model="searchForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="地点">
              <el-input v-model="searchForm.position" placeholder="请输入地点"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="query">查询</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="nav-bar">
      <el-col :span="20" style="margin-top: 5px;">停车场列表</el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" @click="addParkingLot" style="margin-left: 15px;width: 100%">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="parkingLots" style="width: 100%" stripe max-height="350">
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
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="freezeParkingLot">冻结</el-button>
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
import api from '../api/index'
import cookies from 'vue-cookies'
import {USER_INFO} from '../common/constants'

export default {
  data () {
    return {
      parkingLots: [],
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
      totalCount: 0
    }
  },
  methods: {
    async getParkingLots () {
      let response = await api.getParkingLotsByManagerId(this.managerId, this.searchForm)
      this.parkingLots = response.pageContent
      this.totalCount = response.total
    },
    freezeParkingLot () {
      this.$message.info('冻结')
    },
    modifyParkingLot (parkingLot) {
      this.$router.push({name: 'updateParkingLot', params: {data: parkingLot}})
    },
    addParkingLot () {
      this.$router.push('add-parking-lot')
    },
    async query () {
      this.getParkingLots()
    },
    handleSizeChange (val) {
      this.searchForm.pageSize = val
      this.getParkingLots()
    },
    handleCurrentChange (val) {
      this.searchForm.page = val
      this.getParkingLots()
    }
  },
  mounted () {
    let userInfo = cookies.get(USER_INFO)
    this.managerId = userInfo.id
    this.getParkingLots()
  }
}
</script>

<style scoped>
  .search-bar {
    text-align: left;
    padding: 10px;
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

</style>
