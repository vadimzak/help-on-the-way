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
        if(!this.ticket.issuingPerson){
          this.updateTicket({ issuingPerson: this.ticket.elder });
        }
        this.$emit('canContinue', true);
  },
  data() {
    return {
      sources: [
      { text: 'זקן', 'icon': 'd-icon-old-man', value: 'elder' },
      { text: 'עו״ס', 'icon': 'd-icon-prayer', value: 'social_worker' },
      { text: 'מתנדב', 'icon': 'd-icon-help-2', value: 'volunteer' },
      { text: 'קרוב משפחה', 'icon': 'd-icon-family', value: 'relative' },
      { text: 'אחר', 'icon': { class: 'material-icons', content: 'more' }, value: 'other' },
    ],
  }
  },
    computed: {
      ...mapState(['ticket']),
  },
  methods: {
    sourceChanged(value){
      // TODO - implement the ability to chose other person types
      if(value === 'elder'){
        const elder = this.ticket.elder;
        this.updateTicket({ issuingPerson: elder });
        }  else {
           this.updateTicket({ issuingPerson: null });
        }
        this.$emit('canContinue', !!this.ticket.issuingPerson);
    },
    ...mapMutations(['updateTicket'])
  }
}
</script>
