<template>
  <v-flex>
    <v-card>
      <v-card-media
        class="white--text card-image"
        height="90px"
        src="static/assets/card-title.png"
        v-on:click="closePreview">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbo>
                <span class="" id="ticket-headline">
                  {{ticket.description}}
                </span>
              <span class="duration">
                  {{ticket.durationEta}} שעות
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
              <i class="material-icons">event</i>
              {{this.$moment(ticket.dueDate).format('L')}}
            </li>
            <li>
              <i class="material-icons">alarm</i>
              {{this.$moment(ticket.dueDate).format('HH:mm')}}-
              {{this.$moment(ticket.dueDate).add(ticket.durationEta, 'hour').format('HH:mm')}}
            </li>
            <li>
              <i class="material-icons">home</i>
              {{ticket.startAddressStreet}}, {{ticket.startAddressCity}}
            </li>
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
        <h2>דברים שחשוב לדעת</h2>
        <ul>
          <li v-for="info in ticket.importantInfo">
            {{info}}
          </li>
        </ul>
      </v-card-title>
      <v-card-actions>
        <v-dialog max-width="290">
          <button class="volunteer" slot="activator">מתנדב/ת</button>
          <v-card class="dialog-card">
            <v-icon>close</v-icon>
            <v-card-text>
              <div> היי {{$store.state.user.firstName}},</div>
              <div> האם ברצונך לסייע ל{{ticket.elderName}}?</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <button class="agree" flat @click="$router.replace('ticket/'+ticket.id)">אשמח לעזור :)</button>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
  export default {
    name: "ticket-preview",
    mounted: function () {
      this.getTicketById()
    },
    methods: {
      getTicketById: function(id){
        this.$store.dispatch('setActiveTicketById', {
          id: this.$route.params.id
        })
      },
      closePreview: function(index) {
        this.preview = null;
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

  .card-image {
    background-color: #7821f0;
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
</style>
