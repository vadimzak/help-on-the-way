<template>
  <div>
      <b-row>
        <b-col cols="12">
        <h3>נוסח הההודעה</h3>
        <p class="small">קרא וערוך את הודעת ה WhatsApp במידת הצורך.</p>
        <GroupMessagePreview :ticket="ticket" />
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
    return {}
  },
    computed: {
        ...mapState('createTicket', ['ticket']),
        ...mapStateForForm(['groups'], 'createTicket', 'ticket', 'createTicket/setTicketGroups')
    }
  }
</script>
