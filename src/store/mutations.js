import {CHANGE_ACTIVE_MENU, GET_USER_INFORMATION, MENU_LIST} from '../common/constants'

const mutations = {
  [CHANGE_ACTIVE_MENU] (state, data) {
    let menuInformation = MENU_LIST.filter(value => value.key === data)
    state.activeMenu = menuInformation[0]
  },
  [GET_USER_INFORMATION] (state, data) {
    state.user['id'] = data.id
    state.user['userName'] = data.telephone
    state.user['name'] = data.name
  }
}

export default mutations
