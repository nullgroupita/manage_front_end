import {CHANGE_ACTIVE_MENU, MENU_LIST} from '../common/constants'

const mutations = {
  [CHANGE_ACTIVE_MENU] (state, data) {
    let menuInformation = MENU_LIST.filter(value => value.key === data)
    state.activeMenu = menuInformation[0]
  }
}

export default mutations
