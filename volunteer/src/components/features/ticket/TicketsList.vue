<template>
    <div class="related-tickets">
      <v-list three-line>
        <template v-for="(ticket, index) in openTickets">
          <v-list-tile avatar :key="index" @click="$router.replace('/ticket/'+ticket.id)">
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
                {{ticket.durationEta}}
              </div>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </template>
      </v-list>
    </div>
</template>

<script>
  import categoriesTree from 'shared/constants/categoriesTree'
  import { mapState, mapMutations } from 'vuex'
  import { GET_AVAILABLE_TICKETS } from '@/graphql/queries/ticket'
  import config from '@/services/config';
  export default {
    components: {},
    props: {
      exclude : Array,
    },
    data(){
      return {
        preview: null,
      }
    },
    methods: {
      setPreview: function(index) {
        this.preview = index !== this.preview ? index : null;
      },
      closePreview: function(index) {
        this.preview = null;
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
