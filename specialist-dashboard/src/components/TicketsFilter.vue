<template>
  <div class="row my-4">
    <div class="button-filters justify-content-around col-12 row">
      <div v-for="(filter,index) in filters"
           :key="index"
           v-bind:class="{'active': filter.value === currentFilter}"
           class="button-filter d-flex col-2 flex-row p-0"
           @click="setFilter(filter.value)">
        <span class="filter-count"> {{ statusCount[filter.value.toLowerCase()]}} </span>
        <span class="filter-text">{{filter.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TicketsFilter from '@/components/TicketsFilter'
import TicketStatus from '@/constants/enums/TicketStatus'
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations('createTicket', ['setFilter'])
  },
  computed: {
        ...mapState('createTicket', ['statusCount', 'currentFilter']),
  },
  data () {
    return {
      filters: [
        {
          name: TicketStatus.draft.text,
          value: TicketStatus.draft.value
        },
        {
          name: TicketStatus.open.text,
          value: TicketStatus.open.value
        },
        {
          name: TicketStatus.matched.text,
          value: TicketStatus.matched.value
        },
        {
          name: TicketStatus.scheduled.text,
          value: TicketStatus.scheduled.value
        }
      ],
    }
  },
}
</script>
<style scoped>
  .button-filters {
    margin: 10px;
  }

  .button-filter {
    position: relative;
    cursor: pointer;
    color: var(--primary);
    height: 65px;
    background-color: #ffffff;
    box-shadow: 0px 5px 14.9px 1.1px rgba(142, 142, 142, 0.08);
  }


  .active {
    background-color: var(--primary);
    color: white;
    box-shadow: 0px 5px 14.9px 1.1px rgba(0, 138, 255, 0.38);;
  }

  .filter-text{
    flex: 2 0 0;
    -webkit-box-flex: 2;
    -ms-flex: 2 0 0px;
    flex: 2 0 0;
    font-size: 1rem;
    padding-right: 18px;
    font-family: 'Open Sans Hebrew';
    align-self: center;
    text-align: center;
  }
  .filter-count{
    position: absolute;
    right: 15px;
    align-self: center;
    text-align: center;
    font-size: 2.5rem;
    font-family: 'Open Sans Hebrew';
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: -5.2px;

  }

</style>
