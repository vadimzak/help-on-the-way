<template>
  <div v-if="ready" class="mt-5">
    <tickets-filter :filterChanged="ticketFilterChanged" :buttonFilters="filters.buttons"></tickets-filter>
    <div class="row col-9 mt-5 p-0 mb-5 tickets-view">
       <div class="col-xs-6 tickets-list p-0">
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
        variables: {ticketStatus: status.queryTern}
      }).then(
        (result) => {
          self.ticketsByTypeCount[status.queryTern] = result.data.allTickets.totalCount;
        }
      )
    });
    this.filters = {
      buttons: [
        {
          name: TicketStatus.draft.presentationName,
          count: this.countByFilter(this.ticketsStatus.draft.queryTern, self.ticketsByTypeCount),
          queryTern: TicketStatus.draft.queryTern
        },
        {
          name: TicketStatus.matched.presentationName,
          count: this.countByFilter(this.ticketsStatus.matched.queryTern, self.ticketsByTypeCount),
          queryTern: TicketStatus.matched.queryTern
        },
        {
          name: TicketStatus.scheduled.presentationName,
          count: this.countByFilter(this.ticketsStatus.scheduled.queryTern, self.ticketsByTypeCount),
          queryTern: TicketStatus.scheduled.queryTern
        },
        {
          name: TicketStatus.done_verified.presentationName,
          count: this.countByFilter(this.ticketsStatus.done_verified.queryTern, self.ticketsByTypeCount),
          queryTern: TicketStatus.done_verified.queryTern
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
          ticketStatus: this.selectedFilter.queryTern
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
    height: auto;
    overflow: hidden;
  }
  .tickets-view-header{
    background-color: #f4f4f4;
    font-size: 22px;
  }

</style>
