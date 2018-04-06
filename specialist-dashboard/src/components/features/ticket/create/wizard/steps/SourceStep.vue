<template>
  <div>
      <h2>פתיחת פניה חדשה</h2>
      <p class="small">נא לבחור את מקור הפניה.</p>
      <RadioBoxes :value="'elder'" @input="sourceChanged" :options="sources"/>
  </div>
</template>
<script>
import RadioBoxes from '@/components/inputs/RadioBoxes';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('createTicket');
export default {
  components: { RadioBoxes },
  mounted(){
        this.$emit('canContinue', !!this.ticket.issuingPerson);
  },
  data() {
    return {
      sources: [
      { text: 'זקן', 'icon': 'old-man-with-cane', value: 'elder' },
      { text: 'עו״ס', 'icon': 'prayer', value: 'social_worker' },
      { text: 'מתנדב', 'icon': 'human-resources', value: 'volunteer' },
      { text: 'קרוב משפחה', 'icon': 'family-group-of-father-and-mother-with-two-babies-and-a-dog', value: 'relative' },
      { text: 'אחר', 'icon': '', value: 'other' },
    ],
  }
  },
    computed: {
      ...mapState(['ticket'])
  },
  methods: {
    sourceChanged(value){
      if(value === 'elder'){
        const elder = this.ticket.elder;
        this.updateTicketSource(value);
        this.updateTicket({ issuingPerson: elder });
        this.$emit('canContinue', true);
      }
    },
    ...mapMutations(['updateTicket', 'updateTicketSource'])
  }
}
</script>
