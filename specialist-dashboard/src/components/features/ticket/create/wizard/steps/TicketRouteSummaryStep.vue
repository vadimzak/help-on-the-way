<template> 
    <div>
        <h4 class="title">כתובות</h4>

        <div class="pickup address">
            <h5 class="sub-title">איסוף</h5>
           <InputAddress :keepOpen="false" name="startAddress" 
           v-validate="'address'" v-model="startAddress"/>
        </div>

        <div class="destination address">
            <h5 class="sub-title">יעד</h5>
           <InputAddress :keepOpen="false" name="destinationAddress" 
           v-validate="'address'" v-model="destinationAddress"/>
        </div>

        <div class="end address">
            <h5 class="sub-title">חזרה</h5>
           <InputAddress :keepOpen="false" name="endAddress" 
           v-validate="'address'" v-model="endAddress"/>
        </div>
    </div>
</template>

<script>
import InputAddress from '@/components/InputAddress'
import { mapState, mapMutations } from 'vuex';

export default {
  components: { InputAddress },
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
    ...mapMutations('createTicket', ['updateTicket'])
  }
}
</script>