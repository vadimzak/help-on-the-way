<template>
  <div class="tickets-table">
    <div class="row table-header m-0 center-text">
      <div class="col">
        שם הזקן
      </div>
      <div class="col">
        סוג הפניה
      </div>
      <div class="col">
        איך ליצור קשר?
      </div>
      <div class="col">
        מתי
      </div>
    </div>
    <div class="table-body">
    <div class="row ticket m-0" :style="getStyle(ticket)" v-bind:class="{'active': ticket.id == selectedTicket.id}"
     v-for="ticket in tickets"
     v-bind:key="ticket.id" v-on:click="onTicketClicked(ticket)">
      <div class="col d-flex justify-content-center ticket-cell elder-name-cell">
        <span class="elder-name">{{ticket.personByElderId.firstName}} {{ticket.personByElderId.lastName}}</span>
      </div>
      <div class="col d-flex justify-content-center ticket-cell">
           {{getTicketActivity(ticket)}}
      </div>
      <div class="col d-flex justify-content-center ticket-cell">
        <div class="phone-numbers">
          <div class="cell-phone">
            <span></span>
          </div>
          <div class="phone-number">
            <span> {{ticket.personByElderId.phoneNumber}} </span>
          </div>
        </div>
      </div>
      <div class="col d-flex justify-content-center ticket-cell">
        <div class="ticket-dates">
          <div class="due-date">
            <span> {{ticket.dueDate | formatDate}} </span>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import categoriesTree from 'shared/constants/categoriesTree';
export default {
	props: {
		tickets: Array,
		onTicketClicked: Function,
		selectedTicket: Object
	},
	methods: {
		getStyle(ticket) {
			return {
				'--category-color': categoriesTree[ticket.category].self.color
			};
		},
		getTicketActivity(ticket) {
			return categoriesTree[ticket.category].self.text;
		}
	}
};
</script>


<style scoped>
.tickets-table {
	font-family: 'Open Sans Hebrew';
}
.table-body {
	overflow-y: scroll;
	height: 60vh;
	overflow-x: hidden;
}
.active {
	background-color: #f4f4f4;
}

.ticket {
	padding: 10px 0 10px 0;
	border-top: 2px solid #f4f4f4;
	border-right: 10px solid var(--category-color);
}

.center-text {
	vertical-align: middle;
	text-align: center;
}

.phone-numbers,
.ticket-dates {
	padding-right: 7px;
}

.due-date {
	word-wrap: break-word;
	font-size: 20px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
}
.table-header {
	background-color: #ffffff;
	color: black;
	height: 35px;
	white-space: nowrap;
	align-items: center;
}
.ticket-cell {
	align-self: center;
	text-align: center;
}
.elder-name-cell {
	display: flex;
}
.elder-name {
	padding: 0 10px 0px 0;
	font-size: 20px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	text-align: center;
}
</style>
