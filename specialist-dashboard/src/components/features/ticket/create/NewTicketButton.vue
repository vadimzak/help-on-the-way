<template>
<div class="col">
    <FloatingScreen :isOpen="!!ticket" @close="() => setActiveTicket(undefined)" target="ticket-btn">
      <TicketWizard v-if="ticket"></TicketWizard>
    </FloatingScreen>
    <div id="ticket-btn" @click="newTicket" class="ticket-btn p-4 h4"> + פניה חדשה</div>
</div>
</template>

<script>
import TicketWizard from './wizard/TicketWizard';
import FloatingScreen from '@/components/layout/FloatingScreen';
import {mapMutations, mapState} from 'vuex'
export default {
  components: {TicketWizard, FloatingScreen},
  methods: { ...mapMutations('createTicket', ['newTicket', 'setActiveTicket'])},
  computed: { ...mapState('createTicket', ['ticket'])}
  }
</script>

<style scoped>
.ticket-btn{
  width: 250px;
  border-radius: 1px;
  background-color: #299dff;
  box-shadow: 0px 5px 14.9px 1.1px rgba(142, 142, 142, 0.26);
  font-family:  'Open Sans Hebrew';
  font-size: 30px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
}

</style>