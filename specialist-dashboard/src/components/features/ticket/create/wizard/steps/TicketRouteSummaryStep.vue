<template> 
    <div class="container-fluid mb-5">
        <h4 class="title row mb-5">מסלול הפנייה</h4>

        <div class="pickup address">
            <span class="sub-title">ממקום</span>
            <div class="input-wrapper">
                <InputAddress :addressAlias="ticket.details.startAddressAlias" :keepOpen="false" name="startAddress" 
                v-validate="'address'" v-model="startAddress"/>
            </div>

        </div>

        <div class="destination address">
            <span class="sub-title">למקום</span>
            <div class="input-wrapper">
                <InputAddress :addressAlias="ticket.details.destinationAddressAlias" :keepOpen="false" name="destinationAddress" 
                v-validate="'address'" v-model="destinationAddress"/>
            </div>
        </div>

        <div class="end address">
            <span class="sub-title">חזרה</span>
            <div class="input-wrapper">
                 <InputAddress :addressAlias="ticket.details.endAddressAlias" :keepOpen="false" name="endAddress" 
                 v-validate="'address'" v-model="endAddress"/>
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
        justify-content: space-between;
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
    .input-wrapper{
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