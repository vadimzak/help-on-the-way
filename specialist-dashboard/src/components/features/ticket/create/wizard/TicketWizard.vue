<template>
  <div>
    <WizardHeader/>
    <Step :current-step="currentStep" step="1"><ChooseElderStep @update="updateTicket" @next="saveAndAdvanceStep" /></Step>
    <Step :current-step="currentStep" step="2"><SourceStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <Step :current-step="currentStep" step="3"><TicketTypeStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <Step :current-step="currentStep" step="4"><TicketDetailsStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <Step v-if="this.ticket.isIndoor" :current-step="currentStep" step="5"><TicketSummaryStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <Step v-if="!this.ticket.isIndoor" :current-step="currentStep" step="5"><TicketRouteSummaryStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <Step :current-step="currentStep" step="6"><AnnounceStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <footer>
        <b-btn @click="back" v-if="currentStep > 1">חזור אחורה</b-btn>
        <b-btn @click="saveAndAdvanceStep" :disabled="saveInProgress" v-if="canContinue">המשך</b-btn>
        <b-btn @click="saveAndClose"  v-if="currentStep === lastStep">שמור וסגור</b-btn>
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
      lastStep: 6,
      saveInProgress: false
    }
  },
  components: {  ...steps, WizardHeader  },
  computed: {
      ...mapState(['currentStep', 'ticket'])
  },
  methods: {
    async saveAndAdvanceStep(){
      if(this.saveInProgress){
        return
      }
      this.saveInProgress = true
      try {
          await this.$store.dispatch('createTicket/saveCurrentTicket');
          this.$store.commit('createTicket/moveStep')
          this.canContinue = false;
      } catch (error) {
          // tood manage error handling
          throw error
      }finally{
          this.saveInProgress = false
      }

    },
    async saveAndClose(){
      this.saveInProgress = true
      try {
          await this.$store.dispatch('createTicket/saveCurrentTicket');
           this.$store.commit('createTicket/setActiveTicket', null)
      } catch (error) {
          // tood manage error handling
          throw error
      } finally{
              this.saveInProgress = false
      }
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
