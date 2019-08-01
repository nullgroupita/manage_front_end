<template>
  <el-row>
    <el-dialog title="新建职员" :visible="true" width="30%" :before-close="handleClose">
      <el-form :model="employee" :rules="rules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色" prop="role">
          <el-radio-group v-model="employee.role">
            <el-radio label="0">停车职员</el-radio>
            <el-radio label="1">停车场管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="employee.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="employee.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式" prop="telephone">
          <el-input v-model="employee.telephone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCardNumber">
          <el-input v-model="employee.idCardNumber"></el-input>
        </el-form-item>
        <el-form-item label="账户密码" prop="password">
          <el-input type="password" v-model="employee.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
          <el-input type="password" v-model="confirmPassword"></el-input>
        </el-form-item>
        <el-form-item label="分配经理" v-if="employee.role === '0'">
          <el-select v-model="employee.managedId" placeholder="请选择">
            <el-option v-for="item in managerList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
      employee: {
        role: '',
        name: '',
        gender: '',
        status: '',
        telephone: '',
        idCardNumber: '',
        password: '',
        managedId: ''
      },
      confirmPassword: '',
      managerList: [],
      rules: {
        role: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入手机号码', trigger: 'change' },
          { min: 11, max: 11, message: '请输入11为数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('showDialog', false)
    },
    async getEmployeesByRole () {
      this.managerList = await api.getManagers()
    },
    onCancel () {
      this.$refs['addForm'].resetFields()
      this.$emit('showDialog', false)
    },
    onSave () {
      this.$refs['addForm'].validate(async (valid) => {
        if (valid) {
          if (this.employee.password !== this.confirmPassword) {
            this.$alert('两次密码不一致')
            return false
          }
          await api.createEmployee(this.employee)
          this.$message.success('新增成功')
          this.$refs['addForm'].resetFields()
          this.$emit('showDialog', false)
          this.$router.push('employee-list')
          // if (response.retCode === 200) {
          //   this.$message.success('新增成功')
          //   this.$refs['addForm'].resetFields()
          //   this.$emit('showDialog', false)
          //   this.$router.push('employee-list')
          // } else {
          //   this.$message.error('添加失败，请重试')
          // }
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    this.getEmployeesByRole()
  }
}
</script>

<style scoped>
.demo-ruleForm {
  text-align: left;
}
</style>
