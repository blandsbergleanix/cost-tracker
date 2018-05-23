<template>
<div
  class="row q-pa-sm gutter-xs content-center">
  <q-toolbar>
    <q-btn
      flat round dense
      icon="arrow_back"
      @click="$emit('close')"
    />
    <q-toolbar-title>
    Title {{cost}}
    </q-toolbar-title>
  </q-toolbar>
  <div class="col-sm-12">
    <q-input v-model="costName" inverted float-label="Posten"/>
  </div>
  <div class="col-sm-12">
    <q-input v-model="costValue" inverted float-label="Preis"/>
  </div>
  <div class="col-sm-12">
    <q-input type="textarea" v-model="costDescription" inverted float-label="Beschreibung"/>
  </div>
  <q-btn @click="increment()">Increment</q-btn>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['cost'],
  computed: {
    ...mapGetters(['count'])
  },
  methods: {
    ...mapActions(['increment'])
  },
  data () {
    return {
      costName: '',
      costValue: undefined,
      costDescription: ''
    }
  }
}
</script>
