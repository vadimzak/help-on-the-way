<template>
  <div>
    <WizardHeader/>
    <Step :current-step="currentStep" step="1"><ChooseElderStep @update="updateTicket" @next="saveAndAdvanceStep" /></Step>
    <Step :current-step="currentStep" step="2"><SourceStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <Step :current-step="currentStep" step="3"><TicketTypeStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <Step :current-step="currentStep" step="4"><TicketDetailsStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <Step v-if="this.ticket.isIndoor" :current-step="currentStep" step="5"><TicketSummaryStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <Step v-if="!this.ticket.isIndoor" :current-step="currentStep" step="5"><TicketRouteSummaryStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <footer>
        <b-btn @click="back" v-if="currentStep > 1">חזור אחורה</b-btn>
        <b-btn @click="saveAndAdvanceStep"  v-if="canContinue">המשך</b-btn>
    </footer>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('createTicket')
import steps from './steps/'
import WizardHeader from './WizardHeader'
export default {
  data(){
    return {
      canContinue: false,
    }
  },
  components: {  ...steps, WizardHeader  },
  computed: {
      ...mapState(['currentStep', 'ticket'])
  },
  methods: {
    saveAndAdvanceStep(){
      this.$store.dispatch('createTicket/saveAndAdvanceStep');
      this.canContinue = false;
    },
    back(){
      this.canContinue = false;
      this.$store.commit('createTicket/goBackStep');
    },
    ...mapMutations(['updateTicket']),
    setCanContinue(value){
      this.canContinue = value;
    }
  }  
}
</script>
