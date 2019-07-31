<template>
<div>
<p style="margin-right: 370px">修改所管理的停车场</p>
<div style="text-align: center">
  <el-transfer
    style="text-align: left; display: inline-block"
    v-model="value"
    filterable
    :titles="['可选的停车场', '管理的停车场']"
    :format="{
      noChecked: '${total}',
      hasChecked: '${checked}/${total}'
    }"
    @change="handleChange"
    :data="data">
  </el-transfer>
</div>
  <div style="margin-top: 20px;margin-right: 230px;">
    <span>修改电话号码：</span>
    <input type='text' v-model="currentTelephone" maxlength="11" >
  </div>
  <el-button  type="primary"  style="margin-top: 20px;" @click="updateParkingBoyParkingLots">确 定</el-button>
</div>
</template>
<script>
// import { resolve } from 'q'
import api from '../api'
export default {
  name: 'ParkingLotsTransfer',
  props: {
    parkingClerk: Object
  },
  data () {
    return {
      data: this.generateData(),
      value: this.getValue(),
      changValue: [],
      currentTelephone: ''
    }
  },

  methods: {
    handleChange (value, direction, movedKeys) {
      this.changValue = value
    },
    generateData () {
      console.log(this.$store.state.user)
      return this.$store.state.user.parkingLots.map(paringLot => {
        return {'key': paringLot.id, 'label': paringLot.name + ' (' + paringLot.capacity + ')'}
      })
    },
    getValue () {
      return this.parkingClerk.parkingLots.map(item => {
        return item.id
      })
    },
    async updateParkingBoyParkingLots () {
      if (this.currentTelephone.length === 11) {
        let newParkingLots = this.$store.state.user.parkingLots.filter(item => this.changValue.includes(item.id))
        let result = {}
        result.parkingLots = newParkingLots
        result.telephone = this.currentTelephone
        result.status = this.parkingClerk.status
        result.id = this.parkingClerk.id
        let response = await api.updateEmployeeById(result)
        if (response.retCode === 200) {
          this.$emit('updateEmployeeParkingLots', newParkingLots, this.parkingClerk.id)
        } else {
          this.$message.success(response.message)
        }
      } else {
        this.$message('手机位数不正确')
      }
    }
  },
  mounted () {
    this.currentTelephone = this.parkingClerk.telephone
  }
}
</script>

<style>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
