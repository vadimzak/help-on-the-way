<template>
  <div v-if="ticket" class="ticket-preview">
    <div class="row ticket-tabs">
      <div v-on:click="changeView('elderDetailsView')" class="col-xs-4 elder-tab-button">
        <span>פרטי הזקן</span>
      </div>
      <div v-on:click="changeView('ticketDetailsView')" class="col-xs-4 ticket-tab-button">
        <span>פרטי הפנייה</span>
      </div>
      <div v-on:click="changeView('volunteerDetailsView')" class="col-xs-4 volunteer-tab-button">
        <span>פרטי המתנדב</span>
      </div>
    </div>
    <div v-if="selectedView=='elderDetailsView'" class="elder-details">
      <div class="name">
        <span>שם: </span><span>{{ticket.personByElderId.firstName}}</span> <span>{{ticket.personByElderId.lastName}}</span>
      </div>
      <div class="phone">
        <span>טלפון:</span> <span>{{ticket.personByElderId.phoneNumber}}</span>
      </div>
      <div class="phone">
        <span>כתובת</span><span>{{ticket.personByElderId.addressByAddressId.city}}</span>
        <span>{{ticket.personByElderId.addressByAddressId.street}}</span>
        <span>{{ticket.personByElderId.addressByAddressId.houseNumber}}</span>
      </div>
    </div>
    <div v-if="selectedView=='ticketDetailsView'" class="ticket-details">
      <div class="ticket-sub-header">
        <span>מספר פניה</span>
      </div>
      <div>
        {{ticket.id}}
      </div>
      <div class="ticket-sub-header">
        <span> נפתח על ידי</span>
      </div>
      <div>
        <editable-input v-bind:icon="'fa fa-pencil'" v-bind:valueChanged="updateTicketIssuingInstitue"  v-bind:value="ticket.issuingInstitue"></editable-input>
      </div>
      <div class="description-header ticket-sub-header">
        <span>תיאור הפנייה</span>
      </div>
      <div>
        <editable-input v-bind:icon="'fa fa-pencil'" v-bind:valueChanged="updateTicketDescription"  v-bind:value="ticket.description"></editable-input>
      </div>
      <div class="row location">
        <div class="col-xs-1 locations-icons">
          <div class="start-location-icon">
            <i class="fas fa-map-marker"></i>
          </div>
          <div class="down-arrow">
            <i class="fa fa-angle-double-down"></i>
            <i class="fa fa-angle-double-down"></i>
          </div>
          <div class="destination-location-icon">
            <i class="fa fa-compass"></i>
          </div>
          <div class="down-arrow">
            <i class="fa fa-angle-double-down"></i>
            <i class="fa fa-angle-double-down"></i>
          </div>
          <div class="end-location-icon">
            <i class="fa fa-map-marker"></i>
          </div>
        </div>
        <div class="col-xs-11 locations-details">
          <div class="start-location-details">
            <div class="ticket-sub-header">
              <span>איסוף</span>
            </div>
            <div class="ticket-pickup">
              <input-address v-bind:location-changed="changePickupLocation" v-bind:address="ticket.addressByStartAddressId"></input-address>
            </div>
          </div>
          <div class="destination-location-details">
            <div class="ticket-sub-header">
              <span>מיקום הפניה</span>
            </div>
            <div class="ticket-destination">
              <input-address v-bind:location-changed="changeDestinationLocation" v-bind:address="ticket.addressByDestinationAddressId"></input-address>
            </div>
          </div>
          <div class="end-location-details">
            <div class="ticket-sub-header">
              <span>נקודת סיום</span>
            </div>
            <div class="ticket-end">
              <input-address v-bind:location-changed="changeEndLocation" v-bind:address="ticket.addressByEndAddressId"></input-address>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedView=='volunteerDetailsView'" class="volunteers-details">
      <div v-for="volunteer in ticket.ticketMatchedVolunteersByTicketId.nodes" class="volunteer-view">
        <div class="volunteer-name">
          <span>שם:</span> <span>{{volunteer.firstName}}</span> <span>{{volunteer.lastName}}</span>
        </div>
        <div class="volunteer-phone">
          <span>טלפון:</span> <span>{{volunteer.phoneNumber}}</span>
        </div>
        <div v-if="volunteer.addressByAddressId" class="volunteer-phone">
          <span>כתובת:</span> <span>{{volunteer.addressByAddressId.city}}</span>
          <span>{{volunteer.addressByAddressId.street}}</span>
          <span>{{volunteer.addressByAddressId.houseNumber}}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import InputAddress from '@/components/InputAddress'
  import EditableInput from '@/components/EditableInput'
  import { UPDATE_TICKET, UPDATE_ADDRESS } from '../constants/graphql'

  export default {
    components: {  InputAddress, EditableInput },
    data () {
      return {
          selectedView: 'ticketDetailsView',
          showEditableDescription: false
      }
    },
    props: {
        ticket: Object
    },
    methods: {
      changePickupLocation: function(newLocation) {
        this.$apollo.mutate({
          mutation: UPDATE_ADDRESS,
          variables: {id: this.ticket.addressByStartAddressId.id, addressPatch: newLocation}
        });
      },
      changeDestinationLocation: function(newLocation) {
        this.$apollo.mutate({
          mutation: UPDATE_ADDRESS,
          variables: {id: this.ticket.addressByDestinationAddressId.id, addressPatch: newLocation}
        });
      },
      changeEndLocation: function(newLocation) {
        this.$apollo.mutate({
          mutation: UPDATE_ADDRESS,
          variables: {id: this.ticket.addressByEndAddressId.id, addressPatch: newLocation}
        });
      },
      changeView: function(view) {
          this.selectedView = view
      },
      showEditDescription: function() {
        this.showEditableDescription = true;
      },
      updateTicketIssuingInstitue: function(newIssuingInstitue) {
        if (newIssuingInstitue == this.ticket.issuing_institue) {
          return;
        }
        this.$apollo.mutate({
          mutation: UPDATE_TICKET,
          variables: {id: this.ticket.id, ticketPatch: {"issuingInstitue": newIssuingInstitue}}
        });
      },
      updateTicketDescription: function(newDescription) {
        if (newDescription == this.ticket.description) {
            return;
        }
        this.$apollo.mutate({
          mutation: UPDATE_TICKET,
          variables: {id: this.ticket.id, ticketPatch: {"description": newDescription}}
        })
      }
    }
  }
</script>

<style scoped>
  .ticket-preview {
    background-color: #e3e3e3;
    height: 100vh;
  }

  .location {
    padding-bottom: 10px;
  }

  .down-arrow, .start-location-icon, .end-location-icon {
    margin-right: 3px;
  }

  .destination-location-icon {
    margin-right: 1px;
  }

  .start-location-icon {
    margin-top: 20px;
  }

  .start-location-details {
    padding-top: 10px;
  }
  .description-header, .location {
    margin-top: 10px;
  }

  .ticket-sub-header {
    color: #888888;
  }

  .destination-location-icon {
    margin-top: 5px;
  }

  .destination-location-details, .end-location-details {
    margin-top: 25px;
  }

  .end-location-icon {
    margin-top: 5px;
  }

  .elder-tab-button, .ticket-tab-button, .volunteer-tab-button {
    border: solid 1px gray;
    display: inline-block;
    width: 30%;
    text-align: center;
    font-weight: 100;
    cursor: pointer;
  }

  .volunteer-view {
    margin: 10px;
  }

  .ticket-tabs {
    margin-right: 0;
  }

  .ticket-details {
    margin-right: 10px;
  }
</style>
