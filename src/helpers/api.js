import axios from 'axios'
import * as uuid from 'uuid'

export const getDBInstance = (params = { dbName: 'MyDatabase', objectStoreName: 'CostStore' }) => {
  return new Promise((resolve, reject) => {
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB
    if (!indexedDB) reject(Error('could not find IndexedDB'))
    const request = indexedDB.open(params.dbName, 1)
    request.onerror = evt => reject(Error(`Database error code: ${evt.target.code}`))
    request.onupgradeneeded = evt => evt.currentTarget.result.createObjectStore(params.objectStoreName, {keyPath: 'id'})
    request.onsuccess = () => resolve(request.result)
  })
}

// Delete all costs in store
export const clearCosts = (objectStoreName = 'CostStore') => {
  return new Promise(async (resolve, reject) => {
    const db = await getDBInstance()
    const transaction = db.transaction(objectStoreName, 'readwrite')
    const objectStore = transaction.objectStore(objectStoreName)
    const request = objectStore.clear()
    request.onsuccess = () => resolve()
    request.onerror = evt => reject(Error(`Error while clearing costs: ${evt.target.code}`))
    transaction.oncomplete = () => db.close()
  })
}

// Clear all costs in store and update it with the provided array
export const setCosts = (costs = [], objectStoreName = 'CostStore') => {
  return new Promise(async (resolve, reject) => {
    await clearCosts(objectStoreName)
    const db = await getDBInstance()
    const transaction = db.transaction(objectStoreName, 'readwrite')
    const objectStore = transaction.objectStore(objectStoreName)
    costs.forEach(cost => objectStore.put(cost))
    transaction.oncomplete = () => {
      db.close()
      resolve()
    }
    transaction.onerror = evt => reject(Error(`Error while setting costs: ${evt.target.code}`))
  })
}

export const setCost = (cost, objectStoreName = 'CostStore') => {
  return updateCosts([cost], objectStoreName)
}

// Update the store with the provided array - does not delete the store!
export const updateCosts = (costs = [], objectStoreName = 'CostStore') => {
  return new Promise(async (resolve, reject) => {
    const db = await getDBInstance()
    const transaction = db.transaction(objectStoreName, 'readwrite')
    const objectStore = transaction.objectStore(objectStoreName)
    costs.forEach(cost => {
      if (!cost.id) cost.id = uuid.v4()
      objectStore.put(cost)
    })
    transaction.oncomplete = () => {
      db.close()
      resolve()
    }
    transaction.onerror = evt => reject(Error(`Error while setting costs: ${evt.target.code}`))
  })
}

// Get all costs in the store
export const getCosts = (objectStoreName = 'CostStore') => {
  return new Promise(async (resolve, reject) => {
    const db = await getDBInstance()
    const transaction = db.transaction(objectStoreName, 'readonly')
    const objectStore = transaction.objectStore(objectStoreName)
    const costs = objectStore.getAll()
    costs.onsuccess = evt => resolve(costs.result)
    costs.onerror = evt => reject(Error(`Error while getting costs code: ${evt.target.code}`))
    transaction.oncomplete = () => db.close()
  })
}

export const getCostsFromServer = () => {
  const config = {
    url: '/todo',
    method: 'get',
    baseURL: 'http://localhost:8081'
  }
  return axios.request(config)
    .then(res => res.data)
}

export const sendCostsToServer = costs => {
  const config = {
    url: '/todo',
    method: 'post',
    baseURL: 'http://localhost:8081',
    data: costs
  }
  return axios.request(config)
    .then(res => res.data)
}
