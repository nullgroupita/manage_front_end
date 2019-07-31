<template>
  <div>
  <el-row style="margin-top: 3%;background-color:rgb(224,224,224)">
    <el-col :span="3" :offset="0">
      <div>
        <p>筛选条件</p>
      </div>
    </el-col>
  </el-row>
  <el-row style=" padding-top:2%;padding-bottom:2%;margin-bottom:2%;background-color:#FFFFFF">
    <el-col :span="1" :offset="4">
      <el-button type="primary" @click="showAllStatus">全部停车场</el-button>
    </el-col>
    <el-col :span="1" :offset="5">
      <el-button type="primary" @click="showFullStatus">满员停车场</el-button>
    </el-col>
    <el-col :span="1" :offset="5">
      <el-button type="primary" @click="showAvaliableStatus">可用停车场</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="20" style="" >
    <el-col style="margin-bottom: 3%" v-for="(item, index) in parkingLotsWithParkingBoys" :key="index" :span="8" :offset="0">
      <el-card shadow="hover">
        <div style="text-align: left" slot="header" class="clearfix">
          <span>{{item.name}}</span>
        </div>
        <div class="text item" >
          <el-row>
            <el-col :span="14">
              <el-progress type="circle"  :percentage="(item.capacity - item.nowAvailable)*100 / item.capacity" :show-text="true" :format="getParkingLotsStatus">sss</el-progress>
              <p>停车情况</p>
            </el-col>
            <el-col :span="10">
              <p v-for="(boy, i) in item.parkingBoys" :key="i">停车员: {{boy.name}}</p>
<!--              <p>停车员: 张三</p>-->
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>

  </el-row>
  </div>
</template>
<script>
import Menu from '../components/Menu'
import Header from '../components/Header'
import api from '../api'
import {
  GET_PARKING_LOTS_WITH_PARKING_BOY,
  SHOW_ALL_PARKING_LOTS_STATUS, SHOW_AVAILABLE_PARKING_LOTS_STATUS,
  SHOW_FULL_PARKING_LOTS_STATUS
} from '../common/constants'

export default {
  name: 'ParkingLotsStatus',
  data () {
    return {
      filterStatus: SHOW_ALL_PARKING_LOTS_STATUS
    }
  },
  methods: {
    async getParkingLots () {
      const response = await api.getAllParkingLotsWithParkingBoys(this.$store.state.user.id)
      console.log(response)
    },
    showAllStatus () {
      this.filterStatus = SHOW_ALL_PARKING_LOTS_STATUS
      console.log(this.filterStatus)
    },
    showFullStatus () {
      this.filterStatus = SHOW_FULL_PARKING_LOTS_STATUS
    },
    showAvaliableStatus () {
      this.filterStatus = SHOW_AVAILABLE_PARKING_LOTS_STATUS
    },
    getParkingLotsStatus (percentage) {
      let x = this.$store.state.parkingLotsWithParkIngBoys.filter(v => ((v.capacity - v.nowAvailable) * 100 / v.capacity) === percentage)[0];
      console.log(this.$store.state.parkingLotsWithParkIngBoys.filter(v => ((v.capacity - v.nowAvailable) * 100 / v.capacity) === percentage)[0].nowAvailable)
      return x.capacity - x.nowAvailable + '/' + x.capacity
    }
  },
  components: {
    Menu, Header
  },
  mounted: function () {
    this.$store.dispatch(GET_PARKING_LOTS_WITH_PARKING_BOY, this.$store.state.user.id)
  },
  computed: {
    parkingLotsWithParkingBoys: function () {
      if (this.filterStatus === SHOW_FULL_PARKING_LOTS_STATUS) {
        return this.$store.state.parkingLotsWithParkIngBoys.filter(v => v.nowAvailable === 0)
      } else if (this.filterStatus === SHOW_AVAILABLE_PARKING_LOTS_STATUS) {
        return this.$store.state.parkingLotsWithParkIngBoys.filter(v => v.nowAvailable !== 0)
      } else {
        return this.$store.state.parkingLotsWithParkIngBoys
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-divider--horizontal {
    margin: 0 0 0 1%;
    width: 98%;
    height: 4px;
  }
</style>
