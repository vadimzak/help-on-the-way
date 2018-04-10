<template>
    <div class="related-tickets">
      <v-list three-line>
        <template v-for="(ticket, index) in tickets">
          <v-list-tile avatar class="list-tile-wrap" :style="getStyle(ticket)" :key="index" v-if="ticketToPreivew !== ticket.id &&  !excludeIds.includes(ticket.id)"  @click="onTicketClick(ticket)">
            <v-list-tile-content>
              <div class="related-title">
                <v-list-tile-title>
                  {{ticket | formatTicketTitle}}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  {{ticket.startAddress | formatAddress}}
                </v-list-tile-sub-title>
              </div>
              <div class="related-when">
                {{ticket.when}}
                מחר
              </div>
              <div class="related-duration">
                <!-- {{ticket.durationEta | formatMinutes }} -->
                <div class="duration">
                  45
                </div>
                <div class="unit">
                  דקות
                </div>
              </div>
            </v-list-tile-content>
          </v-list-tile>
          <TicketPreview :ticket="ticket" :key="index" v-if="ticketToPreivew === ticket.id" :closePreview="() => ticketToPreivew = -1" />
        </template>
      </v-list>
    </div>
</template>

<script>
  import categoriesTree from 'shared/constants/categoriesTree'
  import TicketPreview from './TicketPreview'
  export default {
    components: {
      TicketPreview,
    },
    props: {
      excludeIds: {
        default: () => [],
        type: Array
        },
      tickets: {
        default: () => [],
        type: Array,
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
            this.$router.replace('/ticket/'+ticket.id)
          } else{
            this.ticketToPreivew = ticket.id
          }
      },
    },
  }
</script>

<style scoped>

  .list__tile__sub-title, .list__tile__title {
    text-align: right;
  }

  .list__tile__title {
    font-weight: bold;
    font-size:20px;
  }

  .list__tile__sub-title {
    font-size: 15px;
  }

  .list__tile__content {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid gainsboro;
  }

  .related-tickets li{
    border-right: 6px solid var(--category-color);
    /* height: 95px; */
  }

  .related-title {
        line-height: 13px;
            width: 68%;
  }

.related-when {
      font-size: 20px;
}

  .related-duration {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
        line-height: 16px;
  }

  .duration {
    font-size: 25px;
    font-weight: bold;
  }

  .unit{
    font-size: 10px;
    font-weight: bold;
    text-align: center;
  }

</style>
