<template>
  <div>
      <b-row>
        <b-col
         cols="12"
         class="d-flex align-items-center my-2"
        v-for="(address, index) in addresses"
        v-if="ticket[address.field]" :key="index">
        <span  class="icon mx-3" :class="{ [address.icon] : true }"></span>
        <span> {{ticket[address.field] | formatAddress }} </span>
        </b-col>
      </b-row>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
export default {
  components: {},
  data() {
    return {
        addresses: [{
            label: '',
            field: 'startAddress',
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
    .icon{
        font-size: 30px;
    }
</style>
