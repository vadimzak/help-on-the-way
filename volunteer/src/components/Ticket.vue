<template>
  <h2> Ticket </h2>
</template>

<script>
export default {
  name: 'Ticket',
  data () {
    return {
      state: 'summary',
      title: 'Help Joseph change the lightbulb',
      address: 'Ibn Gbirol 17',
      description:`He is afraid to climb a ladder alone,
       due to his physical state. We need someone to go help him`,
      durationEta: '1h',
      status: 'open'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
