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
            <span>{{ticket.rootDescription.pickup}}</span>
          </div>
        </div>
        <div class="location-details">
          <div class="ticket-sub-header">
            <span>יעד</span>
          </div>
          <div class="ticket-pickup">
            <span>{{ticket.rootDescription.operationLocation}}</span>
          </div>
        </div>
        <div class="location-details">
          <div class="ticket-sub-header">
            <span>סיום</span>
          </div>
          <div class="ticket-pickup">
            <span>{{ticket.rootDescription.dropOff}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {}
    },
    props: {
        ticket: Object
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
