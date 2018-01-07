<template>
  <table class="table">
    <thead>
      <th>סטטוס</th>
      <th>זמן פתיחה</th>
      <th>אופי פניה</th>
      <th>זקן</th>
      <th>מתנדב</th>
      <th>גורם מפנה</th>
      <th>פעולות</th>
    </thead>
    <tbody>
      <tr v-for="row in tableData" :key="row.id">
        <td>{{row.id}}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
