<template>
<div>
  <div v-if="ready" class="mt-5 mr-4">
    <!-- <tickets-filter :filterChanged="ticketFilterChanged" :buttonFilters="filters.buttons" :dropDownFilters="filters.dropDown"></tickets-filter> -->
      <div class="row p-2 tickets-view-header">פניות למוקד</div>
    <div class="row p-0">
       <div class="col-xs-7 mb-5 tickets-list">
      <ticket-table v-bind:selected-ticket="selectedTicket" v-bind:tickets="allTickets" v-bind:on-ticket-clicked="onTicketSelect"></ticket-table>
    </div>
    <div  class="col-xs-5 p-0 mb-5 ticket-view">
      <ticket-view v-bind:ticket="selectedTicket"></ticket-view>
    </div>
    </div>
  </div>
  <div v-if="!ready">
    טוען פניות מהשרת....
  </div>
</div>  
</template>

<script>
import TicketTable from '@/components/TicketTable'
import TicketView from '@/components/TicketView'
import { ALL_TICKETS_QUERY } from '@/graphql/queries/ticket'
import TicketsFilter from '@/components/TicketsFilter'

export default {
  components: {  TicketTable, TicketView ,TicketsFilter},
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
      },
       ticketFilterChanged: function(newFilter) {
      this.selectedFilter = newFilter;
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
     background-color: #e6eeff;
  }
  .tickets-view-header{
    background-color: #e6eeff;
    font-size: 22px;
  }

</style>
