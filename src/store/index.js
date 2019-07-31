import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'
import mutations from './mutations'
import state from './state'
import createPersiste from 'vue-savedata'

Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createPersiste()]
})

export default store
