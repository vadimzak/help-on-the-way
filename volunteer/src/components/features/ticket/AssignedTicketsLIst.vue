<template>
     <TicketsList :goToTicketOnClick="true" :tickets="assignedTickets" />
</template>
<script>
import { GET_ASSIGNED_TICKETS } from '@/graphql/queries/ticket'
import { mapState } from 'vuex'
import TicketsList from './TicketsList'
export default {
components: { TicketsList },
computed: {
      ...mapState(['assignedTickets'])
},
apollo: {
    tickets(){
        return {
            query: GET_ASSIGNED_TICKETS,
            update(data){
            this.$store.commit('setAssignedTickets', data.tickets.nodes)
            }
        }
        }
    },
}
</script>
