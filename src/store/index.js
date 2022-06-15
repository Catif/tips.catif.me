import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
   storage: window.localStorage
})

const store = createStore({
   state() {
      return {
         token: false,
         name: false
      }
   },
   mutations: {
      setToken(state, token) {
         state.token = token
      },
      setName(state, name) {
         state.name = name
      },
      logout(state) {
         state.token = false
         state.name = false
      }
   },
   actions: {
   },
   modules: {
   },
   // pour utiliser vuex-persist
   plugins: [vuexLocal.plugin]
})

export default store;