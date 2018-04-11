<template>
  <div v-if="selectedFilter"  id="filters" class="row my-4">
    <div class="button-filters justify-content-around col-12 row">
      <div v-for="(filter,index) in buttonFilters"
           :key="index"
           v-bind:class="{'active': filter.name==selectedFilter.name}"
           class="button-filter d-flex col-2 flex-row p-0"
           v-on:click="selectedFilterChanged(filter)">
        <span class="filter-count">  {{ filter.count() }} </span>
        <span class="filter-text">{{filter.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    buttonFilters: Array,
    filterChanged: Function
  },
  created() {
    if (this.buttonFilters) {
      this.selectedFilter = this.buttonFilters[0];
      this.filterChanged(this.selectedFilter);
    }
  },
  methods: {
    selectedFilterChanged: function(filter) {
      this.selectedFilter = filter;
      this.filterChanged(filter);
    },
  },
  data () {
    return {
      selectedFilter: {},
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
