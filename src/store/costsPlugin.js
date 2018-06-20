const plugin = store => {
  store.dispatch('synchronizeLocalStoreWithServer')
}

export default plugin
