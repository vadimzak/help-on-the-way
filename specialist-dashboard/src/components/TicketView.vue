<template>
  <div v-if="ticket" class="ticket-preview">
    <div class="ticket-tabs">
      <div v-bind:class="{'active': selectedView =='elderDetailsView'}" v-on:click="changeView('elderDetailsView')" class="col p-2 elder-tab-button">
        <span>פרטי הזקן</span>
      </div>
      <div v-bind:class="{'active': selectedView == 'ticketDetailsView'}" v-on:click="changeView('ticketDetailsView')" class="col p-2 ticket-tab-button">
        <span>פרטי הפנייה</span>
      </div>
      <div v-bind:class="{'active': selectedView == 'volunteerDetailsView'}" v-on:click="changeView('volunteerDetailsView')" class="col p-2 volunteer-tab-button">
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
    <div v-if="selectedView=='ticketDetailsView'" class="ticket-details p-4">
      <div class="ticket-detail p-4">
        <span class="ticket-sub-header">מספר פניה</span>
        <div>
           {{ticket.id}}
        </div>
      </div>
      <div class="ticket-detail p-4">
        <span class="ticket-sub-header"> נפתח על ידי</span>
        <editable-input v-bind:icon="'fa fa-pencil'" v-bind:valueChanged="updateTicketIssuingInstitue"  v-bind:value="ticket.issuingInstitue"></editable-input>
      </div>
      <div class="ticket-detail p-4">
        <span class="description-header ticket-sub-header">תיאור הפנייה</span>
        <editable-input v-bind:icon="'fa fa-pencil'" v-bind:valueChanged="updateTicketDescription"  v-bind:value="ticket.description"></editable-input>
      </div>
          <div class="start-location-details ticket-detail p-4 location-details">
            <div class="start-location-icon ticket-location-details-icon">
            <i class="fa fa-map-marker"></i>
            </div>
            <div class="ticket-location-details">
             <div class="ticket-sub-header">
              <span>איסוף</span>
            </div>
            <div class="ticket-pickup">
              <input-address  v-model="startAddress"></input-address>
            </div>
            </div>
            </div>
          <div class="destination-location-details ticket-detail p-4 location-details">
          <div class="destination-location-icon ticket-location-details-icon">
            <i class="fa fa-compass"></i>
          </div>
          <div class="ticket-location-details">
            <div class="ticket-sub-header">
              <span>יעד</span>
            </div>
            <div class="ticket-destination">
              <input-address  v-model="destinationAddress"></input-address>
            </div>
          </div>
          </div>
          <div class="end-location-details ticket-detail p-4 location-details">
              <div class="start-location-icon ticket-location-details-icon">
            <i class="fa fa-map-marker"></i>
            </div>
             <div class="ticket-location-details">
            <div class="ticket-sub-header">
              <span>נקודת סיום</span>
            </div>
            <div class="ticket-end">
              <input-address v-model="endAddress"></input-address>
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

  </div>
</template>

<script>
  import InputAddress from '@/components/InputAddress'
  import EditableInput from '@/components/EditableInput'
  import { UPDATE_TICKET, ALL_TICKETS_QUERY } from '../graphql/queries/ticket'

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
    computed: {
      startAddress: {
          get(){
              return this.ticket.addressByStartAddressId;
          },
          set(value){
            this.updateTicket({ startAddressId: value.id });
          }
      },
      destinationAddress: {
          get(){
              return this.ticket.addressByDestinationAddressId;
          },
          set(value){
            this.updateTicket({ destinationAddressId: value.id });
          },
      },
      endAddress: {
         get(){
              return this.ticket.addressByEndAddressId;
          },
          set(value){
            this.updateTicket({ endAddressId: value.id });
          },
      },
    },
    methods: {
      changeView: function(view) {
          this.selectedView = view
      },
      showEditDescription: function() {
        this.showEditableDescription = true;
      },
      updateTicket(update){
        this.$apollo.mutate({
          mutation: UPDATE_TICKET,
          variables: {id: this.ticket.id, ticket: update },
          update: (store) => {
            const allTicketsQueryResult = store.readQuery({ query: ALL_TICKETS_QUERY })
            const tickets = allTicketsQueryResult.allTickets.nodes
            const currentTicketId = tickets.findIndex( t => t.id === this.ticket.id)
            if(currentTicketId > -1){
              Object.assign(tickets[currentTicketId], update)
            }
            store.writeQuery({ 
              query: ALL_TICKETS_QUERY, 
              data: allTicketsQueryResult,
              })
          }
        });
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
    background-color: #f4f4f4;
    font-family: 'Open Sans Hebrew'
  }

  .location-details{
      display: flex;
      flex-flow: row;
      margin: 11px 0px 0px 0px;
  }

  .ticket-location-details-icon {
    flex: 1 0 0;
    justify-content: center;
}

.ticket-location-details{
  flex: 12 0 0;
}

  .start-location-details {
    display: flex;
    flex-flow: row;
  }

  .ticket-sub-header {
    color: #888888;
  }

  .elder-tab-button, .ticket-tab-button, .volunteer-tab-button {
    text-align: center;
    cursor: pointer;
    
  }

  .volunteer-view {
    margin: 10px;
  }

  .ticket-tabs {
    margin-right: 0;
    display: flex;
    height: 35px;
    background-color: #ffffff;
     }

     .ticket-tabs .active{
       background-color: #f4f4f4;
     }

  .table-header{
    background-color: #3b3a30;
    color: white;
    height: 35px;
  }
  .ticket-detail{
    border-bottom: solid 1px #cfcfcf;
  }

  .ticket-detail i{
    font-size:23px;
    text-align: right;
    color: #888888;    
  }

  .icon-contract{
    position: absolute;
    top: 80px;
    left: 11px;
    color: #6699ff;
  }

</style>
