<template>
  <div>
    <WizardHeader/>
    <Step :current-step="currentStep" step="1"><SourceStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <Step :current-step="currentStep" step="2"><TicketDetailsStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <Step :current-step="currentStep" step="3"><TicketTimingStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <Step v-if="!this.ticket.isIndoor" :current-step="currentStep" step="4"><TicketRouteStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <Step :current-step="currentStep" step="5"><TicketSummaryStep @update="updateTicket"  @canContinue="setCanContinue"/></Step>
    <StepCard v-if="+currentStep !== 1 && +currentStep !== 5">
        <template slot="content">
          <StepNeedToKnowPoint :value="ticket.details.needToKnow" :step="currentStep" @input="setNeedToKnowPoints"/>
        </template>
    </StepCard>
    <footer class="my-5 d-flex justify-content-between">
        <b-btn @click="back" v-if="currentStep > 1">חזור אחורה</b-btn>
        <b-btn variant="primary" @click="saveAndAdvanceStep" :disabled="saveInProgress" v-if="canContinue && currentStep < lastStep">המשך</b-btn>
        <span class="d-flex" v-if="+currentStep === +lastStep">
          <b-btn variant="primary" @click="saveAndClose">שמור וסגור</b-btn>
          <Modal title="הפצת פנייה">
            <template slot="trigger"><b-btn class="mx-3" variant="success">הפץ פניה</b-btn></template>
            <template slot="modal"><AnnounceTicketForm></AnnounceTicketForm></template>
          </Modal>
        </span>
    </footer>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('createTicket')
import steps from './steps/'
import WizardHeader from './WizardHeader'
import  AnnounceTicketForm  from '@/components/features/ticket/AnnounceTicketForm'
import { Modal } from '@/components/base'
export default {
  data(){
    return {
      canContinue: false,
      lastStep: 5,
      saveInProgress: false
    }
  },
  components: { ...steps, WizardHeader, Modal, AnnounceTicketForm  },
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
          this.$store.commit('createTicket/nextStep')
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
           this.$router.push('/');
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
    ...mapMutations(['updateTicket', 'setNeedToKnowPoints']),
    setCanContinue(value){
      this.canContinue = value;
    }
  }  
}
</script>
