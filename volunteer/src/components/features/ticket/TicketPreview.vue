<template>
  <v-flex>
    <v-card :tile="true">
      <v-card-media
        @click=" closePreview ? closePreview() : void 0"
        class="white--text card-image"
        height="88px" style="display: flex; height: 90px; align-items: center; justify-content: space-around;">
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
        
      </v-card-media>
      <v-card-title class="card-content">
        <div class="ticket-details">
          <ul>
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
                {{ticket.startAddress.street}},
                {{ticket.startAddress.city}}
              </v-card>
              <div class="arrows">
                <img src="static/assets/transfer-1.png">
              </div>
              <v-card class="end-address">
                <img src="static/assets/flag.png">
                {{ticket.endAddress.street}},
                {{ticket.endAddress.city}}
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
          <v-card class="dialog-card" v-if="!isTicketMatched">
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
          <v-card class="dialog-card" v-else>
            <v-card-text>
              <div>  
מעריכים את הרצון הטוב אך הפנייה כבר נתפסה
							</div>
              <v-card-actions class="actions">
                <v-spacer></v-spacer>
                <button class="cancel" flat @click="dialog=false">
                  נסה כרטיס אחר
                </button>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
	props: ['ticket', 'closePreview'],
	data() {
		return {
			dialog: false,
			isTicketMatched: false
		};
	},
	computed: {
		timeUnit() {
			return this.$options.filters.formatMinutes(this.ticket.durationEta).split(' ')[1];
		},
		timeCount() {
			return this.$options.filters.formatMinutes(this.ticket.durationEta).split(' ')[0];
		}
	},
	methods: {
		assignTicket: async function() {
			try {
				await this.$store.dispatch('assignTicket', {
					id: this.ticket.id
				});
				this.$router.replace('/ticket/' + this.ticket.id);
			} catch (e) {
				if (e.message && e.message.indexOf('ticket already assigned') > -1) {
					//handle case if the ticket already assigned
					this.isTicketMatched = true;
					console.warn('ticket already assigned!');
				} else {
					throw e;
				}
			} finally {
        //Remove ticket from open tickets
         this.$store.commit('removeOpenTicket', this.ticket.id)
			}
		}
	}
};
</script>

<style scoped>
.greeting {
	text-align: center;
	width: 100%;
	margin: 15px 0;
}

#ticket-headline {
	font-size: 20px;
	line-height: 32px;
	letter-spacing: -1px;
	font-weight: bold;
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
	box-shadow: 0px 2px 14.6px 1.4px rgba(126, 67, 253, 0.42);
	    display: flex;
    height: 90px;
    align-items: center;
    justify-content: center;
		color:white;
		padding-right: 22px;
		padding-left: 18px;
}

* >>> .card__media__content {
	    display: flex;
    height: 90px;
    align-items: center;
    justify-content: space-between;
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

.volunteer,
.agree,
.cancel {
	width: 150px;
	height: 40px;
	color: white;
	margin: auto;
	font-size: 24px;
	font-weight: bold;
	border-radius: 0;
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


  .list .list__tile__sub-title, .list__tile__title {
    text-align: right;
		color:white;
  }

  .list__tile__title {
    font-weight: bold;
    font-size:20px;
  }

  .list__tile__sub-title {
    font-size: 15px;
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
