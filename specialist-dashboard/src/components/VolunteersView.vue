<template>
  <div>
    <h1> מתנדבים:</h1>
    <personTable personType="VOLUNTEER"></personTable>
  </div>
</template>

<script>
import personTable from './PersonTable';

export default {
  components: { personTable },
  data () {
    return {
    }
  },
  methods: {
  },
  created() {
  },
}
</script>

<style scoped>
th{
  text-align: right;
}
</style>
