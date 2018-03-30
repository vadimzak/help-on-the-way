<template>
  <div>
      <b-row>
        <b-col cols="12">
        <h3>נוסח הההודעה</h3>
        <p class="small">קרא וערוך את הודעת ה WhatsApp במידת הצורך.</p>
        <GroupMessagePreview v-model="messageText" :ticket="ticket" />
        </b-col>
      </b-row>
      <b-row>
          <b-col cols="12">
            <h3>למי תישלח הפנייה?</h3>
            <p class="small">עבור קבוצות המתנדבים מטה, תישלח הודעת WhatsApp עם לינק לפרטי הפניה.</p>
          </b-col>
          <b-col cols="12">
              <TicketGroupPicker v-model="groups" :ticketId="ticket.id" />
          </b-col>
      </b-row>   
      <b-row class="my-5">
        <b-col cols="12">
            <b-btn :disabled="!isMessagesAvilable" @click="sendMessages" id="announceToGroups">שלח</b-btn>
            <p v-show="!isMessagesAvilable" class="text-danger small">נראה שאינך מחובר לווטסאפ במערכת זאת.</p>
            <p v-show="isMessagesAvilable && !groups.length" class="text-danger small">עליך לבחור קבוצות לשליחת ההודעה</p>
        </b-col>
      </b-row>
  </div>
</template>
<script>
import TicketGroupPicker from '../../../TicketGroupPicker';
import GroupMessagePreview from '../../../GroupMessagePreview';
import { mapStateForForm } from '@/store/utils';
import { mapState } from 'vuex'
export default {
  mounted(){
      this.$emit('canContinue', true)
  },
  components: { TicketGroupPicker, GroupMessagePreview },
  data() {
    return {
      messageText: '',
    }
  },
    computed: {
        ...mapState('messages', ['isMessagesAvilable']),
        ...mapState('createTicket', ['ticket']),
        ...mapStateForForm(['groups'], 'createTicket', 'ticket', 'createTicket/setTicketGroups'),
    },
    methods: {
      async sendMessages(){
        const ticket = this.ticket
        const result = await this.$store.dispatch('messages/sendMessageToGroups', { 
          groups: ticket.groups,
          ticketId: ticket.id,
          message: this.messageText
           })
      }
    }
  }
</script>
