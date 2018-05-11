<template>
<div id="q-app">
  <q-toolbar color="primary">
    my cost app
  </q-toolbar>
  <cost-list :costs="demoData"/>
</div>
</template>

<script>
import demoData from './demoData'
import CostList from './components/CostList'

export default {
  name: 'App',
  components: { CostList },
  data () {
    return {
      demoData
    }
  }
}

</script>

<style>
</style>
