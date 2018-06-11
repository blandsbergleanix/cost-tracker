<template>
  <q-list dense highlight>
    <cost-list-item
      v-for="(cost, idx) in costs"
      :key="idx"
      :cost="cost"
      @click.native="clickOnCostHandler(cost)"/>
    <q-modal v-model="modalState">
      <cost-form
        v-if="selectedCost"
        :cost="selectedCost"
        @close="closeModal()"
        style="max-width: 400px"/>
    </q-modal>
  </q-list>
</template>

<script>
import costForm from '../view/costItem.vue'
import CostListItem from './CostListItem'

export default {
  components: { CostListItem, costForm },
  props: ['costs'],
  data () {
    return {
      modalState: false,
      selectedCost: undefined,
      modalStateForNewItemForm: false
    }
  },
  methods: {
    clickOnCostHandler (cost) {
      this.selectedCost = cost
      this.modalState = true
    },
    closeModal () {
      this.selectedCost = undefined
      this.modalState = false
    },
    createNewEntry () {
      this.modalState = true
    }
  }
}
</script>
