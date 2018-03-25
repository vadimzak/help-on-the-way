<template>
  <div v-if="selectedFilter" id="filters" class="row">
    <div class="button-filters justify-content-between col-12 row">
      <div v-for="filter in buttonFilters"
           v-bind:class="{'active': filter.name==selectedFilter.name}"
           class="button-filter d-flex flex-row col-2 p-0"
           v-on:click="selectedFilterChanged(filter)">
              <span class="filter-count"> {{ filter.count }}</span>
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
    cursor: pointer;
    background-color: #ffffff;
    box-shadow: 0px 5px 14.9px 1.1px rgba(142, 142, 142, 0.08);
  }

  .active-drop-down {
    background-color: black;
    color: white;
  }

  .active {
    color: #0089fd;
    box-shadow: 0px 5px 14.9px 1.1px rgba(106, 183, 248, 0.24);
  }
  .active .filter-count{
    background-color: #0089fd;
  }

  .filter-text{
    flex: 2 0 0;
    -webkit-box-flex: 2;
    -ms-flex: 2 0 0px;
    flex: 2 0 0;
    font-family: 'Open Sans Hebrew';
    align-self: center;
    text-align: center;
  }
  .filter-count{
    -webkit-box-flex: 1;
    -ms-flex: 1 0 0px;
    flex: 1 0 0;
    align-self: center;
    text-align: center;
    font-size: 50px;
    font-family: 'Open Sans Hebrew';
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: -7.2px;
    background-color: #e7e7e7;
    color: #ffffff;
    box-shadow: 0px 5px 14.9px 1.1px rgba(142, 142, 142, 0.08);
  }

</style>
