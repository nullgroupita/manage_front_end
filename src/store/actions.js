import api from '../api/index'
import {GET_USER_INFORMATION, GET_PARKING_LOTS_WITH_PARKING_BOY} from '../common/constants'

const actions = {
  async [GET_USER_INFORMATION] (context) {
    api.getLoginUserInformation().then(response => {
      context.commit(GET_USER_INFORMATION, response)
    })
  },
  async [GET_PARKING_LOTS_WITH_PARKING_BOY] (context, id) {
    const response = await api.getAllParkingLotsWithParkingBoys(id)
    context.commit(GET_PARKING_LOTS_WITH_PARKING_BOY, response.data)
  }
}
export default actions
