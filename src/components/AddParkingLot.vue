<template>
  <el-row>
    <el-col :span = 1>&nbsp;</el-col>
    <el-col :span = 6>
      <el-form ref="form" label-width="80px" :model="form">
        <el-form-item label="名称：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="位置：">
          <el-input v-model="form.position"></el-input>
        </el-form-item>
        <el-form-item label="容量：">
          <el-input v-model="form.capacity"></el-input>
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
  name: 'AddParkingLot',
  data () {
    return {
      form: {
        name: '',
        position: '',
        capacity: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      let response = await api.addParkingLot(this.form)
      console.log('add on page', response)
      if (response.retCode === 200) {
        this.$message.success('添加成功')
        this.form = {
          name: '',
          position: '',
          capacity: ''
        }
      }
    }
  }
}
</script>

<style scoped>
  label {
    float: left;
    display: inline;
  }
</style>
