<template>
  <div v-on-click-outside="hidePlaceInput" v-on:click="showPlaceInput()">
    <div>
      <span v-if="!showAddressSelector && !keepOpen">
        {{addressAlias ? addressAlias : ''}}
        <i v-if="addressAlias" class="material-icons ml-5 mr-5">mode_edit</i> 
        {{value | formatAddress | formatEmpty}}
        </span>
    </div>
    <div v-if="showAddressSelector || keepOpen" >
      <GmapAutocomplete
          :componentRestrictions="{country: 'IL'}"
          :types="['address']"
          class="w-100"
          :value="value | formatAddress"
          @place_changed="onSelect($event)"
          :select-first-on-enter="true"
      ></GmapAutocomplete>
      <b-form-input type="number" min="0" max="100" v-if="value" :value="value.floor" @input="(e) => updatedModel({floor: e.target.value})" placeholder="קומה"/>
      <b-form-input type="text" v-if="value" :value="value.enterance" @input="(e) => updatedModel({enterance: e.target.value })" placeholder="כניסה"/>
     </div>
  </div>
</template>

<script>
  import { mixin as onClickOutside } from 'vue-on-click-outside'
  import _ from 'lodash'
  import VueTypes from 'vue-types'
  export default {
    props: {
      keepOpen: Boolean,
      value: VueTypes.object.def({}),
      addressAlias: String,
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
            let convertedAddress = {}
            for (let index = 0; index < address.address_components.length; index++) {
              let addressComponent = address.address_components[index];
              if (this.addressTypeConverter[addressComponent.types[0]]) {
                convertedAddress[this.addressTypeConverter[addressComponent.types[0]]] = addressComponent.short_name;
              }
            }
            convertedAddress.location = {
              lng: address.geometry.location.lng(),
              lat: address.geometry.location.lat()
            };
            this.updatedModel(convertedAddress)
        },
         updatedModel: _.debounce(async function (addressInput){
          addressInput = Object.assign({}, this.value, addressInput);
          this.$emit('input', addressInput);
          const address = await this.$store.dispatch('address/get', addressInput);
          this.$emit('input', Object.assign({}, this.value, address));
      }, 600)
    }
  }
</script>
<style>
 .pac-container{
   /* temp hack to make sure the palce auto compelte is aboved the popover, we need to find a better way */
   z-index: 1900;
 }
 i{
   color: var(--primary);
 }
</style>
