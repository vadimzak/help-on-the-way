<template>
  <v-flex>
    <v-card v-sticky>
      <v-card-media
        class="white--text card-image full-ticket-card"
        height="235px"
        :style="getStyle(ticket)">
        <v-container fill-height fluid>
            <v-flex xs12 align-end flexbox>
              <v-layout column>
                <span class="" id="ticket-headline">
                  {{ticket | formatTicketTitle}}
                </span>
                <span id="ticket-subheader">
                  {{ticket.elder.firstName}} מצפה לטלפון ממך                  
                </span>
                <img align-self-center :src="`static/assets/posters/${ticket.category.toLowerCase()}.png`" class="ticket-poster">
              </v-layout>
            </v-flex>
        </v-container>
      </v-card-media>
      <v-btn
        :style="getActionStyle(ticket)"
        dark
        fab
        class="call-button"
        :href="`tel:${ticket.elder.phoneNumber.replace(/^\0/, '972')}`"
      >
        <v-icon>phone</v-icon>
      </v-btn>
    </v-card>
       <div class="card-content">
        <div class="ticket-details">
          <div class="section">
                <TicketDueDateTime :ticket="ticket"/>
          </div>
          <div class="where section">
            <TransportType :type="ticket.transport"/>
            <TransportRoute :ticket="ticket"/>
          </div>
          <div class="who section">
            <ElderBasicInfo :elder="ticket.elder" :elder-mobility="ticket.elderMobility"/>
          </div>
      <div class="important-things section">
        <NeedToKnow :items="ticket.details.needToKnow"/>
      </div>
    </div>
   </div>
  </v-flex>
</template>

<script>
  import categoriesTree from 'shared/constants/categoriesTree'
  import TransportType from '../templates/TransportType'
  import TransportRoute from '../templates/TransportRoute'
  import ElderBasicInfo from '../templates/ElderBasicInfo'
  import TicketDueDateTime from '../templates/TicketDueDateTime'
  import NeedToKnow from '../templates/NeedToKnow'

  export default {
    props: ['ticket'],
    components: {
      TransportType,
      TransportRoute,
      ElderBasicInfo,
      TicketDueDateTime,
      NeedToKnow
    },
    data() {
      return {
        dialog: false,
      }
    },
    computed: {},
    methods: {
      getStyle(ticket) {
        return {
          '--background-color': categoriesTree[ticket.category].self.background,
          '--box-shadow': categoriesTree[ticket.category].self.color
        }
      },
      getActionStyle(ticket) {
        return {
          'background-color': '#207bff',
        }
      },
    },
  }
</script>

<style scoped> 
  #ticket-headline {
    font-size: 25px;
    line-height: 32px;
    letter-spacing: -1px;
    font-family: 'Open Sans Hebrew', Arial;
  }

  #ticket-subheader {
    font-size: 18px;
  } 

  .card {
    max-width: 100vw;
    box-shadow: none;

  }

  .card.is-sticky{
    transform:  translateY(56px);
    z-index: 2;
  }
  .card{
    transition: transform 0.3s ease;
  }
  .card-content{
    overflow-y:scroll;
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

  .card-image {
    background-image: var(--background-color);
    /* box-shadow:  0px 1.5px 7px 0.5px  var(--box-shadow); */
    box-shadow:  0px 1.5px 7px 0.5px rgba(0,0,0,0.3);

  }

  .call-button{
    background-color: var(--action-color);
    position: absolute;
    bottom: -35px;
    border-radius: 100px;
        width: 65px;
    height: 65px;
        left: 10px;
        z-index: 99;
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

  .container {
    align-items: flex-start;
        padding: 5px;
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

   .who {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: 'Tahoma';
  }



  .where {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-family: 'Tahoma';
  }


  .section{
    padding: 25px;
    position:relative;
    color : #757575;
  }

  .section.where {
    padding-bottom: 7px;
  }



  .section:after{
    content:"";
    width: 72%;
    height: 1px;
    position: absolute;
    bottom: 0;
    background-color: gainsboro;
    margin-right: 7%;
  }

  .ticket-poster{
    align-self: center;
    max-height: 210px;
    width: auto;
    position: absolute;
    bottom: -20px;
    padding-left: 6px;
  }

  .section.important-things:after {
    width:0;
  }
</style>
