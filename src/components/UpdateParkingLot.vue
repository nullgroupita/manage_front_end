<template>
  <el-row>
    <el-col :span = 1>&nbsp;</el-col>
    <el-col :span = 6>
      <el-form ref="form" label-width="80px">
        <el-form-item label="名称：">
          {{name}}
        </el-form-item>
        <el-form-item label="位置：">
          {{position}}
        </el-form-item>
        <el-form-item label="容量：">
          <el-input v-model="capacity"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import api from '../api/index'
export default {
  name: 'UpdateParkingLot',
  data () {
    return {
      name: '1',
      position: '珠海市香洲区',
      capacity: ''
    }
  },
  methods: {
    onSubmit () {
      let parkingLot = {
        uid: 1,
        capacity: this.capacity
      }
      api.updateParkingLot(parkingLot)
    }
  }
}
</script>

<style scoped>

</style>
