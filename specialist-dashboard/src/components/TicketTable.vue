<template>
  <div>
    <div class="row table-header center-text">
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
    <div class="row ticket" v-bind:class="{'active': ticket.id == selectedTicket.id}" v-for="ticket in tickets" v-bind:key="ticket.id" v-on:click="onTicketClicked(ticket)">
      <div class="col-3 ticket-cell elder-name-cell">
        <input class="radio" name='elder' type="radio"/>
        <span class="elder-name">{{ticket.personByElderId.firstName}} {{ticket.personByElderId.lastName}}</span>
      </div>
      <div class="col-3 ticket-cell">

      </div>
      <div class="col-3 ticket-cell">
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
      <div class="col-3 ticket-cell">
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
    background-color: #e6eeff;
  }

  .ticket{
    border-bottom: solid 1px #9fa9a3;
    border-collapse: collapse;
    border-left: solid 1px #9fa9a3;
    padding: 10px 0 10px 0;
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

  .due-date {
    word-wrap: break-word;
  }
  .table-header{
    background-color: #3b3a30;
    color: white;
    height: 35px;
    white-space: nowrap;
    align-items: center
  }
  .ticket-cell{
    align-self: center;
  }
  .elder-name-cell{
    display: flex;
  }
  .elder-name{
    padding: 0 10px 0px 0;
  }
  .radio{
    align-self: center;
    margin: 0;
  }
</style>
