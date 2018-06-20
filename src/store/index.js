import Vue from 'vue'
import Vuex from 'vuex'
import costsPlugin from './costsPlugin'
import { clearCosts, setCosts, setCost, getCostsFromServer, sendCostsToServer, getCosts } from '../helpers/api'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  costsObject: []
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setCosts (state, costs) {
    state.costsObject = costs || []
  },
  removeExpense (state, id) {
    // debugger
    state.costsObject = state.costsObject.filter(cost => cost.id !== id)
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  removeExpense: ({ commit, dispatch }, cost) => {
    // Delete key from indexDB and synchronizeLocalStore
    // commit('removeExpense', cost.id)
  },
  // Synchronizes IndexedDB and Vuex with Remote Server
  synchronizeLocalStoreWithServer: async ({ commit }) => {
    await clearCosts()
    const costs = await getCostsFromServer()
    await setCosts(costs)
    commit('setCosts', costs)
  },
  // Synchronizes Vuex with IndexedDB
  synchronizeLocalStore: async ({ commit }) => {
    const costs = await getCosts()
    commit('setCosts', costs)
  },
  synchronizeServerWithLocalStore: async ({ commit }) => {
    const costs = await getCosts()
    const res = await sendCostsToServer(costs)
    console.log(res)
  },
  saveExpense: ({ commit, dispatch }, cost) => {
    // Save cost in indexdb
    return setCost(cost)
      .then(() => {
        // synchronize vuex with indexdb
        dispatch('synchronizeLocalStore')
        // synchronize remote server with indexdb
        dispatch('synchronizeServerWithLocalStore')
      })
  }
}

// getters are functions
const getters = {
  costs: state => state.costs,
  costsObject: state => state.costsObject
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [costsPlugin]
})
