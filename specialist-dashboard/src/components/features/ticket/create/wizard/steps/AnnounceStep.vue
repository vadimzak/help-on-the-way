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
            <b-btn :disabled="!canSendMessages.canSend" @click="sendMessages" id="announceToGroups">שלח</b-btn>
            <p v-show="!isMessagesAvilable" class="text-danger small">נראה שאינך מחובר לווטסאפ במערכת זאת.</p>
            <p v-show="canSendMessages.isMessagesAvilable && !canSendMessages.haveGropus" class="text-danger small">עליך לבחור קבוצות לשליחת ההודעה</p>
            <p v-show="canSendMessages.isMessagesAvilable && !canSendMessages.validStatus" class="text-danger small">לא ניתן לפרסם הודעה כשסטטוס הכרטיס אינו ממתין למתנדבים.</p>
        </b-col>
      </b-row>
      <b-row class="my-5">
        <b-col cols="12">
          <b-form-group label="סטוס פנייה">
          <TicketStatusSelect v-model="status" />          
          </b-form-group>
        </b-col>
      </b-row>
  </div>
</template>
<script>
import TicketGroupPicker from '../../../TicketGroupPicker';
import GroupMessagePreview from '../../../GroupMessagePreview';
import TicketStatusSelect from '@/components/inputs/TicketStatusSelect';
import { mapStateForForm } from '@/store/utils';
import { mapState } from 'vuex'
import { TicketStatus} from "@/constants/enums";

export default {
  components: { TicketGroupPicker, GroupMessagePreview, TicketStatusSelect },
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
        canSendMessages(){
            const messagingAvilable = this.isMessagesAvilable
            const haveGroups = !!(this.groups || []).length
            const validStatus = this.status === TicketStatus.open.value 
            return {
              haveGroups,
              validStatus,
              messagingAvilable,
              canSend: messagingAvilable && haveGroups && validStatus
            }
        },
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
