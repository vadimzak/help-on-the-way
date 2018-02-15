<template>
  <div v-if="ticket" class="ticket-preview">
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
      <span>{{ticket.personByElderId.firstName}} {{ticket.personByElderId.lastName}}</span>
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
      </div>
      <div class="col-xs-11 locations-details">
        <div class="location-details">
          <div class="ticket-sub-header">
            <span>איסוף</span>
          </div>
          <div class="ticket-pickup">
            <input-address v-bind:location-changed="changePickupLocation" v-bind:address="ticket.addressByAddressId"></input-address>
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
