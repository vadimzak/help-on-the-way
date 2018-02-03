<template>
  <div v-on-click-outside="hidePlaceInput" v-on:click="showPlaceInput()">
    <div>
      <span v-if="!showAddressSelector">{{address | formatAddress}}</span>
    </div>
    <gmap-place-input :defaultPlace="address | formatAddress" v-if="showAddressSelector" :select-first-on-enter="true" @place_changed="onSelect($event)"></gmap-place-input>
  </div>
</template>

<script>
  import { mixin as onClickOutside } from 'vue-on-click-outside'

  export default {
    mixins: [onClickOutside],
    data () {
      return {
          showAddressSelector: false,
          addressTypeConverter: {
            street_number: "houseNumber",
            route: 'street',
            locality: 'city'
          }
      }
    },
    props: {
      address: Object,
      locationChanged: Function
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
            let convertedAddress = {}
            for (let index = 0; index < address.address_components.length; index++) {
              let addressComponent = address.address_components[index];
              if (this.addressTypeConverter[addressComponent.types[0]]) {
                convertedAddress[this.addressTypeConverter[addressComponent.types[0]]] = addressComponent.short_name;
              }
            }
            this.locationChanged(convertedAddress);
        }
    }
  }
</script>
