<template>
  <div>
    <b-row>
      <b-col cols="12">
        <h3>נוסח הההודעה</h3>
        <p class="small">קרא וערוך את הודעת ה WhatsApp במידת הצורך.</p>
        <GroupMessage v-model="messageText" :ticket="ticket" />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <h3>למי תישלח הפנייה?</h3>
        <p class="small">עבור קבוצות המתנדבים מטה, תישלח הודעת WhatsApp עם לינק לפרטי הפניה.</p>
      </b-col>
      <b-col cols="12">
        <GroupPicker v-model="groups" :ticketId="ticket.id" />
      </b-col>
    </b-row>
    <b-row class="my-5">
      <b-col cols="12">
        <b-btn :disabled="!canSendMessages.canSend" @click="sendMessages" id="announceToGroups">שלח</b-btn>
        <p v-show="!canSendMessages.messagingAvilable" class="text-danger small">נראה שאינך מחובר לווטסאפ במערכת זאת.</p>
        <p v-show="canSendMessages.messagingAvilable && !canSendMessages.haveGroups" class="text-danger small">עליך לבחור קבוצות לשליחת ההודעה</p>
      </b-col>
    </b-row>
    <b-row class="my-5">
      <b-col cols="12">
        <b-form-group label="סטוס פנייה">
          <StatusSelect v-model="status" />
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>
<script>

import {GroupPicker, GroupMessage, StatusSelect } from '@/components/features/ticket/inputs';
import { mapStateForForm } from '@/store/utils';
import { mapState } from 'vuex'
import { TicketStatus} from "@/constants/enums";

export default {
  components: { GroupPicker, GroupMessage, StatusSelect },
  data() {
    return {
      messageText: '',
    }
  },
    computed: {
        ...mapState('messages', ['isMessagesAvilable']),
        ...mapState('createTicket', ['ticket']),
        ...mapStateForForm(['status'], 'createTicket', 'ticket', 'createTicket/updateTicket'),
        ...mapStateForForm(['groups'], 'createTicket', 'ticket', 'createTicket/setTicketGroups'),
        canSendMessages() {
          const messagingAvilable = this.isMessagesAvilable
          const haveGroups = !!(this.groups || []).length
          return {
            haveGroups,
            messagingAvilable,
            canSend: messagingAvilable && haveGroups
          }
        },

    },
    methods: {
      async sendMessages() {
        const ticket = this.ticket
        const isNotOpen = ticket.status !== TicketStatus.open.value;
        if (isNotOpen) {
          const updateStatusResult = await this.$store.dispatch('createTicket/updateTicketStatus', {
            id: ticket.id,
            status: TicketStatus.open.value
          });
        }
        const result = await this.$store.dispatch('messages/sendMessageToGroups', {
          groups: ticket.groups,
          ticketId: ticket.id,
          message: this.messageText
        })
      }
    }

  }
</script>
