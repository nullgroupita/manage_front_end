<template>
  <el-row>
    <el-col :span = 1>&nbsp;</el-col>
    <el-col :span = 6>
      <el-form ref="form" label-width="80px">
        <el-form-item label="名称：">
          {{parkingLot.name}}
        </el-form-item>
        <el-form-item label="位置：">
          {{parkingLot.position}}
        </el-form-item>
        <el-form-item label="容量：">
          <el-input v-model="parkingLot.capacity"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="info" @click="onCancel">取消</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import api from '../api'
import {CHANGE_ACTIVE_MENU} from '../common/constants'
export default {
  name: 'UpdateParkingLot',
  data () {
    return {
      parkingLot: {}
    }
  },
  methods: {
    async onSubmit () {
      let response = await api.updateParkingLot(this.parkingLot)
      if (response.retCode === 200) {
        this.$message.success('修改成功')
        this.$router.push('parking-lots')
      }
    },
    onCancel () {
      this.$router.push('parking-lots')
    }
  },
  mounted () {
    this.parkingLot = this.$route.params.data
    this.$store.commit(CHANGE_ACTIVE_MENU, this.$route.path.substr(1))
  }
}
</script>

<style scoped>

</style>
