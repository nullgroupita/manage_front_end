import api from '../api/index'
import {GET_USER_INFORMATION} from '../common/constants'

const actions = {
  async [GET_USER_INFORMATION] (context) {
    api.getLoginUserInformation().then(response => {
      context.commit(GET_USER_INFORMATION, response)
    })
  }
}
export default actions
