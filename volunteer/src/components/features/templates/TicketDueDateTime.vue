<template>
    <div class="when-block">
            <i class="material-icons">date_range</i>
        <div class="pr-2">
            <div class="timing"  @click="triggerSchedule">
                <div class="ticket-date pl-3">
                    <span v-if="ticket.dueDate">
                        {{this.$moment(ticket.dueDate).format('L')}} 
                    </span>
                    <span v-else class="unscheduled">
                        תאריך הפגישה
                    </span>
                </div>  
                <div class="ticket-time">
                    <span v-if="ticket.dueTime">
                        {{ticket.dueTime}} 
                    </span>
                    <span v-else class="unscheduled">
                        שעת הפגישה
                    </span>
                </div>  
            </div>  
                <a v-if="ticket.dueTime && ticket.dueDate" class="date-time-action" :href="getCalendarLink()" target="_blank">
שמירה ביומן 
                </a>
                <a @click="triggerSchedule" class="date-time-action" v-else>
                    {{ callToActionText }}
                </a>
            </div>
    <v-dialog
        ref="scheduleDialog"
        persistent
        v-model="scheduleDialogOpen"
        lazy
        full-width
        width="290px"
        :return-value.sync="dueTime"
      >
        <v-time-picker v-if="scheduleStep === 'set-time'" format="24hr" v-model="dueTime" actions>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="scheduleDialogOpen = false">ביטול</v-btn>
          <v-btn flat color="primary" :loading="scheduleSaveInProgress" @click="nextScheduleStep">שמירה</v-btn>
        </v-time-picker>
        <v-date-picker  locale="he-IL" v-if="scheduleStep === 'set-date' && !ticket.fixedDueDate" v-model="dueDate" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="scheduleDialogOpen = false">ביטול</v-btn>
          <v-btn flat color="primary" :loading="scheduleSaveInProgress" @click="nextScheduleStep">שמירה</v-btn>
        </v-date-picker>
      </v-dialog>                
            </div>
</template>
<script>
export default {
	props: ['ticket'],
	data() {
		return {
			scheduleDialogOpen: false,
			dateDialogOpen: false,
			dueTime: undefined,
			dueDate: undefined,
			scheduleStep: undefined,
			scheduleSaveInProgress: undefined
		};
	},
	methods: {
		getCalendarLink() {
			return `https://calendar.google.com/calendar/r/eventedit?
			text=${this.$options.filters.formatTicketTitle(this.ticket).replace(new RegExp(' ', 'g'),'+')}
			&dates=${getDateRange.call(this)}
			&details=${window.location.href}
			&location=${getAddress(this.ticket.startAddress)}`;
		},
		triggerSchedule() {
			const ticket = this.ticket;
			if (ticket.fixedDueTime && ticket.fixedDueDate) {
				return; // nothing to do time is fixed
			}
			// set intial state
			this.dueTime = ticket.dueTime;
			this.dueDate = ticket.dueDate;
			this.scheduleDialogOpen = true;
			this.scheduleStep = ticket.fixedDueDate ? 'set-time' : 'set-date';
		},
		async nextScheduleStep() {
			const ticket = this.ticket;
			const currStep = this.scheduleStep;
			if (currStep === 'set-date' && !ticket.fixedDueTime) {
				this.scheduleStep = 'set-time';
				return;
			}
			this.scheduleSaveInProgress = true;
			// save and close
			try {
				await this.$store.dispatch('updateTicketScheduleDate', { dueDate: this.dueDate, dueTime: this.dueTime });
				this.scheduleDialogOpen = false;
			} catch (error) {
				// TODO handle error
			} finally {
				this.scheduleSaveInProgress = false;
			}
		}
	},
	computed: {
		callToActionText() {
			const ticket = this.ticket;
			if (ticket.dueTime) {
				return `בחר/י את התאריך שתיאמת עם ${ticket.elder.firstName}`;
			}
			if (ticket.dueDate) {
				return `בחר/י את השעה שתיאמת עם ${ticket.elder.firstName}`;
			}
			return `בחר/י את השעה והתאריך שתיאמת עם ${ticket.elder.firstName}`;
		}
	}
};
function getDateRange() {
	const dateFormat = 'YYYYMMDDTHHmmss[Z]';
	const date = this.ticket.dueDate;
	const time = this.ticket.dueTime;
	const startDate = this.$moment(date+'T'+time);
	const endDate = this.$moment(startDate);
	endDate.add(this.ticket.durationEta, 'm');
	return `${this.$moment(startDate.utc()).format(dateFormat)}/${this.$moment(endDate.utc()).format(dateFormat)}`;
}
function getAddress(address) {
 return `${address.street} ${address.houseNumber}, ${address.city}`;
}
</script>
<style scoped>
.when-block {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-family: 'Tahoma';
	position: relative;
	color: #757575;
}

.when-block > span {
	padding-right: 10px;
}
.date-time-action {
	color: #2d83ff;
	font-size: 12px;
	text-decoration: none;
}

.timing {
	display: flex;
}
.unscheduled {
	color: var(--dark);
}
</style>
