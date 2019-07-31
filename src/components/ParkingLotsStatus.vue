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
    <el-col :span="8" :offset="0">
      <el-card shadow="hover">
        <div style="text-align: left" slot="header" class="clearfix">
          <span>停车场A</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="14">
              <el-progress type="circle" :percentage="26" :show-text="true" :format="fuckit">sss</el-progress>
              <p>停车情况</p>
            </el-col>
            <el-col :span="10">
              <p>停车员: 张三</p>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" :offset="0">
      <el-card shadow="hover">
        <div style="text-align: left" slot="header" class="clearfix">
          <span>停车场B</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="10">
              <el-progress type="circle" :percentage="26" :show-text="true" :format="fuckit">sss</el-progress>
              <p>停车情况</p>
            </el-col>
            <el-col :span="10">
              <p>停车员: 张三</p>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" :offset="0">
      <el-card shadow="hover">
        <div style="text-align: left" slot="header" class="clearfix">
          <span>停车场C</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="10">
              <el-progress type="circle" :percentage="26" :show-text="true" :format="fuckit">sss</el-progress>
              <p>停车情况</p>
            </el-col>
            <el-col :span="10">
              <p>停车员: 张三</p>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="0" style="padding-top: 3%">
    <el-col :span="6" :offset="2">
      <el-card shadow="hover">
        <div style="text-align: left" slot="header" class="clearfix">
          <span>停车场D</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="10">
              <el-progress type="circle" :percentage="26" :show-text="true" :format="fuckit">sss</el-progress>
              <p>停车情况</p>
            </el-col>
            <el-col :span="10">
              <p>停车员: 张三</p>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6" :offset="1">
      <el-card shadow="hover">
        <div style="text-align: left" slot="header" class="clearfix">
          <span>停车场E</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="10">
              <el-progress type="circle" :percentage="26" :show-text="true" :format="fuckit">sss</el-progress>
              <p>停车情况</p>
            </el-col>
            <el-col :span="10">
              <p>停车员: 张三</p>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6" :offset="1">
      <el-card shadow="hover">
        <div style="text-align: left" slot="header" class="clearfix">
          <span>停车场F</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="12">
              <el-progress type="circle" :percentage="26" :show-text="true" :format="fuckit">sss</el-progress>
              <p>停车情况</p>
            </el-col>
            <el-col :span="12">
              <p>停车员: 张三</p>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row style="padding-top: 3%;padding-bottom: 3%">
    <el-col :offset="9">
      <el-pagination
        background
        :pager-count="3"
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </el-col>
  </el-row>
  </div>
</template>
<script>
import Menu from '../components/Menu'
import Header from '../components/Header'

export default {
  name: 'ParkingLotsStatus',
  data () {},
  methods: {
    fuckit (percentage) {
      return Math.floor(percentage / 100 * 10) + '/10'
    }
  },
  components: {
    Menu, Header
  },
  mounted () {
    console.log(this.$router.valueOf())
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
