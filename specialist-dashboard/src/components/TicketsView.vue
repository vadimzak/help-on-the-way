<template>
  <div class="row">
    <div class="col-xs-6 tickets-list">
        <ticket-table v-bind:selected-ticket="selectedTicket" v-bind:tickets="ticketsList" v-bind:on-ticket-clicked="onTicketSelect"></ticket-table>
    </div>
    <div class="col-xs-6 ticket-view">
      <ticket-view v-bind:ticket="selectedTicket"></ticket-view>
    </div>
  </div>
</template>

<script>
import TicketTable from '@/components/TicketTable'
import TicketView from '@/components/TicketView'

export default {
  components: {  TicketTable, TicketView },
  data () {
    return {
      ticketsList: [
        {
          id: 133123123123,
          name: 'eldder1',
          contactDetails: {
            cellPhone: '0545555555',
            phoneNumber: '033344567'
          },
          ticketType: {
              name: 'ליווי רפואי - הלוך ושוב',
              icon: ''
          },
          description: 'ברכה בת 78 צריכה להגיע לביקורת אצל הרופא משפחה שלה וחזרה הביתה. צריכה ליווי ברכב (פרטי שלי אך אינה יכולה לנהוג) זמינה רק בטלפון קווי',
          preliminaryApproval: true,
          rootDescription: {
              pickup: 'בית הזקןת נחמני 12 תל אביב',
              dropOff: 'בית הזקןת נחמני 12 תל אביב',
              operationLocation: 'מרפאת אהרונובת שדרות חן 32 תל אביב'
          },
          eta: {
            specificDate: {
              day: '08/01/2018',
              timeRange: {
                start: '16:30',
                end: '18:00'
              }
            }
          }
        },
        {
          id: 32344234234234,
          name: 'eldder2',
          contactDetails: {
            cellPhone: '0545555555',
            phoneNumber: '033344567'
          },
          description: 'ברכה בת 78 צריכה להגיע לביקורת אצל הרופא משפחה שלה וחזרה הביתה. צריכה ליווי ברכב (פרטי שלי אך אינה יכולה לנהוג) זמינה רק בטלפון קווי',
          preliminaryApproval: true,
          rootDescription: {
            pickup: 'בית הזקןת נחמני 12 תל אביב',
            dropOff: 'בית הזקןת נחמני 12 תל אביב',
            operationLocation: 'מרפאת אהרונובת שדרות חן 32 תל אביב'
          },
          ticketType: {
            name: 'ליווי רפואי - הלוך ושוב',
            icon: ''
          },
          eta: {
            specificDate: {
              day: '08/01/2018',
              specificTime: '15:30'
            }
          }
        },
        {
          id: 234234234234234,
          name: 'eldder3',
          contactDetails: {
            cellPhone: '0545555555',
            phoneNumber: '033344567'
          },
          description: 'ברכה בת 78 צריכה להגיע לביקורת אצל הרופא משפחה שלה וחזרה הביתה. צריכה ליווי ברכב (פרטי שלי אך אינה יכולה לנהוג) זמינה רק בטלפון קווי',
          preliminaryApproval: true,
          rootDescription: {
            pickup: 'בית הזקןת נחמני 12 תל אביב',
            dropOff: 'בית הזקןת נחמני 12 תל אביב',
            operationLocation: 'מרפאת אהרונובת שדרות חן 32 תל אביב'
          },
          ticketType: {
            name: 'ליווי רפואי - הלוך ושוב',
            icon: ''
          },
          eta: {
            asap: true
          }
        },
        {
          id: 234234234234,
          name: 'eldder4',
          contactDetails: {
            cellPhone: '0545555555',
            phoneNumber: '033344567'
          },
          description: 'ברכה בת 78 צריכה להגיע לביקורת אצל הרופא משפחה שלה וחזרה הביתה. צריכה ליווי ברכב (פרטי שלי אך אינה יכולה לנהוג) זמינה רק בטלפון קווי',
          preliminaryApproval: true,
          rootDescription: {
            pickup: 'בית הזקןת נחמני 12 תל אביב',
            dropOff: 'בית הזקןת נחמני 12 תל אביב',
            operationLocation: 'מרפאת אהרונובת שדרות חן 32 תל אביב'
          },
          ticketType: {
            name: 'ליווי רפואי - הלוך ושוב',
            icon: ''
          },
          eta: {
            specificDate: {
              day: '08/01/2018',
              timeRange: {
                start: '16:30',
                end: '18:00'
              }
            }
          }
        }
      ],
      selectedTicket: {}
    }
  },
  methods: {
      onTicketSelect: function(ticket) {
          this.selectedTicket = ticket
      }
  },
  created() {
      this.selectedTicket = this.ticketsList[0];
  }
}
</script>

<style scoped>
  .tickets-list {
    padding-left: 0;
  }
  .ticket-view {
    padding-right: 0;
  }
</style>
