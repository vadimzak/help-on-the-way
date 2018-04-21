<template>
  <div v-on-click-outside="hidePlaceInput" v-on:click="showPlaceInput()">
    <div>
      <span v-show="!showAddressSelector && !keepOpen">
        {{value | formatAddress | formatEmpty}}
        </span>
    </div>
    <div v-show="showAddressSelector || keepOpen" >
      <b-row>
        <b-col cols="6">
          <GmapAutocomplete
                    :componentRestrictions="{country: 'IL'}"
                    :types="['address']"
                    class="form-control"
                    :value="value | formatAddress"
                    @place_changed="onSelect($event)"
                    :select-first-on-enter="true"
                ></GmapAutocomplete>
                <span class="cancel-button material-icons" v-show="value" @click="() => $emit('input', null)">close</span>
        </b-col>
        <b-col cols="3">
          <b-form-input type="number" min="0" max="100" v-if="value" :value="value.floor" @input="(e) => updatedModel({floor:  e.target ? e.target.value: ''})" placeholder="קומה"/>
        </b-col>
        <b-col cols="3">
             <b-form-input type="text" v-if="value" :value="value.enterance" @input="(e) => updatedModel({enterance: e.target ? e.target.value : '' })" placeholder="כניסה"/>
        </b-col>
      </b-row>
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
        hidePlaceInput: function(e) {
          debugger;
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
  .cancel-button{
    left: 10%;
    position: absolute;
    top: 8px;
    font-size: 1rem;
    cursor: pointer;
  }
 .pac-container{
   /* temp hack to make sure the palce auto compelte is aboved the popover, we need to find a better way */
   z-index: 1900;
 }
 i{
   color: var(--primary);
 }
</style>
