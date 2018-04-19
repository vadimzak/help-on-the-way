<template> 
    <StepCard>
        <template slot="header">מסלול הפנייה</template>
        <template slot="content">
            <h6>כתובת</h6>
            <b-row v-for="(address,index) in addreses" :key="index" class="address">
                <b-col cols="1"><span class="sub-title">{{address.label}}</span></b-col>
                <b-col cols="3" div class="alias">
                    <EditableInput>
                        <template slot="input"><b-form-input :value="ticket.details[ address.key + 'AddressAlias']" @input="(val) => updateTicket({ details: { [address.key +  'AddressAlias']: val } })" /></template>
                        <template slot="label"><span>{{ticket.details[ address.key + 'AddressAlias'] || 'אין שם'}}</span></template>
                    </EditableInput>
                </b-col>
                <b-col cols="8" class="input-wrapper">
                    <InputAddress  :keepOpen="false" 
                     :value="ticket[address.key + 'Address']"
                     @input="(v) => updateTicket({ [address.key + 'Address']: v })" />
                </b-col>
            </b-row>
                <div class="ticket-mobility">
            <h6>דרך ההתנייות בפנייה</h6>
                <div class="boxes-wrapper">
                    <RadioBoxes v-model="transport" :options="ticketTransportTypes"/>
                </div>
        </div>  
        <div class="elder-mobility">
            <h6>ניידות הזקן</h6>
                <div class="boxes-wrapper">
                    <RadioBoxes v-model="elderMobility" :options="elderMobilityOptions"/>
                </div>
        </div>
        </template>
          <input type="hidden" v-model="canContinue"/>   
    </StepCard>
</template>

<script>
import InputAddress from '@/components/InputAddress'
import { mapStateForForm } from '@/store/utils'
import {RadioBoxes, EditableInput} from '@/components/inputs/';
import { mapState, mapMutations } from 'vuex';
import ElderMobilityTypes from 'shared/constants/enums/ElderMobilityType'
import TicketTransportTypes from 'shared/constants/enums/TicketTransportType'
import StepCard from './StepCard';

export default {
  components: { StepCard, InputAddress, RadioBoxes, EditableInput  },
  data() {
    return {
      elderMobilityOptions: Object.values(ElderMobilityTypes),
      ticketTransportTypes: Object.values(TicketTransportTypes).map((item) => {
          item = { ...item }
          item.icon = { class: 'material-icons', content: item.icon }
          return item 
      }),
      addreses: [{ key: 'start', label: 'ממקום'}, { key: 'destination', label: 'למקום'}, { key: 'end', label: 'ובחזרה'}],
    }
  },
    computed: {
    canContinue(){
        const hasTransport = this.ticket.transport;
        const mobility = this.ticket.transport;
        const startAddress = this.ticket.startAddress || this.ticket.details.startAddressAlias
        this.$emit('canContinue', hasTransport && mobility && startAddress)
        },
      ...mapStateForForm(['elderMobility', 'transport'], 'createTicket', 'ticket', 'createTicket/updateTicket'),
      ...mapState('createTicket', ['ticket']),
  },
  methods: {
      getAddress(key){
          return this[key + 'Address']
      },
    ...mapMutations('createTicket', ['updateTicket']),
    removeStartAddress: function(){
        this.startAddress = null
    },
    removeDestinationAddress: function(){
        this.destinationAddress = null
    },
    removeEndAddress: function(){
        this.endAddress = null
    }
  }
}
</script>
<style scoped>
    .container{
        font-family:  'Open Sans Hebrew';
        width: 100%;
        padding-bottom: 20px;
    }
    .title{
        font-size: 2rem;
        margin-bottom: 0;
        color: var(--secondary);
    }
    .sub-title{
        font-size: 1.2rem;
        color: var(--primary);
        letter-spacing: 0.4px;
    }
    .address{
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        padding-top:20px;
        border-bottom: 1px solid var(--light);
    }
    .end{
        border: none;
    }
    .end .sub-title{
          color: var(--secondary);
    }
    .input-wrapper, .alias{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 0 0 90%;
        font-size: 1.5rem;
        color: var(--secondary);
    }
    .remove-address{
        background: transparent;
        outline: none;
        border: none;
    }
    .fa{
        font-size: 2vw;
    }
    .fa-trash{
        font-size: 1.5vw;
    }
</style>