<template>
  <div>
    <Step :current-step="currentStep" step="1"><ChooseElderStep @update="updateTicket" @next="saveAndAdvanceStep" /></Step>
    <Step :current-step="currentStep" step="2"><SourceSteps @update="updateTicket"  @next="saveAndAdvanceStep"/></Step>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('createTicket')

import SourceSteps from './SourceStep'
import ChooseElderStep from './ChooseElderStep'
import Step from './Step'
export default {
  components: { SourceSteps, ChooseElderStep, Step },
  computed: {
      ...mapState(['currentStep', 'ticket'])
  },
  methods: {
    ...mapActions(['saveAndAdvanceStep']),
    ...mapMutations(['updateTicket']),
  }  
}
</script>
