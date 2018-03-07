<template>
  <div>
      <b-row>
        <b-col cols="12">
        <h3>פרטי הפניה</h3>
        <p class="small">הזן את פרטי הפניה המבוקשת.</p>
        </b-col>
        <b-col cols="12" class="justify-content-center d-flex">
            <RadioBoxes :value="ticket.isIndoor" @input="(val) => this.updateIndoorStatus(val)" :options="isIndoorBoxes"/>
        </b-col>
      </b-row>
      <b-row>
          <b-col cols="12" class="justify-content-start d-flex">
            <label>
                <input type="checkbox"
                    v-model="isUrgent"
                    aria-label="Checkbox for is the ticket urgent"/>
                    פנייה דחופה
            </label>
          </b-col>
      </b-row>
      <b-row v-show="ticket.isIndoor !== undefined">
            <b-col cols="12" class="justify-content-between d-flex">
            <h6 class="">סוג הפניה</h6>
        </b-col>
        <b-col cols="12">
            <hr>
        </b-col>
        <b-col cols="12" class="justify-content-center d-flex">
            <RadioBoxes class="indoor" v-if="ticket.isIndoor === true" :value="ticket.category" @input="(val) => updateTicket({category: val, subcategory: null})" :options="indoorCategories"/>
            <RadioBoxes class="outdoor" v-if="ticket.isIndoor === false" :value="ticket.category" @input="(val) => updateTicket({category: val, subcategory: null})" :options="outdoorCategories"/>
        </b-col>     
      </b-row>
      <b-row v-if="categories[ticket.category] && categories[ticket.category].subCategories.length">
            <b-col cols="12" class="justify-content-between d-flex">
            <h6 class="">תת סוג</h6>
        </b-col>
        <b-col cols="12">
            <hr>
        </b-col>
        <b-col cols="12" class="justify-content-center d-flex">
            <RadioBoxes  :value="ticket.subcategory" @input="(val) => updateTicket({subcategory: val})" :options="categories[ticket.category].subCategories"/>
        </b-col>     
      </b-row>      
      <b-row>
          <input type="hidden" :value="canContinueSep"/>
      </b-row>
  </div>
</template>
<script>
import _ from 'lodash';
import RadioBoxes from '@/components/inputs/RadioBoxes';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
export default {
  components: { RadioBoxes },
  data() {
    return {
      isIndoorBoxes: indoorBoxes(),
      updateIndoorStatus(value){
            const ticket = this.ticket;
            this.updateTicket({isIndoor: value, startAddress: ticket.elder.address })
        },
    }
  },
    computed: {
        canContinueSep: function() {
            const ticket = this.ticket;
            const categories = this.categories;
            const canContinue = !_.isUndefined(ticket.isIndoor) && ticket.category && (!categories[ticket.category].subCategories.length || ticket.subcategory);
            this.$emit('canContinue', canContinue)
        },
        isUrgent: {
            get(){
                return this.ticket.isUrgent;
            },
            set(val){
                this.updateTicket({ isUrgent: val });
            }
        },
      ...mapState('createTicket', ['ticketSource', 'ticket']),
      ...mapState('categories', ['categories']),
      ...mapGetters('categories', ['indoorCategories', 'outdoorCategories'])
  },
  methods: {
    ...mapMutations('createTicket', ['updateTicket'])
  }
}

function indoorBoxes(){
return [
      { text: 'בתוך הבית', value: true },
      { text: 'מחוץ לבית', value: false },
    ];
}
</script>
