<template>
  <div v-on-click-outside="hidePlaceInput" v-on:click="showPlaceInput()">
    <div>
      <span v-if="!showAddressSelector && !keepOpen">{{address | formatAddress}}</span>
    </div>
    <gmap-place-input :componentRestrictions="{country: 'IL'}" :defaultPlace="address | formatAddress" v-if="showAddressSelector || keepOpen" :select-first-on-enter="true" @place_changed="onSelect($event)"></gmap-place-input>
  </div>
</template>

<script>
  import { mixin as onClickOutside } from 'vue-on-click-outside'

  export default {
    props: {
      keepOpen: Boolean,
      address: Object,
      locationChanged: Function
    },
    mixins: [onClickOutside],
    data () {
      return {
          showAddressSelector: this.startAsInput,
          addressTypeConverter: {
            street_number: "houseNumber",
            route: 'street',
            locality: 'city'
          }
      }
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
<style>
 .pac-container{
   /* temp hack to make sure the palce auto compelte is aboved the popover, we need to find a better way */
   z-index: 1900;
 }
</style>
