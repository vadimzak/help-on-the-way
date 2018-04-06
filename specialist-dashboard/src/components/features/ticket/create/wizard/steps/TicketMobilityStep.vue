<template>
  <div class="">

      <div class="elder-mobility">
          <h3 class="mobility-title">ניידות הזקן</h3>
          <p class="sub-title">ציין איך הזקן מתנייד ובעזרת מה הוא מסתייע</p>
            <div class="boxes-wrapper">
                <RadioBoxes v-model="elderMobility" :options="elderMobilityOptions"/>
            </div>
      </div>

        <div class="ticket-mobility">
          <h3 class="mobility-title">דרך ההתנייות בפנייה</h3>
          <p class="sub-title">איך הזקן והמתנדב יגיעו ממקום למקום</p>
            <div class="boxes-wrapper">
                <RadioBoxes v-model="transport" :options="ticketTransportTypes"/>
            </div>
      </div>
    <input type="hidden" v-model="checkCanContinue">
  </div>
</template>

<script>
import { mapStateForForm } from '@/store/utils'
import RadioBoxes from '@/components/inputs/RadioBoxes';
import ElderMobilityTypes from 'shared/constants/enums/ElderMobilityType'
import TicketTransportTypes from 'shared/constants/enums/TicketTransportType'

export default {
components: { RadioBoxes },
  mounted(){
    this.$emit('canContinue', !!this.elderMobility && !!this.transport);
  },
  data () {
    return {
      elderMobilityOptions: Object.values(ElderMobilityTypes),
      ticketTransportTypes: Object.values(TicketTransportTypes)
    }
  },
  computed: {
      ...mapStateForForm(['elderMobility', 'transport'], 'createTicket', 'ticket', 'createTicket/updateTicket'),
      checkCanContinue(){
        if(this.elderMobility && this.transport){
          this.$emit('canContinue', true)
        }
      }
  }
}
</script>

<style scoped>
</style>
