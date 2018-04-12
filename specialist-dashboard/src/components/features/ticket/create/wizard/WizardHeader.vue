<template>
  <div class="my-4 d-flex align-items-start steps-bar">
        <div class="p-3 d-flex flex-column  align-items-start justify-content-start">
            <Truncate class="h3" v-if="ticket.elder" >
                <span @click="() => $store.commit('createTicket/setStep', 1)">{{ticket.elder | formatName}}</span>
            </Truncate>
            <Truncate class="" v-if="ticket.elder">
                {{ticket.elder.address | formatAddress}}
            </Truncate>
        </div>
        <div class="p-3 d-flex flex-column  align-items-start justify-content-start ">
            <Truncate class="h3" v-if="ticket.category">
                <span  @click="() => $store.commit('createTicket/setStep', 2)">{{ticket.category| formatCategory}}</span>
            </Truncate>
            <Truncate class="" v-if="ticket.destinationAddress">
                {{ticket.destinationAddress | formatAddress}}
            </Truncate>
            <Truncate v-if="!ticket.destinationAddress">
                &nbsp;                
            </Truncate>
        </div>
        <div class="p-3 d-flex flex-column  align-items-start justify-content-center ">
            <Truncate class="h3" v-if="ticket.durationEta">
                <span @click="() => $store.commit('createTicket/setStep', 3)">{{ticket.durationEta| formatMinutes}}</span>
            </Truncate>
            <Truncate v-if="ticket.durationEta">
                שעות הבוקר
            </Truncate>        
        </div>
        <div class="p-3 d-flex flex-column  align-items-start justify-content-center ">
            <Truncate class="h3" v-if="ticket.groups && ticket.groups.length">
                <span @click="() => $store.commit('createTicket/setStep', 5)">{{ticket.groups[0].channels}}</span>
            </Truncate>
            <Truncate>                
                &nbsp;
            </Truncate>   
            <Truncate>                
                &nbsp;
            </Truncate>        
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import Truncate from '@/components/base/Truncate';
export default {
  components: { Truncate },
  data() {
    return {
        sections: [{
            value: '',
            icon: 'fa fa-map-marker'
        },{
            label: 'יעד',
            field: 'destinationAddress',
            icon: 'fa fa-map-marker'
        },
        {
            label: 'חזרה',
            field: 'endAddress',
            icon: 'fa fa-map-marker'
        }]
    }
  },
    computed: {
      ...mapState('createTicket', ['ticket']),
  },
  methods: {
    ...mapMutations('createTicket', ['updateTicket'])
  }
}

</script>
<style scoped>
    .steps-bar{
        margin: -0.5rem;
    }
    .steps-bar > div{
        background-color: var(--white);
        border-bottom: 7px solid var(--blue);
        box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.08);
        flex: 1;
        height: 95px;
        width: 50px;
    }

    .steps-bar > div:last-child{
        border: none;
        height: 95px;
    }

</style>
