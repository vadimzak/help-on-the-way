<template>
  <div>
      <b-row v-if="!this.ticket.isIndoor">
        <b-col cols="12">
        <h4>לאן</h4>
        </b-col>
        <b-col cols="12" class="justify-content-center d-flex">
        <label for="destinationAlias">שם/סוג המקום:</label>
        <input
                   class="align-self-start"
                  id="destinationAlias"
                  v-model.trim="destinationAlias"
                  type="text"
                  placeholder="שם המקום"/>
           <InputAddress class="w-100" :keepOpen="true" name="address" v-validate="'address'" v-model="address"/>
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
        <b-col cols="12" class="justify-content-center d-flex">
            <textarea v-model="description" class="w-100"></textarea>
        </b-col>
      </b-row>

  </div>
</template>
<script>
import _ from 'lodash';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import DurationPicker from '@/components/inputs/DurationPicker'
import InputAddress from '@/components/InputAddress'

export default {
  components: { DurationPicker, InputAddress },
  data() {
    return {}
  },
    computed: {
        durationEta: {
            get(){
                return this.ticket.durationEta;
            },
            set(val){
                this.updateTicket({ durationEta: val })
                this.checkCanContinue()
            }
        },
        destinationAlias: {
            get(){
                return this.ticket.details.destinationAlias;     
            },
            set(val){
                this.updateTicket({ details: { destinationAlias: val } });
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
        address: {
            get(){
                return this.ticket.destinationAddress;
            },
            set(val){
                this.updateTicket({ destinationAddress: val});
                this.checkCanContinue()
            }
        },
      ...mapState('createTicket', ['ticket']),
  },
  methods: {
      checkCanContinue(){
        if(this.durationEta && (this.address || this.ticket.isIndoor)){
            this.$emit('canContinue', true);
        }
      },
    ...mapMutations('createTicket', ['updateTicket'])
  }
}

</script>
