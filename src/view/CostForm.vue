<template>
<div>
  <q-toolbar>
    <q-btn
      flat round dense
      icon="arrow_back"
      @click="$emit('close')"
    />
    <q-toolbar-title>
    Title {{isEditing ? 'editing' : 'creating'}}
    </q-toolbar-title>
  </q-toolbar>
  <div v-if="tempCost" class="row gutter-xs q-pa-sm">
    <div class="col-sm-12">
      <q-input v-model="tempCost.expenseName" inverted float-label="Posten"/>
    </div>
    <div class="col-sm-12">
      <q-input v-model="tempCost.expenseValue" inverted float-label="Preis"/>
    </div>
    <div class="col-sm-12">
      <q-input type="textarea" v-model="tempCost.comment" inverted float-label="Beschreibung"/>
    </div>
  </div>
  <div class="row q-mt-sm q-pa-sm">
    <q-btn color="primary" @click="removeExpense(cost); $emit('close')">Delete</q-btn>
     <q-btn color="primary" @click="save">Save</q-btn>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['cost'],
  data () {
    return {
      costName: '',
      costValue: undefined,
      costDescription: '',
      tempCost: {}
    }
  },
  computed: {
    ...mapGetters(['count']),
    isEditing () {
      return !!this.tempCost.id
    }
  },
  watch: {
    cost (val) {
      this.tempCost = JSON.parse(JSON.stringify(val))
    }
  },
  methods: {
    ...mapActions(['removeExpense', 'saveExpense']),
    save () {
      this.saveExpense(this.tempCost)
        .then(() => {
          this.$emit('update')
        })
    }
  },
  mounted () {
    this.tempCost = JSON.parse(JSON.stringify(this.cost))
  }
}
</script>
