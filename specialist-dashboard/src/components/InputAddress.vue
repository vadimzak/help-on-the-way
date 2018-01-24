<template>
  <div v-on-click-outside="hidePlaceInput" v-on:click="showPlaceInput()">
    <div>
      <span v-if="!showAddressSelector">{{address}}</span>
    </div>
    <gmap-place-input v-bind:defaultPlace="address" v-if="showAddressSelector" :select-first-on-enter="true" @place_changed="onSelect($event)"></gmap-place-input>
  </div>
</template>

<script>
  import { mixin as onClickOutside } from 'vue-on-click-outside'

  export default {
    mixins: [onClickOutside],
    data () {
      return {
          showAddressSelector: false
      }
    },
    props: {
      address: String,
      locationChanged: Object
    },
    methods: {
        showPlaceInput: function() {
            this.showAddressSelector = true;
        },
        hidePlaceInput: function() {
          this.showAddressSelector = false;
        },
        onSelect: function(address) {
            this.showAddressSelector = false;
            this.locationChanged(address);
        }


    }
  }
</script>
