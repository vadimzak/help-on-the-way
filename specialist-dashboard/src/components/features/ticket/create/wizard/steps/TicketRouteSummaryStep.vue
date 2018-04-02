<template> 
    <div>
        <h4 class="title">כתובות</h4>

        <div class="pickup address">
            <h5 class="sub-title">איסוף</h5>
            <div class="input-wrapper">
                <InputAddress :addressAlias="ticket.details.startAddressAlias" :keepOpen="false" name="startAddress" 
           v-validate="'address'" v-model="startAddress"/>
                <button class="remove-address" v-on:click="removeStartAddress">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </div>

        <div class="destination address">
            <h5 class="sub-title">יעד</h5>
            <div class="input-wrapper">
                <InputAddress :addressAlias="ticket.details.destinationAddressAlias" :keepOpen="false" name="destinationAddress" 
                v-validate="'address'" v-model="destinationAddress"/>
                <button class="remove-address" v-on:click="removeDestinationAddress">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </div>

        <div class="end address">
            <h5 class="sub-title">חזרה</h5>
            <div class="input-wrapper">
                 <InputAddress :addressAlias="ticket.details.endAddressAlias" :keepOpen="false" name="endAddress" 
                 v-validate="'address'" v-model="endAddress"/>
                <button class="remove-address" v-on:click="removeEndAddress">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import InputAddress from '@/components/InputAddress'
import { mapState, mapMutations } from 'vuex';

export default {
  components: { InputAddress },
  mounted(){
      this.$emit('canContinue', true)
  },
  data() {
    return {}
  },
    computed: {
        startAddress: {
            get(){
                return this.ticket.startAddress;
            },
            set(val){
                this.updateTicket({ startAddress: val })
            }
        },
        destinationAddress: {
            get(){
                return this.ticket.destinationAddress;
            },
            set(val){
                this.updateTicket({ destinationAddress: val });
            }
        },
        endAddress: {
            get(){
                return this.ticket.endAddress;
            },
            set(val){
                this.updateTicket({ endAddress: val});
            }
        },
      ...mapState('createTicket', ['ticket']),
  },
  methods: {
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
    .input-wrapper{
        display: flex;
        justify-content: space-between;
    }
    .remove-address{
        background: transparent;
        outline: none;
        border: none;
    }
</style>
