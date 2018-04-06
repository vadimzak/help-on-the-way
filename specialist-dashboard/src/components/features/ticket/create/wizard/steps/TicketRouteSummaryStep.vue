<template> 
    <div class="container">
        <h4 class="title">כתובות</h4>

        <div class="pickup address">
            <i class="fa fa-map-marker"></i>

            <div class="input-wrapper">
                <h5 class="sub-title">איסוף</h5>
                <InputAddress :addressAlias="ticket.details.startAddressAlias" :keepOpen="false" name="startAddress" 
                v-validate="'address'" v-model="startAddress"/>
            </div>

            <button class="remove-address" v-on:click="removeStartAddress">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>

        <div class="destination address">
            <i class="fa fa-flag"></i>

            <div class="input-wrapper">
                <h5 class="sub-title">יעד</h5>
                <InputAddress :addressAlias="ticket.details.destinationAddressAlias" :keepOpen="false" name="destinationAddress" 
                v-validate="'address'" v-model="destinationAddress"/>
            </div>

            <button class="remove-address" v-on:click="removeDestinationAddress">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>

        <div class="end address">
            <i class="fa fa-map-marker"></i>

            <div class="input-wrapper">
                <h5 class="sub-title">חזרה</h5>
                 <InputAddress :addressAlias="ticket.details.endAddressAlias" :keepOpen="false" name="endAddress" 
                 v-validate="'address'" v-model="endAddress"/>
            </div>

            <button class="remove-address" v-on:click="removeEndAddress">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
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
    .container{
        font-family:  'Open Sans Hebrew';
        width: 100%;
        padding-bottom: 20px;
    }
    .title{
        font-size: 2rem;
        margin-bottom: 0;
        border-bottom: 2px solid gray;
    }
    .sub-title{
        font-size: 1.2rem;
        color: #8a8585;
    }
    .address{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
        border-bottom: 1px solid lightgray;
    }
    .input-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 0 0 75%;
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
