<template>
  <v-flex>
    <v-card>
      <v-card-media
        class="white--text card-image"
        height="90px"
        v-on:click="closePreview">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbo>
                <span class="" id="ticket-headline">
                  {{ticket.description}}
                </span>
              <span class="duration">
                  {{ticket.durationEta}}
                </span>
              <span class="hours">
                 שעות
              </span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-media>
      <v-card-title class="card-content">
        <div class="ticket-details">
          <ul>
            <li>
              <i class="material-icons">account_circle</i>
              {{ticket.elderFirstName}} {{ticket.elderLastName}}
            </li>
            <li>
              <i class="material-icons">date_range</i>
              {{this.$moment(ticket.dueDate).format('L')}}
              {{this.$moment(ticket.dueDate).format('HH:mm')}}-
              {{this.$moment(ticket.dueDate).add(ticket.durationEta, 'hour').format('HH:mm')}}
            </li>
            <li>
              <i class="material-icons">local_taxi</i>
              נוסעים במונית
            </li>
            <div class="address">
              <v-card class="start-address">
                <img src="static/assets/placeholder-copy.png">
                {{ticket.startAddressStreet}},
                {{ticket.startAddressCity}}
              </v-card>
              <div class="arrows">
                <img src="static/assets/transfer-1.png">
              </div>
              <v-card class="end-address">
                <img src="static/assets/flag.png">
                {{ticket.endAddressStreet}},
                {{ticket.endAddressCity}}
              </v-card>
            </div>
          </ul>
        </div>
        <div class="ticket-tags">
          <div class="tag" v-for="tag in ticket.tags">
            <i class="material-icons">{{tag.icon}}</i>
            {{tag.name}}
          </div>
        </div>
      </v-card-title>
      <v-card-title class="important-things">
        <h2>
          <i class="material-icons">star</i>
          דברים שחשוב לדעת
        </h2>
        <ul>
          <li v-for="info in ticket.importantInfo">
            {{info}}
          </li>
        </ul>
      </v-card-title>
      <v-card-actions>
        <v-dialog max-width="290" v-model="dialog">
          <button class="volunteer" @click="dialog = !dialog" slot="activator">אני בפנים</button>
          <v-card class="dialog-card">
            <v-card-text>
              <div> היי {{$store.state.user.firstName}},</div>
              <div> האם ברצונך לסייע ל{{ticket.elderName}}?</div>
            </v-card-text>
            <v-card-actions class="actions">
              <v-spacer></v-spacer>
              <button class="agree" flat @click="assignTicket()">אשמח לעזור :)</button>
              <button class="cancel" flat @click="dialog=false">לחצתי בטעות</button>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
      }
    },
    name: "ticket-preview",
    mounted: function () {
      this.getTicketById()
    },
    methods: {
      getTicketById: function (id) {
        this.$store.dispatch('setActiveTicketById', {
          id: this.$route.params.id
        })
      },
      closePreview: function (index) {
        this.preview = null;
      },
      assignTicket: function () {
        this.$store.dispatch('assignTicket', {
          id: this.$route.params.id
        })
      }
    },
    computed: {
      ticket() {
        return this.$store.getters.activeTicket || {}
      }
    }
  }
</script>

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
    background-image: linear-gradient(63deg, #963efa, #7146fe);
    box-shadow: 0px 3px 14.6px 1.4px rgba(126, 67, 253, 0.42);
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

  .volunteer, .agree, .cancel {
    width: 150px;
    height: 40px;
    color: white;
    margin: auto;
    font-size: 24px;
    font-weight: bold;
    border-radius: 10px;
    background-color: #1273ff;
    box-shadow: 0px 6px 13px 0 rgba(136, 136, 136, 0.44);
  }

  .volunteer {
    width: 90vw;
    margin-bottom: 2vw;
  }

  .agree {
    background-color: #1273ff;
    font-size: 20px;
    font-weight: lighter;
  }

  .cancel {
    font-size: 20px;
    font-weight: lighter;
    background-color: #f6f6f6;
    color: #343434;
    margin-top: 10px;
  }

  .card .card__actions {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .duration, .hours {
    font-weight: bold;
    left: 10px;
    position: absolute;
    top: 15px;
    font-size: 28px;
  }

  .hours {
    top: 45px;
    font-size: 16px;
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

  .divider-text i {
    display: block;
  }

  .related-tickets li:first-of-type {
    border-right: 6px solid #ff5f5f;
  }

  .related-tickets li:nth-of-type(2) {
    border-right: 6px solid #23f7c4;
  }

  .related-tickets li:nth-of-type(3) {
    border-right: 6px solid #fff34c;
  }

  .related-tickets li:nth-of-type(4) {
    border-right: 6px solid #ff9141;
  }

  .address {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .address .card {
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 3vw;
  }

  .address .card img {
    max-height: 20px;
    width: auto;
    margin-bottom: 10px;
  }

  .arrows {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .arrows img {
    max-width: 50%;
  }

  .actions {
    display: flex;
    flex-direction: column;
  }
</style>
