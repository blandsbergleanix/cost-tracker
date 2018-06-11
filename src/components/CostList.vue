<template>
  <q-list dense highlight>
    <cost-list-item
      v-for="(cost, idx) in costs"
      :key="idx"
      :cost="cost"
      @click.native="costSelectedHandler(cost)"/>
  </q-list>
</template>

<script>
import CostListItem from './CostListItem'

export default {
  components: { CostListItem },
  props: ['costs'],
  methods: {
    costSelectedHandler (cost) {
      this.$emit('cost', cost)
    }
  }
}
</script>
