<template>
  <q-item>
    <q-item-side>
     {{cost[0]}}
    </q-item-side>
    <q-item-main>
      <q-item-tile label>
        {{cost[1]}}
      </q-item-tile>
      <q-item-tile sublabel>
        this is a demo text
      </q-item-tile>
    </q-item-main>
    <q-item-side right>
      {{cost[2]}}
    </q-item-side>
  </q-item>
</template>

<script>
export default {
  props: ['cost']
}
</script>
