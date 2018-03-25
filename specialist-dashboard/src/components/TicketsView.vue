<template>
  <div v-if="ready" class="mt-5">
    <tickets-filter :filterChanged="ticketFilterChanged" :buttonFilters="filters.buttons"></tickets-filter>
    <div class="row col-9 mt-5 p-0 mb-5 tickets-view">
       <div class="col-xs-6 tickets-list">
      <ticket-table v-bind:selected-ticket="selectedTicket" v-bind:tickets="allTickets" v-bind:on-ticket-clicked="onTicketSelect"></ticket-table>
    </div>
    <div  class="col-xs-6 p-0 ticket-view">
      <ticket-view v-bind:ticket="selectedTicket"></ticket-view>
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
      ready: false,
      selectedFilter: { },
      exampleListModel: [{name: 'תל אביב'}, {name: 'חיפה'}],
      filters: {
          buttons: [
            {
              name: 'טיוטות',
              count: 4
            },
            {
              name: 'ממתינות למתנדב',
              count: 3
            },
            {
              name: "לפני תיאום",
              count: 12
            },
              {
              name: 'לפני מפגש',
              count: 2
            }
          ],
        
      }
    }
  }
  ,
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
.tickets-view{
  background-color: #ffffff;
  box-shadow: 0px 5px 25.1px 1.9px rgba(142, 142, 142, 0.15);
  margin: 0 auto;
}
  .tickets-list {
    padding-left: 0;
  }
  .ticket-view {
    padding-right: 0;
    background-color: #f4f4f4;
  }
  .tickets-view-header{
    background-color: #f4f4f4;
    font-size: 22px;
  }

</style>
