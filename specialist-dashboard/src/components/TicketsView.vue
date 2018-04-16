<template>
  <div v-if="ready" class="mt-5">
    <TicketsFilter/>
  <div class="row  mt-5 p-0 mb-5 tickets-view">
    <div class="col-8 pl-4 p-0">
      <div>
        <div class="tickets-list">
         <ticket-table :selected-ticket="currentPreview" :tickets="list" :onTicketClicked="setCurrentPreview"></ticket-table>
      </div>
      </div>
    </div>
    <div  class="col-4 p-0 pr-4">
      <div class="sticky-wrapper" v-sticky>
      <ticket-view class="ticket-view" :ticket="currentPreview" v-if="currentPreview"></ticket-view>
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
import { ALL_TICKETS_QUERY, TICKETS_COUNT_PER_STATUS } from '@/graphql/queries/ticket'
import TicketsFilter from '@/components/TicketsFilter'
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'
export default {
  components: {  TicketTable, TicketView ,TicketsFilter},
  data () {
    return {
      ready: false,
    }
  },
  apollo: {
    allTickets: {
      query: ALL_TICKETS_QUERY,
      variables() {
        return {
          ticketStatus: this.currentFilter,
        }
      },
      pollInterval: 1000 * 30,
      update: (data) => data.allTickets.nodes,
      result(value) {
        this.setList(value.data.allTickets.nodes)
        this.setCurrentPreview(value.data.allTickets.nodes[0])
        this.ready = true
      },
    },
    ticketsCount: {
      query: TICKETS_COUNT_PER_STATUS,
      pollInterval: 1000 * 30,
      update: (data) => data,
      result(value){
        const count = 
       Object
       .keys(value.data)
       .reduce((map, key) => (map[key] = value.data[key].totalCount, map), {})
       this.setStatusCount(count)
      }
    }
  },
  computed: {
    ...mapState('createTicket', ['list', 'currentPreview', 'currentFilter'])
  },
  methods: {
    ...mapMutations('createTicket', ['setStatusCount', 'setList', 'setCurrentPreview'])
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
