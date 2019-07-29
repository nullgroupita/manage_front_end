import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import AddParkingLot from '../components/AddParkingLot'
import UpdateParkingLot from '../components/UpdateParkingLot'

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
        {path: '/add-parking-lot', name: 'addParkingLot', component: AddParkingLot},
        {path: '/update-parking-lot', name: 'updateParkingLot', component: UpdateParkingLot}
      ]
    }
  ]
})
