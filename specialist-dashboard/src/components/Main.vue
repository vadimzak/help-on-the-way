<template>
  <div>

    <div class="card-deck">
      <counter-display counterValue="23" description="פניות ממתינות" color="#F1F864"/>
      <counter-display counterValue="12" description="פניות בביצוע" color="#BDE4F4"/>
      <counter-display counterValue="3" description="פניות בטיוטה" color="#FAFCDB"/>
      <counter-display counterValue="7" description="פניות שטרם תואמו" color="#FFD8D8"/>
    </div>
    <router-link to="/new-ticket" tag="button" type="button" class="btn btn-primary btn-lg m-4 mx-auto d-block w-25">פניה חדשה</router-link>
    <ticket-table />
  </div>
</template>

<script>
import CounterDisplay from '@/components/CounterDisplay'
import TicketTable from '@/components/TicketTable'

export default {
  components: { CounterDisplay, TicketTable },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
