<template>
<div>
<p style="text-align: center; margin: 0 0 20px">停车场</p>
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
    <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
    <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button> -->
  </el-transfer>
</div>
  <el-button  type="primary" @click="updateParkingBoyParkingLots">确 定</el-button>
</div>
</template>
<script>
// import { resolve } from 'q'
import api from '../api'
export default {
  name: 'ParkingLotsTransfer',
  props: {
    // employeeId: String,
    parkingClerk: Object
  },
  data () {
    return {
      data: this.generateData(),
      value: this.getValue(),
      changValue: []

    }
  },

  methods: {
    handleChange (value, direction, movedKeys) {
      this.changValue = value
    },
    generateData () {
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
      let newParkingLots = this.$store.state.user.parkingLots.filter(item => this.changValue.includes(item.id))
      let result = {}
      result.parkingLots = newParkingLots
      result.telephone = this.parkingClerk.telephone
      result.status = this.parkingClerk.status
      result.id = this.parkingClerk.id
      let response = await api.updateEmployeeById(result)
      if (response.retCode === 200) {
        this.$emit('updateEmployeeParkingLots', newParkingLots, this.parkingClerk.id)
      } else {
        this.$message.success(response.message)
      }
    }
  }
}
</script>

<style>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
