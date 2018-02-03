<template>
  <div class="ticket-preview">
    <div class="ticket-sub-header">
      מספר פניה
    </div>
    <div>
      {{ticket.id}}
    </div>
    <div class="ticket-sub-header">
      סוג הפנייה
    </div>
    <div>
      {{ticket.ticketType.name}}
    </div>
    <div class="description-header ticket-sub-header">
      תיאור הפנייה
    </div>
    <div>
      {{ticket.description}}
    </div>
    <div class="row location">
      <div class="col-xs-1 locations-icons">
        <div class="location-icon">
          <i class="fa fa-map-marker"></i>
        </div>
        <div class="location-icon">
          <i class="fa fa-long-arrow-down"></i>
        </div>
        <div class="location-icon">
          <i class="fa fa-thumb-tack"></i>
        </div>
        <div class="location-icon">
          <i class="fa fa-long-arrow-down"></i>
        </div>
        <div class="location-icon">
          <i class="fa fa-map-marker"></i>
        </div>
      </div>
      <div class="col-xs-11 locations-details">
        <div class="location-details">
          <div class="ticket-sub-header">
            <span>איסוף</span>
          </div>
          <div class="ticket-pickup">
            <input-address v-bind:location-changed="changePickupLocation" v-bind:address="ticket.rootDescription.pickup"></input-address>
          </div>
        </div>
        <div class="location-details">
          <div class="ticket-sub-header">
            <span>יעד</span>
          </div>
          <div class="ticket-pickup">
            <input-address v-bind:location-changed="changeTicketLocation" v-bind:address="ticket.rootDescription.operationLocation"></input-address>
          </div>
        </div>
        <div class="location-details">
          <div class="ticket-sub-header">
            <span>סיום</span>
          </div>
          <div class="ticket-pickup">
            <input-address v-bind:location-changed="changeDropoffLocation" v-bind:address="ticket.rootDescription.dropOff"></input-address>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InputAddress from '@/components/InputAddress'

  export default {
    components: {  InputAddress },
    data () {
      return {}
    },
    props: {
        ticket: Object
    },
    methods: {
      changePickupLocation: function(newLocation) {
          this.ticket.rootDescription.pickup = newLocation.formatted_address;
      },
      changeTicketLocation: function(newLocation) {
        this.ticket.rootDescription.operationLocation = newLocation.formatted_address;
      },
      changeDropoffLocation: function(newLocation) {
        this.ticket.rootDescription.dropOff = newLocation.formatted_address;
      }
    }
  }
</script>

<style scoped>
  .ticket-preview {
    background-color: #e3e3e3;
    padding-right: 10px;
  }

  .location {
    padding-bottom: 10px;
  }

  .location-icon {
    padding-top: 9px;
  }

  .location-details {
    padding-top: 10px;
  }
  .description-header, .location {
    margin-top: 10px;
  }

  .ticket-sub-header {
    color: #888888;
  }
</style>
