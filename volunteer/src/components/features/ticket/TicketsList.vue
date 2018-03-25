<template>
    <div class="related-tickets">
      <v-list three-line>
        <template v-for="(ticket, index) in openTickets">
          <v-list-tile avatar :style="getStyle(ticket)" :key="index" v-if="ticketToPreivew !== ticket.id &&  !excludeIds.includes(ticket.id)"  @click="onTicketClick(ticket)">
            <v-list-tile-content>
              <div class="related-title">
                <v-list-tile-title>
                  {{ticket | formatTicketTitle}}
                </v-list-tile-title>
                <v-list-tile-sub-title v-html="ticket.where"></v-list-tile-sub-title>
              </div>
              <div class="related-when">
                {{ticket.when}}
              </div>
              <div class="related-duration">
                {{ticket.durationEta | formatMinutes }}
              </div>
            </v-list-tile-content>
          </v-list-tile>
          <TicketPreview :ticket="ticket" :key="index" v-if="ticketToPreivew === ticket.id" :closePreview="() => ticketToPreivew = -1" />
          <v-divider></v-divider>
        </template>
      </v-list>
    </div>
</template>

<script>
  import categoriesTree from 'shared/constants/categoriesTree'
  import { mapState, mapMutations } from 'vuex'
  import TicketPreview from './TicketPreview'
  import { GET_AVAILABLE_TICKETS } from '@/graphql/queries/ticket'
  import config from '@/services/config';
  export default {
    components: {
      TicketPreview,
    },
    props: {
      excludeIds: {
        default: () => [],
        type: Array
        },
      goToTicketOnClick: Boolean, // if true when we click on a ticket it should go to the ticket route instead of opening the preview
    },
    data(){
      return {
        ticketToPreivew: -1,
      }
    },
    methods: {
    getStyle(ticket){
        return {
          '--category-color': categoriesTree[ticket.category].self.color,
        }
      },
      onTicketClick(ticket){
          if(this.goToTicketOnClick){
            this.router.replace('/ticket/'+ticket.id)
          } else{
            this.ticketToPreivew = ticket.id
          }
      },
    },
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

<style scoped>

  .list__tile__sub-title, .list__tile__title {
    text-align: right;
  }

  .list__tile__content {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .related-tickets li{
    border-right: 6px solid var(--category-color);
  }

</style>
