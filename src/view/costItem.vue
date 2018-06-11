<template>
<div>
  <q-toolbar>
    <q-btn
      flat round dense
      icon="arrow_back"
      @click="$emit('close')"
    />
    <q-toolbar-title>
    Title
    </q-toolbar-title>
  </q-toolbar>
  <div class="row gutter-xs q-pa-sm">
    <div class="col-sm-12">
      <q-input v-model="cost.expenseName" inverted float-label="Posten"/>
    </div>
    <div class="col-sm-12">
      <q-input v-model="cost.expenseValue" inverted float-label="Preis"/>
    </div>
    <div class="col-sm-12">
      <q-input type="textarea" v-model="cost.comment" inverted float-label="Beschreibung"/>
    </div>
  </div>
  <div class="row q-mt-sm q-pa-sm">
    <q-btn color="primary" @click="removeExpense(cost); $emit('close')">Delete</q-btn>
  </div>
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
    ...mapActions(['increment', 'removeExpense'])
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
