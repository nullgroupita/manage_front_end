import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import ParkingLotMaintenance from '../components/ParkingLotMaintenance'
import OrderManagement from '../components/OrderMaintenance'
import ParkingLotsStatus from '../components/ParkingLotsStatus'
import ParkingClerksMaintenance from '../components/ParkingClerksMaintenance'
import EmployeeMaintenance from '../components/EmployeeMaintenance'

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
          name: 'ParkingLotMaintenance',
          component: ParkingLotMaintenance
        },
        {
          path: '/parking-lots-status',
          name: 'parking-lots-status',
          component: ParkingLotsStatus
        },
        {
          path: '/parking-clerks-maintenance',
          name: '/parking-clerks-maintenance',
          component: ParkingClerksMaintenance
        },
        {
          path: '/employee-list',
          name: 'EmployeeMaintenance',
          component: EmployeeMaintenance
        },
        {
          path: '/orders-maintenance',
          name: 'manageOrder',
          component: OrderManagement
        }
      ]
    }
  ]
})
