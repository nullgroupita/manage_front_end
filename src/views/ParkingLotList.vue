<template>
  <el-row>
    <el-table :data="parkingLots" style="width: 100%">
      <el-table-column type="selection" width="40" fixed></el-table-column>
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
      managerId: ''
    }
  },
  methods: {
    async getParkingLots () {
      this.parkingLots = await api.getParkingLotsByManagerId(this.managerId)
    },
    freezeParkingLot () {
      this.$message.info('冻结')
    },
    modifyParkingLot (parkingLot) {
      this.$router.push({name: '', params: {data: parkingLot}})
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

</style>
