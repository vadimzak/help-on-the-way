<template>
  <div v-if="ready" class="row">
    <div class="col-xs-6 tickets-list">
      {{selectedTicket.id}}
      <ticket-table v-bind:selected-ticket="selectedTicket" v-bind:tickets="allTickets" v-bind:on-ticket-clicked="onTicketSelect"></ticket-table>
    </div>
    <div class="col-xs-6 ticket-view">
      <ticket-view v-bind:ticket="selectedTicket"></ticket-view>
    </div>
  </div>
</template>

<script>
import TicketTable from '@/components/TicketTable'
import TicketView from '@/components/TicketView'
import { ALL_TICKETS_QUERY } from '../constants/graphql'


export default {
  components: {  TicketTable, TicketView },
  data () {
    return {
      selectedTicket: {},
      ready: false
    }
  },
  apollo: {
    allTickets: {
      query: ALL_TICKETS_QUERY,
      update: (data) => data.allTickets.nodes,
      result() {
        this.selectedTicket = this.allTickets[0];
        this.ready = true
      },
    }
  },
  methods: {
      onTicketSelect: function(ticket) {
        this.selectedTicket = ticket
      }
  }
}
</script>

<style scoped>
  .tickets-list {
    padding-left: 0;
  }
  .ticket-view {
    padding-right: 0;
  }
</style>
