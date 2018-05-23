<template>
<div id="q-route">
  <cost-list :costs="currentData"/>
   <q-pagination input v-model="page"
    :min="minPages" :max="maxPages" v-on:input="pageInput" />
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import CostList from '../components/CostList.vue'

const ENTRIES_PER_PAGE = 5

export default {
  components: { CostList },
  data () {
    return {
      page: 1,
      minPages: 1
    }
  },
  computed: {
    ...mapGetters(['costs']),
    currentData () {
      return this.costs.slice((this.page - 1) * ENTRIES_PER_PAGE, this.page * ENTRIES_PER_PAGE)
    },
    maxPages () {
      return Math.ceil(this.costs.length / ENTRIES_PER_PAGE)
    }
  },
  methods: {
    pageInput: function (newPage) {
      this.page = newPage
    }
  }
}
</script>

<style>

</style>
