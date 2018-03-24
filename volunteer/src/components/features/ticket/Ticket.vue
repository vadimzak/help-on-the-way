<template>
  <v-layout row wrap>
    <TicketDetails v-if="activeTicket" :ticket="activeTicket" />
    <div class="divider-title">
      <img src="static/assets/divider-image.png" class="divider-image">
      <div class="divider-text">
        יש לנו הזדמנויות נוספות לעשות טוב בדרך שלך
        <i class="material-icons">keyboard_arrow_down</i>
      </div>
    </div>
    <RelatedTickets/>
  </v-layout>
</template>

<script>
  import TicketDetails from './TicketDetails'
  import RelatedTickets from "./TicketsList.vue";
  import { GET_BY_ID } from '@/graphql/queries/ticket'
  import { mapState } from 'vuex'
  export default {
    components: {
      RelatedTickets,
      TicketDetails
    },
    methods: {},
    data() {
      return {}
    },
    computed: {
    ...mapState(['activeTicket'])
    },
    apollo: {
      ticket(){
          return {
            query: GET_BY_ID,
            variables(){
              return {
                ticketId: this.$route.params.id,
              }
            },
            update(data){
              this.$store.commit('setActiveTicket', data.ticket)
            }
          }
      }
  },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .greeting {
    text-align: center;
    width: 100%;
    margin: 15px 0;
  }

  #ticket-headline {
    font-size: 22px;
    line-height: 32px;
    letter-spacing: -1px;
    font-weight: bold;
  }

  .card-content {
    background-color: #eeeaff;
  }

  .card-content ul {
    list-style: none;
  }

  .card-content ul li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .card-content ul li i {
    width: 40px;
    text-align: right;
  }

  .container {
    align-items: flex-start;
  }

  .card-image {
    background-color: #7821f0;
  }

  .card {
    padding-bottom: 15px;
  }

  .ticket-details {
    width: 100%;
  }

  .ticket-tags {
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .tag {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    opacity: 0.7;
  }

  .tag i {
    font-size: 30px;
  }

  .important-things > * {
    width: 100%;
  }

  .volunteer, .agree {
    width: 150px;
    height: 40px;
    color: white;
    margin: auto;
    font-size: 24px;
    font-weight: bold;
    border-radius: 52px;
    background-color: #6e47ff;
    box-shadow: 0px 5px 17.9px 3.2px rgba(92, 91, 91, 0.44);
  }

  .agree {
    background-color: #1273ff;
    font-size: 20px;
  }

  .card__media__background {
    width: 102%;
  }

  .card .card__actions {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .duration {
    font-weight: bold;
    left: 10px;
    position: absolute;
    top: 45px;
  }

  .dialog-card {
    padding: 15px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .dialog-card .card__text {
    text-align: center;
  }

  .divider-title {
    height: 80px;
    position: relative;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
  }

  .divider-image {
    height: 80px;
    position: absolute;
    left: -40px;
  }

  .divider-text {
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: center;
    color: #1273ff;
    width: 70%;
  }

  .divider-text i {
    display: block;
  }

  .divider {
    width: 80%;
    margin: auto;
  }
</style>
