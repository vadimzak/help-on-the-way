<template>
  <v-layout column wrap>
    <h4 class="greeting">היי, {{$store.state.user.firstName}}, כיף לראות אותך כאן :) </h4>
    <v-flex>
      <v-card>
        <v-card-media
          class="white--text card-image"
          height="90px"
          src="static/assets/card-title.png">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbo>
                <span class="" id="ticket-headline">
                  {{$data.ticket.title}}
                </span>
                <span class="duration">
                  {{$data.ticket.durationEta}}
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
                {{$data.ticket.elder.name}}, {{$data.ticket.elder.gender}} {{$data.ticket.elder.age}}
              </li>
              <li>
                <i class="material-icons">event</i>
                {{$data.ticket.when.day}}, {{$data.ticket.when.date}}
              </li>
              <li>
                <i class="material-icons">alarm</i>
                {{$data.ticket.when.startHour}}-
                {{$data.ticket.when.endHour}}
              </li>
              <li>
                <i class="material-icons">home</i>
                {{$data.ticket.address}}
              </li>
            </ul>
          </div>
          <div class="ticket-tags">
            <div class="tag" v-for="tag in $data.ticket.tags">
              <i class="material-icons">{{tag.icon}}</i>
              {{tag.name}}
            </div>
          </div>
        </v-card-title>
        <v-card-title class="important-things">
          <h2>דברים שחשוב לדעת</h2>
          <ul>
            <li v-for="info in $data.ticket.importantInfo">
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
                <div> האם ברצונך לסייע ל{{$data.ticket.elder.name}}?</div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <button class="agree" flat onclick="this.agree()">אשמח לעזור :)</button>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-flex>
    <div class="divider-title">
      <img src="static/assets/divider-image.png" class="divider-image">
      <div class="divider-text">
        יש לנו הזדמנויות נוספות לעשות טוב בדרך שלך
      </div>
    </div>
  </v-layout>
</template>

<script>
  export default {
    components: {},
    name: 'Ticket',
    methods: {
      agree: function () {
        console.log('hi')
      }
    },
    data() {
      return {
        ticket: {
          state: 'summary',
          title: 'ליווי רוזה לקופת החולים',
          address: 'הרצל 72, תל אביב',
          when: {
            startHour: '17:00',
            endHour: '20:00',
            date: '17 בינואר',
            day: 'ראשון',
          },
          description: `He is afraid to climb a ladder alone,
       due to his physical state. We need someone to go help him`,
          durationEta: '3 שעות',
          status: 'open',
          elder: {
            name: 'רוזה לוין',
            age: '70',
            gender: 'בת'
          },
          tags: [
            {name: 'עזרה בהליכה', icon: 'directions_walk'},
            {name: 'נסיעה במונית', icon: 'local_taxi'},
            {name: 'כבד שמיעה', icon: 'hearing'},
          ],
          importantInfo: [
            'רוזה תחכה בתוך הבית',
            'רוזה משלמת על המונית',
            'המטפלת של רוזה תצטרף לליווי',
            'רוזה מצפה לשיחת טלפון ממך'
          ]
        }
      }
    }
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
</style>
