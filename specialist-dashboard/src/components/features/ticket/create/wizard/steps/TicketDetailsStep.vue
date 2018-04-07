<template>
  <div>
      <b-row v-if="!this.ticket.isIndoor">
        <b-col cols="12">
        <h4>לאן</h4>
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
        <h4>זמן ביצוע מוערך</h4>
        </b-col>
        <b-col cols="12" class="justify-content-center d-flex">
           <DurationPicker v-model="durationEta"/>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
        <h3>פרטים נוספים</h3>
        <p class="small">הזן פרטים נוספים הנחוצים למתנדב על מנת לבצע את הפניה.</p>
        </b-col>
        <b-col cols="12">
            <b-form-group
                description="נושא זה ישמש לבניית ההודעה למתנדבים"
                label="נושא הפנייה"
                label-for="ticketSubject">
                 <b-form-input id="ticketSubject"  v-model.trim="subject"></b-form-input>
            </b-form-group>
        </b-col>
        <b-col cols="12">
            <h4>נקודות חשובות למתנדב</h4>
            <TicketNeedToKnowPoints v-model="needToKnow"/>
        </b-col>
      </b-row>
    <input type="hidden" v-model="checkCanContinue">
  </div>
</template>
<script>
import _ from 'lodash';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import DurationPicker from '@/components/inputs/DurationPicker'
import InputAddress from '@/components/InputAddress'
import TicketNeedToKnowPoints from '@/components/features/ticket/TicketNeedToKnowPoints'
import { mapStateForForm } from '@/store/utils'

export default {
  components: { DurationPicker, InputAddress, TicketNeedToKnowPoints },
  data() {
    return {}
  },
    computed: {
        ...mapStateForForm(['durationEta', 'description', 'destinationAddress'], 'createTicket', 'ticket', 'createTicket/updateTicket'),
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
