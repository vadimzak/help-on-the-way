<template>
  <div>
      <b-row>
        <b-col cols="12">
        <h3>סיכום הפניה</h3>
        <p class="small">צפה בפרטי הפניה וודא כי הם נכונים טרם שליחה.</p>
        </b-col>
      </b-row>
      <b-row>
          <b-col cols="12">
              <h4>תיאור הפניה</h4>
          </b-col>
          <b-col cols="12">
              <p>{{ticket.details.description || 'אין'}}</p>
          </b-col>
      </b-row>
      <b-row>
          <b-col cols="12">
              <h4>כתובת</h4>
          </b-col>
          <b-col cols="12">
              <TicketAddress/>
          </b-col>
      </b-row>      
  </div>
</template>
<script>
import TicketAddress from '../../TicketAddress';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
export default {
  mounted(){
      this.$emit('canContinue', true)
  },
  components: { TicketAddress },
  data() {
    return {}
  },
    computed: {
      ...mapState('createTicket', ['ticket']),
  },
  methods: {
    ...mapMutations('createTicket', ['updateTicket'])
  }
}

</script>
