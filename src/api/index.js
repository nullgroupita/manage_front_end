import axios from 'axios'
import cookies from 'vue-cookies'
import router from '../router'
import {Message} from 'element-ui'
import md5 from 'md5'
import {MANAGER_ROLE_CODE, USER_INFO} from '../common/constants'

axios.defaults.baseURL = '/api'

axios.interceptors.request.use(
  config => {
    config.baseURL = 'http://18.179.142.236:9000'
    config.withCredentials = true
    config.timeout = 5000
    let token = cookies.get('token')
    if (token) {
      config.headers = {
        'token': token
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    if (response.data.retCode === 501) {
      router.push('login')
      Message.error('请先登录')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

async function login (params) {
  try {
    params.password = md5(params.password)
    const response = await axios.post('/login', params)
    if (response.data.retCode === 200) {
      // set token
      cookies.set('token', response.data.data)
      return true
    }
    return false
  } catch (e) {
    console.log(e)
  }
}

async function getLoginUserInformation () {
  try {
    const response = await axios.get(`/current-user`)
    return response.data.data
  } catch (e) {
    console.log(e)
  }
}

async function addParkingLot (params) {
  try {
    let userId = cookies.get(USER_INFO).id
    let response = await axios.post(`/employees/${userId}/parking-lots`, params)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

async function getParkingLotsByManagerId (id) {
  try {
    const response = await axios.get(`/employees/${id}/parking-lots`)
    return response.data.data || []
  } catch (e) {
    console.log(e)
  }
}

async function updateParkingLot (params) {
  try {
    let userId = cookies.get(USER_INFO).id
    const response = await axios.patch(`/employees/${userId}/parking-lots`, params)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

async function updateEmployee (params) {
  try {
    let userId = cookies.get(USER_INFO).id
    const response = await axios.patch(`/employees/${userId}/employees`, params)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

async function getParkingLotsForQuery (params) {
  try {
    let userId = cookies.get(USER_INFO).id
    const response = await axios.get(`/employees/${userId}/parking-lots`, params)
    return response.data.data
  } catch (e) {
    console.log(e)
  }
}

async function getEmployeesForQuery (params) {
  try {
    let userId = cookies.get(USER_INFO).id
    const response = await axios.get(`/employees/${userId}/employees`, params)
    return response.data.data
  } catch (e) {
    console.log(e)
  }
}

async function updateEmployeeById (params) {
  try {
    let userId = cookies.get(USER_INFO).id
    const response = await axios.patch(`/employees/${userId}`, params)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

async function getEmployees () {
  try {
    const response = await axios.get(`/employees`)
    return response.data.data
  } catch (e) {
    console.log(e)
  }
}

async function getManagers () {
  try {
    const role = MANAGER_ROLE_CODE
    const response = await axios.get(`/employees?role=${role}`)
    return response.data.data
  } catch (e) {
    console.log(e)
  }
}

async function createEmployee (params) {
  try {
    let employee = JSON.parse(JSON.stringify(params))
    employee.password = md5(employee.password)
    let response = await axios.post(`/employees`, params)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

async function updateEmployeeByAdmin (employeeId, params) {
  try {
    const response = await axios.patch(`/employees/${employeeId}`, params)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

async function getAllParkingLotsWithParkingBoys (employeeId) {
  try {
    const response = await axios.get(`/employees/${employeeId}/parking-lots/1`)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const api = {
  login,
  getLoginUserInformation,
  getParkingLotsByManagerId,
  addParkingLot,
  updateParkingLot,
  getParkingLotsForQuery,
  getEmployees,
  getManagers,
  createEmployee,
  getEmployeesForQuery,
  updateEmployee,
  updateEmployeeById,
  updateEmployeeByAdmin,
  getAllParkingLotsWithParkingBoys
}

export default api
