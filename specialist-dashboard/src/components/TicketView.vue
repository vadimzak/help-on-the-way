<template>
  <div v-if="ticket" class="ticket-preview">
    <div class="table-header"></div>
    <div class="ticket-tabs">
      <div v-on:click="changeView('elderDetailsView')" class="col p-2 elder-tab-button">
        <span>פרטי הזקן</span>
      </div>
      <div v-on:click="changeView('ticketDetailsView')" class="col p-2 ticket-tab-button">
        <span>פרטי הפנייה</span>
      </div>
      <div v-on:click="changeView('volunteerDetailsView')" class="col p-2 volunteer-tab-button">
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
      <div class="ticket-detail p-2">
        <span class="ticket-sub-header">מספר פניה</span>
        <div>
           {{ticket.id}}
        </div>
          <i class="icon icon-contract"></i>
      </div>
      <div class="ticket-detail p-2">
        <span class="ticket-sub-header"> נפתח על ידי</span>
        <editable-input v-bind:icon="'fa fa-pencil'" v-bind:valueChanged="updateTicketIssuingInstitue"  v-bind:value="ticket.issuingInstitue"></editable-input>
      </div>
      <div class="ticket-detail p-2">
        <span class="description-header ticket-sub-header">תיאור הפנייה</span>
        <editable-input v-bind:icon="'fa fa-pencil'" v-bind:valueChanged="updateTicketDescription"  v-bind:value="ticket.description"></editable-input>
      </div>
          <div class="start-location-details location-details">
            <div class="start-location-icon ticket-location-details-icon">
            <i class="fa fa-map-marker"></i>
            </div>
            <div class="ticket-location-details">
             <div class="ticket-sub-header">
              <span>איסוף</span>
            </div>
            <div class="ticket-pickup">
              <input-address v-bind:location-changed="changePickupLocation" v-bind:address="ticket.addressByStartAddressId"></input-address>
            </div>
            </div>
          </div>
          <div class="destination-location-details location-details">
          <div class="destination-location-icon ticket-location-details-icon">
            <i class="fa fa-compass"></i>
          </div>
          <div class="ticket-location-details">
            <div class="ticket-sub-header">
              <span>יעד</span>
            </div>
            <div class="ticket-destination">
              <input-address v-bind:location-changed="changeDestinationLocation" v-bind:address="ticket.addressByDestinationAddressId"></input-address>
            </div>
          </div>
          </div>
          <div class="end-location-details location-details">
              <div class="start-location-icon ticket-location-details-icon">
            <i class="fa fa-map-marker"></i>
            </div>
             <div class="ticket-location-details">
            <div class="ticket-sub-header">
              <span>נקודת סיום</span>
            </div>
            <div class="ticket-end">
              <input-address v-bind:location-changed="changeEndLocation" v-bind:address="ticket.addressByEndAddressId"></input-address>
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
  import { UPDATE_TICKET } from '../graphql/queries/ticket'
  import { UPDATE_ADDRESS } from '../graphql/queries/address'

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
          variables: {id: this.ticket.id, ticket: {"issuingInstitue": newIssuingInstitue}}
        });
      },
      updateTicketDescription: function(newDescription) {
        if (newDescription == this.ticket.description) {
            return;
        }
        this.$apollo.mutate({
          mutation: UPDATE_TICKET,
          variables: {id: this.ticket.id, ticket: {"description": newDescription}}
        })
      }
    }
  }
</script>

<style scoped>
  .ticket-preview {
    background-color: #e6eeff;
        height: 86vh;
  }

  .location-details{
      display: flex;
      flex-flow: row;
      margin: 11px 0px 0px 0px;
  }

  .ticket-location-details-icon {
    flex: 1 0 0;
    text-align: center;
    justify-content: center;
    align-self: center;
}

.ticket-location-details{
  flex: 7 0 0;
}

  .start-location-details {
    display: flex;
    flex-flow: row;
  }

  .ticket-sub-header {
    color: #888888;
  }

  .elder-tab-button, .ticket-tab-button, .volunteer-tab-button {
    border-bottom: solid 1px #3b3a30;
    border-top: none;
    display: inline-block;
    width: 30%;
    text-align: center;
    font-weight: 100;
    cursor: pointer;
    
  }

  .ticket-tab-button{
   border-right: solid 1px #9fa9a3;
   border-left: solid 1px #9fa9a3;

  }

  .volunteer-view {
    margin: 10px;
  }

  .ticket-tabs {
    margin-right: 0;
    display: flex;
  }

  .table-header{
    background-color: #3b3a30;
    color: white;
    height: 35px;
  }
  .ticket-detail{
    border-bottom: solid 1px #9fa9a3;
  }

  .icon-contract{
    position: absolute;
    top: 80px;
    left: 11px;
    color: #6699ff;
  }

</style>
