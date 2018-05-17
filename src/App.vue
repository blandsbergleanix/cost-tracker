<template>
<div id="q-app">
  <q-toolbar color="primary">
    Kostentracker
  </q-toolbar>
<router-view>

</router-view>
</div>
</template>

<script>
import router from './router/index.js'
const app = {
  name: 'App',
  data () {
    return {
    }
  },
  router
}

export default app
</script>

<style>
</style>
