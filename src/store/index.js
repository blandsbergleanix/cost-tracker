import Vue from 'vue'
import Vuex from 'vuex'
import * as uuid from 'uuid'
import costsPlugin from './costsPlugin'
import axios from 'axios'

console.log(axios)
Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  costsObject: {}
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setCosts (state, costs) {
    state.costsObject = JSON.parse(JSON.stringify(costs))
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
    // Delete key from indexDB
    // commit('removeExpense', cost.id)
    dispatch('updateStoreState')
  },
  initializeDatabase: ({ commit }, costs) => {
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB
    const open = indexedDB.open('MyDatabase', 1)

    open.createSchema = () => {
      var db = open.result
      db.createObjectStore('CostStore', {keyPath: 'id'})
    }
    open.onupgradeneeded = event => {
      // All other databases have been closed. Set everything up.
      var db = open.result
      db.createObjectStore('CostStore', {keyPath: 'id'})
    }

    open.onsuccess = () => {
      // Start a new transaction
      var db = open.result
      var tx = db.transaction('CostStore', 'readwrite')
      // var store = tx.objectStore('CostStore')
      // Add some data
      // costs.forEach(cost => store.put(cost))

      // Close the db when the transaction is done
      tx.oncomplete = () => {
        db.close()
      }
    }
  },
  getCostsPage: ({ commit }, page) => {
    // Read state from index db
    // filter the page entries
    // return them
  },
  updateStoreState: ({ commit }) => {
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB
    const dbPromise = indexedDB.open('MyDatabase', 1, function (upgradeDb) {
      if (!upgradeDb.objectStoreNames.contains('CostStore')) {
        upgradeDb.createObjectStore('CostStore', {keyPath: 'id'})
      }
    })
    console.log('dbPromise', dbPromise)
    dbPromise.then(function (db) {
      var tx = db.transaction('CostStore', 'readonly')
      var store = tx.objectStore('CostStore')
      return store.getAll()
    }).then(function (val) {
      console.log(val)
      commit('setCosts', val || {})
    })
  },
  saveExpense: ({ commit, dispatch }, cost) => {
    return new Promise((resolve, reject) => {
      const isUpdate = !!cost.id
      if (!isUpdate) cost.id = uuid.v4().toString()

      const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB
      const open = indexedDB.open('MyDatabase', 1)

      open.createSchema = () => {
        let db = open.result
        db.createObjectStore('CostStore', {keyPath: 'id'})
      }
      open.onsuccess = () => {
        // Start a new transaction
        var db = open.result
        var tx = db.transaction('CostStore', 'readwrite')
        var store = tx.objectStore('CostStore')
        // Add some data
        store.put(cost)
        // Close the db when the transaction is done
        tx.oncomplete = () => {
          db.close()
          dispatch('updateStoreState')
          resolve()
        }
      }
    })
  },
  addExpense: ({commit}, cost) => {
    console.log(cost)
  },
  readFromServer: ({commit}) => {

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
