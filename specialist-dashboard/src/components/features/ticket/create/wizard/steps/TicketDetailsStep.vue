<template>
  <div>
      <b-row>
        <b-col cols="12">
        <h3>פרטים נוספים</h3>
        <p class="small">הזן פרטים נוספים הנחוצים למתנדב על מנת לבצע את הפניה.</p>
        </b-col>
        <b-col cols="12" class="justify-content-center d-flex">
            <textarea v-model="description" class="w-100"></textarea>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
        <h4>זמן ביצוע מוערך</h4>
        </b-col>
        <b-col cols="12" class="justify-content-center d-flex">
           <DurationPicker v-model="durationEta"/>
        </b-col>
      </b-row>
  </div>
</template>
<script>
import _ from 'lodash';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import DurationPicker from '@/components/inputs/DurationPicker'
export default {
  components: { DurationPicker },
  data() {
    return {}
  },
    computed: {
        durationEta: {
            get(){
                return this.ticket.details.description;
            },
            set(val){
                this.$emit('canContinue', !!val);
                this.updateTicket({ durationEta: val })
            }
        },
        description: {
            get(){
                return this.ticket.details.description;
            },
            set(val){
                this.updateTicket({ details: {
                    description: val,
                } });
            }
        },
      ...mapState('createTicket', ['ticket']),
  },
  methods: {
    ...mapMutations('createTicket', ['updateTicket'])
  }
}

</script>
