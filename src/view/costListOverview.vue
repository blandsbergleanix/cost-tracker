<template>
  <div id="q-route">
    <cost-list :costs="currentData" @cost="costSelectedHandler"/>
    <q-pagination input v-model="page"
      :min="minPages" :max="maxPages" v-on:input="pageInput" />
    <q-btn
      round
      color="primary"
      @click="addCost"
      class="fixed"
      icon="add"
      style="right: 18px; bottom: 18px"
      />
    <q-modal v-model="modalState">
      <cost-form
        v-if="selectedCost"
        :cost="selectedCost"
        @close="closeModal()"
        style="max-width: 400px"/>
    </q-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CostForm from '../view/CostForm'
import CostList from '../components/CostList'

const ENTRIES_PER_PAGE = 5

export default {
  components: { CostList, CostForm },
  data () {
    return {
      page: 1,
      minPages: 1,
      selectedCost: undefined
    }
  },
  computed: {
    ...mapGetters(['costsObject']),
    currentData () {
      return this.costsObject.slice((this.page - 1) * ENTRIES_PER_PAGE, this.page * ENTRIES_PER_PAGE)
    },
    maxPages () {
      return Math.ceil(this.costsObject.length / ENTRIES_PER_PAGE)
    },
    modalState: {
      get () {
        return !!this.selectedCost
      },
      set (val) {
        this.selectedCost = val ? {} : undefined
      }
    }
  },
  methods: {
    pageInput (newPage) {
      this.page = newPage
    },
    addCost () {
      this.modalState = true
    },
    closeModal () {
      this.modalState = false
    },
    costSelectedHandler (cost) {
      this.selectedCost = cost
    }
  }
}
</script>

<style>

</style>
