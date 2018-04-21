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
    <div v-if="selectedView=='elderDetailsView'" class="ticket-details p-2">
      <div class="ticket-detail p-2">
        <span class="ticket-sub-header">שם: </span>
        <div>
          <span>{{ticket.elder.firstName}}</span> <span>{{ticket.elder.lastName}}</span>
        </div>
      </div>
      <div class="ticket-detail p-2">
        <span class="ticket-sub-header">כתובת: </span>
        <div>
          <span>{{ticket.elder.address.street}}</span>
          <span>{{ticket.elder.address.houseNumber}}</span>
        </div>
      </div>
    </div>
    <div v-if="selectedView=='ticketDetailsView'" class="ticket-details p-2">
      <div class="ticket-detail p-2">
        <span class="ticket-sub-header d-flex justify-content-between">
          <span>מספר פניה</span>
          <span class="small">התקבלה ביום {{ticket.createdAt | formatDate('localString')}}</span>
        </span>
        <div>
           {{ticket.id}}
        </div>
      </div>
      <div class="ticket-detail p-2">
        <span class="ticket-sub-header"> מבקש הפנייה</span>
        <div>
        <span v-if="ticket.issuingPerson">{{ticket.issuingPerson | formatName}} - {{ticket.issuingPerson.phoneNumber}}</span>
        <span v-else>עוד לא הוגדר</span>
        </div>
      </div>
      <div class="start-location-details ticket-detail p-2 location-details">
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
      <div class="destination-location-details ticket-detail p-2 location-details">
        <div class="destination-location-icon ticket-location-details-icon">
          <i class="material-icons flag-icon">flag</i>
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
      <div class="end-location-details ticket-detail p-2 location-details">
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
      <div class="ticket-detail p-2">
        <span class="description-header ticket-sub-header">נקודות חשובות</span>
        <ul v-if="ticket.details && ticket.details.needToKnow">
          <li v-for="(item, index) in ticket.details.needToKnow" :key="index">{{item.text ? item.text : item}}</li>
        </ul>
        <div v-else>
          לא הוגדרו נקודות
        </div>
      </div>
    </div>
    <div v-if="selectedView=='volunteerDetailsView'" class="ticket-details p-2">
      <div v-if="volunteer" class="volunteer-view">
        <div class="ticket-detail p-2">
          <span class="ticket-sub-header">שם המתנדב:</span>
          <div>
            <span>{{volunteer.firstName}}</span> <span>{{volunteer.lastName}}</span>
          </div>
        </div>
        <div class="ticket-detail p-2">
          <span class="ticket-sub-header">טלפון</span>
          <div>
            <span>{{volunteer.phoneNumber}}</span>
          </div>
        </div>
        <div v-if="volunteer.groups.nodes" class="ticket-detail p-2">
          <span class="ticket-sub-header">קבוצות:</span>
          <span v-for="(group,index) of volunteer.groups.nodes" :key="index">{{group.group.channels}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InputAddress from '@/components/InputAddress'
  import { UPDATE_TICKET, ALL_TICKETS_QUERY, VOLUNTEERS_BY_TICKET_ID } from '../graphql/queries/ticket'

  export default {
    components: {  InputAddress },
    data () {
      return {
        selectedView: 'ticketDetailsView',
        showEditableDescription: false,
        volunteer: undefined
      }
    },
    props: {
        ticket: Object
    },
    watch: {
      ticket: function(newValue) {
        this.getVolunteerDetails(newValue.id)
      }
    },
    computed: {
      startAddress: {
          get(){
              return this.ticket.startAddress;
          },
          set(value){
            this.updateTicket({ startAddressId: value.id });
          }
      },
      destinationAddress: {
          get(){
              return this.ticket.destinationAddress;
          },
          set(value){
            this.updateTicket({ destinationAddressId: value.id });
          },
      },
      endAddress: {
         get(){
              return this.ticket.endAddress;
          },
          set(value){
            this.updateTicket({ endAddressId: value.id });
          },
      },
    },
    methods: {
      changeView: function(view) {
        this.selectedView = view
        if (view == 'volunteerDetailsView') {
            this.getVolunteerDetails(this.ticket.id);
        }
      },
      getVolunteerDetails: function(ticketId) {
        let self = this;
        this.$apollo.query({
          query: VOLUNTEERS_BY_TICKET_ID,
          variables: {ticketId: ticketId}
        }).then(
          (result) => {
            self.volunteer = result.data.ticketById.volunteers.nodes[0] ?
              result.data.ticketById.volunteers.nodes[0].volunteer : undefined;
          }
        )
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
  .is-sticky .ticket-preview{
    position: absolute;
    width: 100%;
    top: 100px;
  }
  .ticket-preview {
    transition: all 2s ease 0s;
    background-color: #f4f4f4;
    font-family: 'Open Sans Hebrew'
  }

  .flag-icon{
    margin-right: -4px;
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
    font-size: 12px;
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
  .ticket-details{
    height: 60vh;
    overflow-y: scroll;
  }
  .ticket-detail{
    border-bottom: solid 1px #cfcfcf;
  }

  .ticket-detail i{
    font-size: 14px;
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
