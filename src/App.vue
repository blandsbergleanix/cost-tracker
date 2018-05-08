<template>
  <div id="q-app">
      <q-list highlight>
        <q-list-header>Letzte Ausgaben</q-list-header>
          <q-item v-for="(idx, item) in demoData" :key="idx">
            {{item}}
          </q-item>
      </q-list>
  </div>
</template>

<script>
import demoData from './demoData'

export default {
  name: 'App',
  data () {
    return {
      demoData
    }
  }
}

</script>

<style>
</style>
