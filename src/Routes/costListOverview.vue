<template>
<div id="q-route">
  <cost-list :costs="currentData"/>
   <q-pagination input v-model="page"
    :min="minPages" :max="maxPages" v-on:input="pageInput" />
</div>
</template>

<script>
import demoData from '../demoData'
import CostList from '../components/CostList.vue'

const ENTRIES_PER_PAGE = 5
let page = 1

export default {
  components: { CostList },
  data () {
    return {
      get currentData () {
        return demoData.slice((page - 1) * ENTRIES_PER_PAGE, page * ENTRIES_PER_PAGE)
      },
      page: page,
      minPages: 1,
      maxPages: Math.ceil(demoData.length / ENTRIES_PER_PAGE)
    }
  },
  methods: {
    pageInput: function (newPage) {
      page = newPage
    }
  }
}
</script>

<style>

</style>
