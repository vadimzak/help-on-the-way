<template>
  <div v-if="ready" class="mt-5">
    <tickets-filter  :filterChanged="ticketFilterChanged" :buttonFilters="filters.buttons"></tickets-filter>
  <div class="row  mt-5 p-0 mb-5 tickets-view">
    <div class="col-8 pl-4 p-0">
      <div>
        <div class="tickets-list">
         <ticket-table v-bind:selected-ticket="selectedTicket" v-bind:tickets="allTickets" v-bind:on-ticket-clicked="onTicketSelect"></ticket-table>
      </div>
      </div>
    </div>
    <div  class="col-4 p-0 pr-4">
      <div class="sticky-wrapper" v-sticky>
      <ticket-view class="ticket-view" v-bind:ticket="selectedTicket"></ticket-view>
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
import { ALL_TICKETS_QUERY, TICKET_BY_TYPE_COUNT } from '@/graphql/queries/ticket'
import TicketsFilter from '@/components/TicketsFilter'
import TicketStatus from '@/constants/enums/TicketStatus'
import _ from 'lodash'
export default {
  components: {  TicketTable, TicketView ,TicketsFilter},
  data () {
    return {
      selectedTicket: {},
      ready: false,
      filtersSticky: false,
      ticketsStatus: TicketStatus,
      selectedFilter: { },
      ticketsByTypeCount: {},
      exampleListModel: [{name: 'תל אביב'}, {name: 'חיפה'}],
      filters: { },
    }
  },
  mounted() {
    let self = this;
    _.each(this.ticketsStatus, (status) => {
      this.$apollo.query({
        query: TICKET_BY_TYPE_COUNT,
        variables: {ticketStatus: status.value}
      }).then(
        (result) => {
          self.ticketsByTypeCount[status.value] = result.data.allTickets.totalCount;
        }
      )
    });
    this.filters = {
      buttons: [
        {
          name: TicketStatus.draft.text,
          count: this.countByFilter(this.ticketsStatus.draft.value, self.ticketsByTypeCount),
          value: TicketStatus.draft.value
        },
        {
          name: TicketStatus.open.text,
          count: this.countByFilter(this.ticketsStatus.open.value, self.ticketsByTypeCount),
          value: TicketStatus.open.value
        },
        {
          name: TicketStatus.matched.text,
          count: this.countByFilter(this.ticketsStatus.matched.value, self.ticketsByTypeCount),
          value: TicketStatus.matched.value
        },
        {
          name: TicketStatus.scheduled.text,
          count: this.countByFilter(this.ticketsStatus.scheduled.value, self.ticketsByTypeCount),
          value: TicketStatus.scheduled.value
        }
      ]
    };
    this.selectedFilter = this.filters.buttons[0];
  },
  apollo: {
    allTickets: {
      query: ALL_TICKETS_QUERY,
      variables() {
        return {
          ticketStatus: this.selectedFilter.value
        }
      },
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
    },
    countByFilter: function(filter, ticketsCount) {
      return () => {
        return ticketsCount[filter];
      };
    }
  },
}
</script>

<style scoped>
.table-overflow-wrap{
  position: relative;
}
.tickets-view{

  margin: 0 auto;
}
  .tickets-list {
    /* height: 60vh;
    position: static;
    overflow-x: hidden;
    overflow-y: auto; */
    padding-left: 0;
  }
  .ticket-view {
    position: relative;
    padding-right: 0;
    background-color: #f4f4f4;
    height: auto;
    overflow: hidden;
  }
  .tickets-view-header{
    background-color: #f4f4f4;
    font-size: 22px;
  }

</style>
