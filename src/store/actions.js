import api from '../api/index'
import {GET_USER_INFORMATION} from '../common/constants'

const actions = {
  async [GET_USER_INFORMATION] (context) {
    let data = await api.getLoginUserInformation()
    context.commit(GET_USER_INFORMATION, data)
  }
}
export default actions
