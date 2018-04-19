<template>
  <StepCard>
      <template slot="header">זמנים</template>
      <template slot="content">
        <b-row>
            <b-col cols="12">
            <h5>זמן ביצוע מוערך</h5>
            </b-col>
            <b-col cols="12" class="justify-content-center d-flex">
            <DurationPicker v-model="durationEta"/>
            </b-col>
        </b-row>
        <b-row class="justify-content-center">
            <b-col cols="12">
            <h5>מועד הפנייה</h5>
            </b-col>
            <b-col cols="12" class="justify-content-center d-flex">
                    <DueDatePicker :value="ticket.dueDate" @input="(v) => $store.commit('createTicket/setTicketDueDate', v)" />
            </b-col>
        </b-row>      
        <b-row class="justify-content-center">
            <b-col cols="12">
            <h5>שעת התחלת פנייה</h5>
            </b-col>
            <b-col cols="12" class="justify-content-center d-flex">
                    <TimePicker :value="ticket.dueTime" @input="(v) => $store.commit('createTicket/setTicketDueTime', v)" class="mx-3" />
                    <FlexibleHourPicker :value="ticket.details.flexibleTime"  @input="(v) => $store.commit('createTicket/setTicketFlexibleTime', v)" />
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <h5>דברים שחשוב לדעת <span>(עד 30 תווים) </span></h5>
                <NeedToKnowPoints v-model="needToKnow"/>
            </b-col>
        </b-row>
        <input type="hidden" v-model="checkCanContinue">
    </template>
  </StepCard>
</template>
<script>
import _ from 'lodash';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import { DurationPicker, TimePicker } from '@/components/inputs'
import { FlexibleHourPicker, NeedToKnowPoints, DueDatePicker }  from '@/components/features/ticket/inputs'
import { mapStateForForm } from '@/store/utils'
import StepCard from './StepCard';

export default {
  components: { DurationPicker, NeedToKnowPoints, DueDatePicker, TimePicker, FlexibleHourPicker, StepCard },
  data() {
    return {}
  },
    computed: {
        ...mapStateForForm(['durationEta' ], 'createTicket', 'ticket', 'createTicket/updateTicket'),
        needToKnow: {
            get(){
                return this.ticket.details.needToKnow || [];   
            },
            set(val){
                this.setNeedToKnowPoints(val)
            }
        },
        checkCanContinue(){
            const hasTime = this.ticket.dueTime || this.ticket.details.flexibleTime
            if(this.durationEta && hasTime){
                this.$emit('canContinue', true);
            } else{
                this.$emit('canContinue', false);
            }
      },
      ...mapState('createTicket', ['ticket']),
  },
  methods: {
    ...mapMutations('createTicket', ['updateTicket', 'setNeedToKnowPoints'])
  }
}

</script>
