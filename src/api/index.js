import axios from 'axios'
import cookies from 'vue-cookies'
import router from '../router'
import {Message} from 'element-ui'
import md5 from 'md5'
import store from '../store'

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
    const response = await axios.get('/employees/0')
    return response.data.data
  } catch (e) {
    console.log(e)
  }
}

async function addParkingLot (params) {
  try {
    const response = await axios.post(`/employees/${store.state.user.id}/parking-lots`, params)
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

async function getParkingLotsByManagerId (parmas) {
  try {
    const response = await axios.get(`/employees/${parmas}/parking-lots`)
    return response.data.data || []
  } catch (e) {
    console.log(e)
  }
}

async function updateParkingLot (params) {
  try {
    const response = await axios.patch(`/employees/${store.state.user.id}/parking-lots`, params)
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

const api = {
  login,
  getLoginUserInformation,
  getParkingLotsByManagerId,
  addParkingLot,
  updateParkingLot
}

export default api
