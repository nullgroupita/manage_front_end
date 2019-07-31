import {
  CHANGE_ACTIVE_MENU,
  GET_PARKING_LOTS_WITH_PARKING_BOY,
  GET_USER_INFORMATION,
  MENU_LIST,
  USER_INFO
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
    state.user['parkingLots'] = data.parkingLots
  },
  [GET_PARKING_LOTS_WITH_PARKING_BOY] (state, data) {
    console.log(data)
    state.parkingLotsWithParkIngBoys = data
  }
}

export default mutations
