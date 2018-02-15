<template>
  <div>
    <div class="row center-text">
      <div class="col-xs-4">
        שם הזקן
      </div>
      <div class="col-xs-2">
        סוג הפניה
      </div>
      <div class="col-xs-3">
        איך ליצור קשר?
      </div>
      <div class="col-xs-3">
        מתי
      </div>
    </div>
    <div class="row ticket" v-bind:class="{'active': ticket.id == selectedTicket.id}" v-for="ticket in tickets" v-on:click="onTicketClicked(ticket)">
      <div class="col-xs-3">
        {{ticket.personByElderId.firstName}} {{ticket.personByElderId.lastName}}
      </div>
      <div class="col-xs-3">

      </div>
      <div class="col-xs-3">
        <div class="phone-icons">
          <div class="home-phone">
            <i class="fa fa-phone"></i>
          </div>
          <div class="cell-phone">
            <i class="fa fa-mobile"></i>
          </div>
        </div>
        <div class="phone-numbers">
          <div class="cell-phone">
            <span></span>
          </div>
          <div class="phone-number">
            <span> {{ticket.personByElderId.phoneNumber}} </span>
          </div>
        </div>
      </div>
      <div class="col-xs-3">
        <div class="date-icons">
          <div class="calender">
            <i class="fa fa-calendar-o"></i>
          </div>
          <div class="clock">
            <i class="fa fa-clock-o"></i>
          </div>
        </div>
        <div class="ticket-dates">
          <div class="due-date">
            <span> {{ticket.dueDate | formatDate}} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      tickets: Array,
      onTicketClicked: Function,
      selectedTicket: Object
  }
}
</script>


<style scoped>
  .active {
    background-color: #e3e3e3;
  }

  .ell-phone {
    padding-bottom: 7px;
  }

  .phone-icons, .phone-numbers, .date-icons, .ticket-dates {
    float: right;
  }

  .center-text {
    vertical-align: middle;
    text-align: center;
  }

  .phone-numbers, .ticket-dates {
    padding-right: 7px;
  }

  .ticket {
    margin-bottom: 10px;
  }

  .due-date {
    word-wrap: break-word;
  }
</style>
