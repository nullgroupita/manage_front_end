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
      <el-button type="primary">全部停车场</el-button>
    </el-col>
    <el-col :span="1" :offset="5">
      <el-button type="primary">满员停车场</el-button>
    </el-col>
    <el-col :span="1" :offset="5">
      <el-button type="primary">可用停车场</el-button>
    </el-col>
  </el-row>
  <el-divider></el-divider>
  <el-row style="margin-top: 3%;background-color:rgb(255,255,255)">
    <el-col :span="3" :offset="0">
      <div>
        <p>停车场</p>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-divider></el-divider>
  </el-row>
  <el-row :gutter="20" style="padding-top: 3%">
    <el-col v-for="(item, index) in $store.state.parkingLotsWithParkIngBoys" :key="index" :span="8" :offset="0">
      <el-card shadow="hover">
        <div style="text-align: left" slot="header" class="clearfix">
          <span>停车场{{item.name}}</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="14">
              <el-progress type="circle" :percentage="(item.capacity - item.nowAvailable)*100 / item.capacity" :show-text="true">sss</el-progress>
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
import {GET_PARKING_LOTS_WITH_PARKING_BOY} from '../common/constants'

export default {
  name: 'ParkingLotsStatus',
  data () {
    return {
    }
  },
  methods: {
    async getParkingLots () {
      const response = await api.getAllParkingLotsWithParkingBoys(this.$store.state.user.id)
      console.log(response)
    }
  },
  components: {
    Menu, Header
  },
  mounted: function () {
    console.log(1111)
    this.$store.dispatch(GET_PARKING_LOTS_WITH_PARKING_BOY, this.$store.state.user.id)
    // console.log(this.$store.state.user.id)
    // this.getParkingLots()
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
