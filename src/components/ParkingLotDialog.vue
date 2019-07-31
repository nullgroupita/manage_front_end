<template>
  <el-row>
    <el-dialog title="新增停车场" :visible="true" width="30%" :before-close="handleClose">
      <el-form :model="parkingLot" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="parkingLot.name"></el-input>
        </el-form-item>
        <el-form-item label="位置" prop="position">
          <el-input v-model="parkingLot.position"></el-input>
        </el-form-item>
        <el-form-item label="容量" prop="capacity">
          <el-input type="number" v-model="parkingLot.capacity"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onSave">保存</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import api from '../api'

export default {
  data () {
    return {
      dialogVisible: true,
      parkingLot: {
        name: '',
        position: '',
        capacity: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入停车场名称', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入位置信息', trigger: 'blur' }
        ],
        capacity: [
          { required: true, message: '请输入容量', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('showDialog', false)
    },
    onCancel () {
      this.$refs['addForm'].resetFields()
      this.$emit('showDialog', false)
    },
    onSave () {
      this.$refs['addForm'].validate(async (valid) => {
        if (valid) {
          let response = await api.addParkingLot(this.parkingLot)
          if (response.retCode === 200) {
            this.$alert('添加成功')
            this.parkingLot = {
              name: '',
              position: '',
              capacity: ''
            }
            this.$refs['addForm'].resetFields()
            this.$emit('showDialog', false)
          } else {
            this.$alert('添加失败，请重试')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.demo-ruleForm {
  text-align: left;
}
</style>
