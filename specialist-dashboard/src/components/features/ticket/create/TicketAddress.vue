<template>
  <div>
      <b-row>
        <b-col
         cols="12"
         class="d-flex align-items-center my-2"
        v-for="(address, index) in addresses" :key="index">
        <span  class="material-icons mx-3">{{address.icon}}</span>
        <span> {{ticket.details[address.field + 'Alias'] ? ticket.details[address.field + 'Alias'] + ', &nbsp;' : 'אין, &nbsp;'}}</span>
        <span v-if="ticket[address.field]">
            {{ ticket[address.field] | formatAddress }}
        </span>
        <span v-else>
            ללא
        </span>
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
            icon: 'place'
        },{
            label: 'יעד',
            field: 'destinationAddress',
            icon: 'flag'
        },
        {
            label: 'חזרה',
            field: 'endAddress',
            icon: 'place'
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
    .material-icons{
        font-size: 1.5rem;
        color: var(--primary);
    }
</style>
