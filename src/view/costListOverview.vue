<template>
<div id="q-route">
  <cost-list :costs="currentData"/>
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
    ...mapGetters(['costsObject']),
    currentData () {
      return this.costsObject.slice((this.page - 1) * ENTRIES_PER_PAGE, this.page * ENTRIES_PER_PAGE)
    },
    maxPages () {
      return Math.ceil(this.costsObject.length / ENTRIES_PER_PAGE)
    }
  },
  methods: {
    pageInput: function (newPage) {
      this.page = newPage
    },
    addCost () {
      console.log('adding cost')
    }
  }
}
</script>

<style>

</style>
