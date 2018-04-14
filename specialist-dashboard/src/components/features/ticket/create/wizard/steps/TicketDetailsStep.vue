<template>
  <div>
      <b-row v-if="!this.ticket.isIndoor">
        <b-col cols="12">
        <h5>לאן</h5>
        </b-col>
        <b-col cols="12" class="justify-content-center d-flex">
        <label for="destinationAlias">שם/סוג המקום:</label>
        <b-form-input
                   class="align-self-start"
                  id="destinationAlias"
                  v-model.trim="destinationAlias"
                  type="text"
                  placeholder="שם המקום"/>
           <InputAddress class="w-100" :keepOpen="true" name="address" v-validate="'address'" v-model="destinationAddress"/>
        </b-col>
      </b-row>
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
        <h3>פרטים נוספים</h3>
        <p class="small">הזן פרטים נוספים הנחוצים למתנדב על מנת לבצע את הפניה.</p>
        </b-col>
        <b-col cols="12">
            <b-form-group
                :description="ticket | formatTicketTitle"
                label="נושא הפנייה"
                label-for="ticketSubject">
                 <b-form-input id="ticketSubject"  v-model.trim="subject"></b-form-input>
            </b-form-group>
        </b-col>
        <b-col cols="12">
            <h5>דברים שחשוב לדעת <span>(עד 30 תווים) </span></h5>
            <NeedToKnowPoints v-model="needToKnow"/>
        </b-col>
      </b-row>
    <input type="hidden" v-model="checkCanContinue">
  </div>
</template>
<script>
import _ from 'lodash';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import { DurationPicker, TimePicker } from '@/components/inputs'
import InputAddress from '@/components/InputAddress'
import { FlexibleHourPicker, NeedToKnowPoints, DueDatePicker }  from '@/components/features/ticket/inputs'
import { mapStateForForm } from '@/store/utils'

export default {
  components: { DurationPicker, InputAddress, NeedToKnowPoints, DueDatePicker, TimePicker, FlexibleHourPicker },
  data() {
    return {}
  },
    computed: {
        ...mapStateForForm(['durationEta', 'destinationAddress' ], 'createTicket', 'ticket', 'createTicket/updateTicket'),
        destinationAlias: {
            get(){
                return this.ticket.details.destinationAddressAlias;     
            },
            set(val){
                this.updateTicket({ details: { destinationAddressAlias: val } });
            }
        },
        needToKnow: {
            get(){
                return this.ticket.details.needToKnow || [];   
            },
            set(val){
                this.setNeedToKnowPoints(val)
            }
        },
        subject: {
            get(){
                return this.ticket.details.subject; 
            }, set(val){
                this.updateTicket({ details: { subject: val } })
            }
        },
        checkCanContinue(){
        if(this.durationEta && (this.destinationAddress || this.ticket.isIndoor)){
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

<style scoped>

</style>