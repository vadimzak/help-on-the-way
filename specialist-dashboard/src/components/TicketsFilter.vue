<template>
  <div v-if="selectedFilter" id="filters">
    <div class="button-filters">
      <div v-for="filter in buttonFilters"
           v-bind:class="{'active': filter.name==selectedFilter.name}"
           class="button-filter"
           v-on:click="selectedFilterChanged(filter)">
        <span class="filter-text">{{filter.name}} {{ filter.count }}</span>
      </div>
    </div>
    <div v-bind:class="{'active-drop-down' : isDropDownFiltersSelected()}" class="drop-down-filters">
      <multiselect @input="dropDownFilterSelected"
                   v-model="selectedDropDownFilter"
                   :options="dropDownFilters"
                   :maxHeight=500
                   :searchable="false"
                   :close-on-select="true"
                   :allow-empty="true"
                   label="name"
                   selectLabel=""
                   selectedLabel=""
                   deselectLabel=""
                   openDirection="below"
                   :placeholder="placeHolderText"
                   :custom-label="dropDownFilterLabel"
                   track-by="name"></multiselect>
    </div>
  </div>
</template>

<script>

import Multiselect from 'vue-multiselect'

export default {
  components: { Multiselect },
  props: {
    buttonFilters: Array,
    dropDownFilters: Array,
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
      this.selectedDropDownFilter = {};
      this.filterChanged(filter);
    },
    dropDownFilterLabel: function(filter) {
      return filter.name ? `${filter.name}  ${filter.count} ` : this.placeHolderText;
    },
    dropDownFilterSelected: function(drop) {
      this.selectedFilter = {};
      this.filterChanged(this.selectedDropDownFilter);
    },
    isDropDownFiltersSelected: function() {
      if (!this.selectedDropDownFilter.name) {
        return false;
      }
      for (let i = 0; i < this.dropDownFilters.length; i++) {
        if (this.dropDownFilters[i].name == this.selectedDropDownFilter.name) {
            return true;
        }
      }
      return false;
    }
  },
  data () {
    return {
      selectedFilter: {},
      selectedDropDownFilter: {},
      placeHolderText: 'פילטורים נוספים'
    }
  },
}
</script>
<style scoped>
  .button-filters {
    margin: 10px;
    display: inline-block;
  }

  .drop-down-filters {
    display: inline-block;
  }
  .button-filter {
    display: inline-block;
    margin: 10px;
    background-color: white;
    border: 1px solid black;
    color: black;
    padding: 3px 30px;
    cursor: pointer;
  }

  .active-drop-down {
    background-color: black;
    color: white;
  }

  .active {
    background-color: gray;
    color: white;
  }

</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
