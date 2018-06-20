<template>
  <q-item>
    <q-item-side>
     {{cost.date}}
    </q-item-side>
    <q-item-main>
      <q-item-tile label>
        {{cost.expenseName}}
      </q-item-tile>
      <q-item-tile sublabel>
        {{cost.comment}}
      </q-item-tile>
    </q-item-main>
    <q-item-side right>
      {{cost.expenseValue}} €
    </q-item-side>
  </q-item>
</template>

<script>
export default {
  props: ['cost']
}
</script>
