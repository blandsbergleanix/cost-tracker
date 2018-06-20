import demoData from '../demoDataObject'

const plugin = store => {
  store.dispatch('updateStoreState', demoData)
}

export default plugin
