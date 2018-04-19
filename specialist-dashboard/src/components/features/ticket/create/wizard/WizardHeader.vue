<template>
  <div class="my-4 d-flex align-items-start steps-bar">
        <StepCube :heading="ticket.elder | formatName"  :subheading="ticket.elder.address | formatAddress"/>
        <StepCube emptyheading="פרטי הפניה" :heading="ticket.category| formatCategory" step="2" :subheading="detailsStepSubheading"/>
        <StepCube emptyheading="מועד הפניה" :heading="timingStepHeding" step="3" :subheading="ticket | formatTicketTime"/>
        <StepCube emptyheading="מסלול הפניה" :heading="ticket.transport | formatTransport" step="4" :disabled="ticket.isIndoor" :subheading="ticket.elderMobility | formatElderMobility"/>
        <StepCube emptyheading="סיכום" step="5" />
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import StepCube from './WizardHeaderCube';
export default {
  components: {  StepCube },
  data() {
    return {}
  },
    computed: {
        detailsStepSubheading(){
            const ticket = this.ticket
            const subcat = ticket.subCategory
            const destenation = ticket.details.destinationAddressAlias
            if(subcat){
                return this.$options.filters.formatSubCategory(subcat)
            } 
            if(destenation && !ticket.isIndoor){
                return destenation
            }
            return ticket.details.subject

        },
        timingStepHeding(){
            const ticket = this.ticket
            const hasTime = ticket.dueTime || ticket.details.flexibleTime;
            if(hasTime){
                return this.$options.filters.formatDate(ticket.dueDate, 'יום dddd DD.M')
            }
        },
      ...mapState('createTicket', ['ticket']),
  },
  methods: {
    ...mapMutations('createTicket', ['updateTicket'])
  }
}

</script>
<style scoped>
    .steps-bar{
        margin: -0.5rem;
    }

</style>
