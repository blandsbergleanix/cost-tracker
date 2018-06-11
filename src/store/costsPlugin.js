import demoData from '../demoDataObject'

const plugin = store => {
  store.dispatch('initializeDatabase', demoData)
}

export default plugin
