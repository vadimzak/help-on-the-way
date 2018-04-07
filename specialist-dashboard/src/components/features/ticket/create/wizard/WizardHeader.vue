<template>
  <div class="my-4 d-flex align-items-start steps-bar">
        <div class="p-3 d-flex flex-column  align-items-start justify-content-start">
            <Truncate class="font-weight-bold" v-if="ticket.elder" ><span @click="() => $store.commit('createTicket/setStep', 1)">{{ticket.elder | formatName}}</span></Truncate>
            <Truncate class="small" v-if="ticket.elder">{{ticket.elder.address | formatAddress}}</Truncate>
        </div>
        <div class="p-3 d-flex flex-column  align-items-start justify-content-start ">
            <Truncate class="font-weight-bold" v-if="ticket.category"><span  @click="() => $store.commit('createTicket/setStep', 2)">{{ticket.category| formatCategory}}</span></Truncate>
            <Truncate class="small" v-if="ticket.subCategory">{{ticket.subCategory | formatSubCategory}}</Truncate>
        </div>
        <div class="p-3 d-flex flex-column  align-items-start justify-content-center ">
            <Truncate class="font-weight-bold" v-if="ticket.durationEta"><span @click="() => $store.commit('createTicket/setStep', 3)">{{ticket.durationEta| formatMinutes}}</span></Truncate>
            &nbsp;
        </div>
        <div class="p-3 d-flex flex-column  align-items-start justify-content-center ">
                <Truncate class="font-weight-bold" v-if="ticket.groups && ticket.groups.length"><span @click="() => $store.commit('createTicket/setStep', 5)">{{ticket.groups[0].channels}}</span></Truncate>
                &nbsp;
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
        margin: -0.75rem;
        height: 60px;
        background-color: #161616;
        color: white;
    }
    .steps-bar > div{
        width: 50px;
        flex: 1;
        /* height: 100%; */
        border-left: 2px solid white;
    }

    .steps-bar > div:last-child{
            border-left: 0;
    }

</style>
