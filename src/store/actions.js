import api from '../api/index'
import {GET_USER_INFORMATION, GET_ALL_ORDERS, GET_MANAGER_PARKINGLOTS} from '../common/constants'

const actions = {
  async [GET_USER_INFORMATION] (context) {
    api.getLoginUserInformation().then(response => {
      context.commit(GET_USER_INFORMATION, response)
    })
  },
  async [GET_ALL_ORDERS] (context, id) {
    api.getAllOrders(id).then(response => {
      api.getUnReceiptOrders().then(function (result) {
        result.push(...response.data)
        console.log(result)
        context.commit(GET_ALL_ORDERS, result)
      })
    })
  },
  async [GET_MANAGER_PARKINGLOTS] (context, managerId) {
    api.getParkingLotsByManagerId(managerId).then(response => {
      context.commit(GET_MANAGER_PARKINGLOTS, response.pageContent)
    })
  }
}
export default actions
