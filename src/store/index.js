import Vue from 'vue'
import Vuex from 'vuex'
import demoData from '../demoData'
import demoDataObject from '../demoDataObject'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  costs: demoData,
  costsObject: demoDataObject
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  removeExpense (state, id) {
    // debugger
    state.costsObject = state.costsObject.filter(cost => cost.id !== id)
  },
  addExpense (state, id) {
    state.costsObject = state.costsObject.push()
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  removeExpense: ({ commit, dispatch }, cost) => {
    commit('removeExpense', cost.id)
    dispatch('sayHello', 'Roman')
  },
  sayHello: ({ commit }, name) => {
    console.log('hi there ' + name)
  },
  addExpense: ({commit}, cost) => {
    console.log(cost)
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
  mutations
})
