<template>
    <div class="related-tickets">
      <v-list three-line>
        <template v-for="(ticket, index) in tickets">
          <v-list-tile avatar class="list-tile-wrap" :style="getStyle(ticket)" :key="index" v-if="ticketToPreivew !== ticket.id &&  !excludeIds.includes(ticket.id)"  @click="onTicketClick(ticket, index, $vuetify)">
            <v-list-tile-content>
              <div class="related-title">
                <v-list-tile-title>
                  {{ticket | formatTicketTitle}}
                </v-list-tile-title>
                <v-list-tile-sub-title class="ellipsis">
                  {{ticket.startAddress | formatAddress('preview')}}
                </v-list-tile-sub-title>
              </div>
              <div class="related-when">
                {{ticket.dueDate | formatDate('fromNow')}}
              </div>
              <div class="related-duration">
                <div class="duration">
                    {{ticket.durationEta | formatMinutes('countOnly') }}
                </div>
                <div class="unit">
                    {{ticket.durationEta | formatMinutes('unitOnly') }}
                </div>
              </div>
            </v-list-tile-content>
          </v-list-tile>
          <TicketPreview :ticket="ticket" ref="previewRefs" :key="ticket.id" v-if="ticketToPreivew === ticket.id" :closePreview="() => ticketToPreivew = -1" />
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
      onTicketClick(ticket, index, $vuetify){
          if(this.goToTicketOnClick){
            this.$router.replace('/ticket/'+ticket.id)
          } else{
            this.ticketToPreivew = ticket.id
            const goTo = $vuetify.goTo;
            const that = this;
            setTimeout(function(){
              goTo(that.$refs.previewRefs[0], { offset: -56}) // header offset
            }, 0)
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

  .related-tickets .list-tile-wrap{
    border-right: 6px solid var(--category-color);
    /* height: 95px; */
  }

  .related-title {
            width: 68%;
  }

.related-when {
      font-size: 17px;
}

  .related-duration {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
        line-height: 16px;
  }

  .duration {
    font-size: 25px;
    font-weight: bold;
  }

  .unit{
    position: relative;
    top: 2px;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
  }

</style>
