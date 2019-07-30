import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import ParkingLotList from '../components/ParkingLotList'
import UpdateParkingLot from '../components/UpdateParkingLot'
import AddParkingLot from '../components/AddParkingLot'
import ParkingLotsStatus from '../components/ParkingLotsStatus'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/parking-lots',
          name: 'ParkingLotList',
          component: ParkingLotList
        },
        {
          path: '/add-parking-lot',
          name: 'addParkingLot',
          component: AddParkingLot
        },
        {
          path: '/update-parking-lot',
          name: 'updateParkingLot',
          component: UpdateParkingLot
        },
        {
          path: '/parking-lots-status',
          name: '/parking-lots-status',
          component: ParkingLotsStatus
        }
      ]
    }
  ]
})
