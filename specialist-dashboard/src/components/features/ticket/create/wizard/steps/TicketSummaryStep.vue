<template>
  <StepCard>
      <template slot="header">סיכום הפניה</template>
      <template slot="content">
        <b-row class="field mb-2 p-2" v-if="field.condition()" v-for="(field, index) in sumarryFields" :key="index">
            <b-col cols="12"><h5>{{field.label}}</h5></b-col>
            <b-col cols="12">{{field.display()}}</b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <h5>כתובת</h5>
            </b-col>
            <b-col cols="12">
                <TicketAddress/>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="12">
                <h5>נקודות חשובות</h5>
            </b-col>
            <b-col cols="12">
                <NeedToKnowPoints v-model="needToKnow"/>
            </b-col>        
        </b-row> 
      </template>
  </StepCard>
</template>
<script>
import TicketAddress from '../../TicketAddress';
import { NeedToKnowPoints } from '@/components/features/ticket/inputs'
import StepCard from './StepCard'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
export default {
  mounted(){
      this.$emit('canContinue', true)
  },
  components: { TicketAddress, StepCard, NeedToKnowPoints },
  data() {
    const instance = this;
    return {
        sumarryFields: [{
            label: 'מספר הפנייה',
            condition: () => true,
            display: () => {
                return instance.ticket.id
            }
        },
        {
            label: 'מבקש הפנייה',
            condition: () => true,
            display(){
                return instance.$options.filters.formatName(instance.ticket.issuingPerson) + ' - ' + instance.ticket.issuingPerson.phoneNumber
            },
        },{
            label: 'דרך התניידות בפניה',
            condition(){ return !instance.ticket.isInDoor },
            display(){
                return instance.$options.filters.formatTransport(instance.ticket.transport)
            },
        },{
            label: 'ניידות הזקן',
            condition(){ return !instance.ticket.isInDoor },
            display(){
                return instance.$options.filters.formatElderMobility(instance.ticket.elderMobility)
            },
        }]
    }
  },
    computed: {
        needToKnow: {
            get(){
                return this.ticket.details.needToKnow || [];   
            },
            set(val){
                this.setNeedToKnowPoints(val)
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
    .field{
            border-bottom: 1px solid var(--light);
    }
</style>
