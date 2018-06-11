import Vue from 'vue'
import Vuex from 'vuex'
import demoData from '../demoData'
import demoDataObject from '../demoDataObject'
import * as uuid from 'uuid'
import costsPlugin from './costsPlugin'

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
  initializeDatabase: ({ commit }, costs) => {
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB
    const open = indexedDB.open('MyDatabase', 1)

    open.onupgradeneeded = () => {
      var db = open.result
      db.createObjectStore('CostStore', {keyPath: 'id'})
      // var index = store.createIndex('NameIndex', ['name.last', 'name.first'])
    }
    open.onsuccess = () => {
      // Start a new transaction
      var db = open.result
      var tx = db.transaction('CostStore', 'readwrite')
      var store = tx.objectStore('CostStore')
      // var index = store.index('NameIndex')
      // Add some data
      costs.forEach(cost => store.put(cost))

      // Close the db when the transaction is done
      tx.oncomplete = () => {
        db.close()
      }
    }
  },
  saveExpense: ({ commit }, cost) => {
    const isUpdate = !!cost.id
    if (!isUpdate) cost.id = uuid.v4().toString()

    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB
    const open = indexedDB.open('MyDatabase', 1)

    open.onupgradeneeded = () => {
      var db = open.result
      db.createObjectStore('CostStore', {keyPath: 'id'})
      // var index = store.createIndex('NameIndex', ['name.last', 'name.first'])
    }

    open.onsuccess = () => {
      // Start a new transaction
      var db = open.result
      var tx = db.transaction('CostStore', 'readwrite')
      var store = tx.objectStore('CostStore')
      // var index = store.index('NameIndex')
      // Add some data
      store.put(cost)

      // Close the db when the transaction is done
      tx.oncomplete = () => {
        console.log('cost saved!')
        db.close()
      }
    }
    console.log('saving cost', isUpdate, cost)
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
  mutations,
  plugins: [costsPlugin]
})
