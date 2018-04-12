<template>
  <div class="tickets-table">
    <div class="table-body">
    <div class="row ticket m-0 my-2" :style="getStyle(ticket)" v-bind:class="{'active': ticket.id == selectedTicket.id}"
     @contextmenu.prevent="(e) => $refs.ctxMenu.open(e, ticket)"
     v-for="ticket in tickets"
     v-bind:key="ticket.id" v-on:click="onTicketClicked(ticket)">
     <div class="row w-100 m-0 py-4">
      <div class="col d-flex justify-content-center ticket-cell elder-name-cell">
        <span class="elder-name">{{ticket.elder.firstName}} {{ticket.elder.lastName}}</span>
      </div>
      <div class="col-4 d-flex justify-content-center ticket-cell text-truncate">
           {{ticket | formatTicketTitle(true)}}
      </div>
      <div class="col d-flex justify-content-center ticket-cell text-truncate">
        <div class="phone-numbers">
          <div class="cell-phone">
            <span></span>
          </div>
          <div class="phone-number">
            <span> {{ticket.elder.phoneNumber}} </span>
          </div>
        </div>
      </div>
      <div class="col d-flex justify-content-center ticket-cell text-truncate">
        <div class="ticket-dates">
          <div>
            <span> {{ticket.dueDate | formatDate('dddd DD.MM')}} </span>
          </div>
        </div>
      </div>
      <div class="col d-flex justify-content-center ticket-cell text-truncate">
        <div class="ticket-dates">
          <div>
            <span> {{(ticket.dueTime || '14:00') | formatTime}} </span>
          </div>
        </div>
      </div>
     </div>
    </div>
    </div>
    <context-menu ref="ctxMenu" @ctx-open="(data) => contextTicket = data">
      <li @click="() => $router.push({name: 'Ticket', params: { id: contextTicket.id }})">עריכת פנייה</li>
    </context-menu>
  </div>
</template>

<script>
import contextMenu from 'vue-context-menu'
import categoriesTree from 'shared/constants/categoriesTree';

export default {
  components: { contextMenu },
	props: {
		tickets: Array,
		onTicketClicked: Function,
		selectedTicket: Object
	},
	methods: {
		getStyle(ticket) {
			return {
				'--category-color': ticket.category ? categoriesTree[ticket.category].self.color : 'var(--secondary)'
			};
		},
  }
};
</script>


<style scoped>
.tickets-table {
	font-family: 'Open Sans Hebrew';
}

.ticket.active {
  background-color: white;
  transform: scale(1.05);
  width: 100%;
  z-index: 22;
  box-shadow: 0px 7px 14.9px 0.01px rgba(142, 142, 142, 0.3) !important;
}
.ticket.active + .ticket{
  /* margin-top: 82px !important; */
}
.ticket {
  transition: all .2s ease-in-out;
  box-shadow: 0px 5px 14.9px 1.1px rgba(142, 142, 142, 0.05);
	border-right: 7px solid var(--category-color);
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
	color: var(--secondary);
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
