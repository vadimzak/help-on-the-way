<template>
     <TicketsList :tickets="openTickets" />
</template>
<script>
import { GET_AVAILABLE_TICKETS } from '@/graphql/queries/ticket'
import { mapState } from 'vuex'
import TicketsList from './TicketsList'
export default {
components: { TicketsList },
computed: {
      ...mapState(['openTickets'])
},
apollo: {
    tickets(){
        return {
            query: GET_AVAILABLE_TICKETS,
            update(data){
            this.$store.commit('updateOpenTickets', data.tickets.nodes)
            }
        }
        }
    },
}
</script>
