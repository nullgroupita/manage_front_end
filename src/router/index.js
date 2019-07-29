import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import ParkingLotList from '../views/ParkingLotList'

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
        }
      ]
    }
  ]
})
