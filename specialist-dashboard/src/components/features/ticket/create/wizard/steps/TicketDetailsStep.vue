<template>
  <div>
     <StepCard>
         <template slot="header">פרטי הפניה</template>
         <template slot="content">
            <b-row>
                <b-col cols="12">
                <h6>סוג הפניה</h6>
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
         </template>
     </StepCard>
     <StepCard v-show="ticket.isIndoor !== undefined && ticket.isIndoor !== null">
        <template slot="header">
                <h3>{{ ticket.isIndoor ? 'סיוע בתוך הבית' : 'ליווי' }}</h3>
        </template>
        <template slot="content">
            <b-row>
                <b-col cols="12">
                    <h6>סוג</h6>
                </b-col>
                <b-col cols="12" class="justify-content-center d-flex">
                    <RadioBoxes class="indoor" v-if="ticket.isIndoor === true" :value="ticket.category" @input="(val) => updateTicket({category: val, subCategory: null})" :options="indoorCategories"/>
                    <RadioBoxes class="outdoor" v-if="ticket.isIndoor === false" :value="ticket.category" @input="(val) => updateTicket({category: val, subCategory: null})" :options="outdoorCategories"/>
                </b-col>     
            </b-row>
            <b-row v-if="ticket.category && categories[ticket.category] && categories[ticket.category].subCategories.length">
                <b-col cols="12" class="justify-content-between d-flex">
                    <h6>תת סוג</h6>
                </b-col>
                <b-col cols="12" class="justify-content-center d-flex">
                    <RadioBoxes  :value="ticket.subCategory" @input="(val) => updateTicket({subCategory: val})" :options="categories[ticket.category].subCategories"/>
                </b-col>     
            </b-row>   
            <b-row v-if="!ticket.isIndoor && ticket.category">
                <b-col cols="12" class="justify-content-between d-flex">
                    <h6>לאן</h6>
                </b-col>
                <b-col cols="12" class="justify-content-center d-flex">
                    <b-col cols="6" class="justify-content-center d-flex">
                        <b-form-group label="שם המקום" label-for="destinationAlias">
                            <b-form-input
                                    class="align-self-start"
                                    id="destinationAlias"
                                    v-model.trim="destinationAlias"
                                    type="text"
                                    placeholder=""/>
                            </b-form-group>
                        </b-col>
                        <b-col cols="6">
                        <b-form-group label="כתובת (אופציונלי)" label-for="destinationAddrss">
                            <InputAddress class="w-100" id="destinationAddrss" :keepOpen="true" name="address" v-validate="'address'" v-model="destinationAddress"/>
                        </b-form-group>
                    </b-col>
                </b-col>   
            </b-row> 
            <b-row>
                <b-col class="justify-content-center d-flex" cols="6">
                    <TicketTitle v-model="subject"  :ticket="ticket" />
                </b-col>  
            </b-row>    
        </template>    
     </StepCard>
      <b-row>
          <input type="hidden" :value="canContinueSep"/>
      </b-row>
  </div>
</template>
<script>
import _ from 'lodash';
import RadioBoxes from '@/components/inputs/RadioBoxes';
import InputAddress from '@/components/InputAddress'
import { TicketTitle } from '@/components/features/ticket/inputs'
import StepCard from './StepCard';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import { mapStateForForm } from '@/store/utils'
export default {
  components: { RadioBoxes, InputAddress, TicketTitle, StepCard },
  data() {
    return {
      isIndoorBoxes: indoorBoxes(),
      updateIndoorStatus(indoors){
            const ticket = this.ticket;
            const details = {
                startAddressAlias: `הבית של ${ticket.elder.firstName}`,
            }
            if(indoors){
                this.updateTicket({isIndoor: indoors, startAddress: ticket.elder.address, details, endAddress: null, destinationAddress: null, transport: null, elderMobility: null })
            }else{
                details.endAddressAlias = `הבית של ${ticket.elder.firstName}`,
                this.updateTicket({
                isIndoor: indoors,
                startAddress: ticket.elder.address, 
                destinationAddress: {},
                endAddress: ticket.elder.address,
                details
                })
            }
            this.updateTicket({ category: null, subCategory: null })
        },
    }
  },
    computed: {
        canContinueSep: function() {
            const ticket = this.ticket;
            const categories = this.categories;
            const isDefinedIndoorOrOutDoor = !_.isUndefined(ticket.isIndoor) && ticket.isIndoor!==null
            const hasDestinationIfOutdoor = ticket.isIndoor || this.destinationAlias;
            const hasCategory =  ticket.category && (!categories[ticket.category].subCategories.length || ticket.subCategory)
            const canContinue = isDefinedIndoorOrOutDoor && hasDestinationIfOutdoor && hasCategory;
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
        destinationAlias: {
            get(){
                return this.ticket.details.destinationAddressAlias;     
            },
            set(val){
                this.updateTicket({ details: { destinationAddressAlias: val } });
            }
        },subject: {
            get(){
                return this.ticket.details.subject; 
            }, set(val){
                this.updateTicket({ details: { subject: val } })
            }
        },
      ...mapStateForForm(['destinationAddress'], 'createTicket', 'ticket', 'createTicket/updateTicket'),
      ...mapState('createTicket', ['ticket']),
      ...mapState('categories', ['categories']),
      ...mapGetters('categories', ['indoorCategories', 'outdoorCategories'])
  },
  methods: {
    ...mapMutations('createTicket', ['updateTicket'])
  }
}

function indoorBoxes(){
return [
      { text: 'בתוך הבית', value: true, icon: 'd-icon-home' },
      { text: 'ליווי', value: false, icon: 'd-icon-distance'  },
    ];
}
</script>
