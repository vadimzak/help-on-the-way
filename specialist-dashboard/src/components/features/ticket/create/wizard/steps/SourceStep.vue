<template>
  <div>
      <h2>פתיחת פניה חדשה</h2>
      <p class="small">נא לבחור את מקור הפניה.</p>
      <RadioBoxes :value="ticketSource" @input="sourceChanged" :options="sources"/>
      <PersonAutoComplete @input="personChanged" :value="value" :personType="ticketSource" />
  </div>
</template>
<script>
import { RadioBoxes, PersonAutoComplete } from '@/components/inputs';
import PersonTypes from '@/constants/enums/PersonTypes';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('createTicket');
export default {
  components: { RadioBoxes, PersonAutoComplete },
  props: ['value'],
  mounted(){
        if(!this.ticket.issuingPerson){
          this.updateTicket({ issuingPerson: this.ticket.elder });
        }
        this.$emit('canContinue', true);
  },
  data() {
    return {
      sources: [
      { text: 'זקן', 'icon': 'd-icon-old-man', value: PersonTypes.elder },
      { text: 'עו״ס', 'icon': 'd-icon-prayer', value: PersonTypes.socialWorker },
      { text: 'מתנדב', 'icon': 'd-icon-help-2', value: PersonTypes.volunteer },
      { text: 'קרוב משפחה', 'icon': 'd-icon-family', value: PersonTypes.relative },
      { text: 'אחר', 'icon': { class: 'material-icons', content: 'more' }, value: 'other' },
    ],
    ticketSource: this.value || PersonTypes.elder,
  }
  },
    computed: {
      ...mapState(['ticket']),
  },
  methods: {
    updateValue(value){
      this.$emit('input', value);
    },
    sourceChanged(value){
      // TODO - implement the ability to chose other person types
      if(value === 'elder'){
        const elder = this.ticket.elder || this.value;
        this.updateTicket({ issuingPerson: elder });
        }  else {
           this.updateTicket({ issuingPerson: this.value });
        }
          if(value !== 'other'){
              this.updateValue(value);
          } else{
            this.updateValue(null);
          }
          this.ticketSource = value;
          this.$emit('canContinue', !!this.ticket.issuingPerson);
    },
    personChanged(value) {
      if (value) {
        this.updateTicket({ issuingPerson: value });
        // this.value = value;
        this.$emit('canContinue', !!this.ticket.issuingPerson);        
      }
    },
    ...mapMutations(['updateTicket'])
  }
}
</script>
