import {
  CHANGE_ACTIVE_MENU,
  GET_USER_INFORMATION,
  MENU_LIST,
  USER_INFO,
  GET_ALL_ORDERS,
  GET_MANAGER_PARKINGLOTS
} from '../common/constants'
import cookies from 'vue-cookies'

const mutations = {
  [CHANGE_ACTIVE_MENU] (state, data) {
    let menuInformation = MENU_LIST.filter(value => value.key === data)
    state.activeMenu = menuInformation[0]
  },
  [GET_USER_INFORMATION] (state, data) {
    state.user['id'] = data.id
    state.user['userName'] = data.telephone
    state.user['name'] = data.name
    cookies.set(USER_INFO, state.user)
  },
  [GET_ALL_ORDERS] (state, data) {
    state.orders = data
  },
  [GET_MANAGER_PARKINGLOTS] (state, data) {
    state.user['parkingLots'] = data
  }
}

export default mutations
