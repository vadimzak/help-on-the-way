<template>
  <div id="main">
    <auto-complete
      placeholder="הקלד כתובת"
      :searchFunction="addressSearchFunction"
      :value="value"
    />
  </div>
</template>

<script>
import AutoComplete from '@/components/AutoComplete'

export default {
  components: { AutoComplete },
  props: [ ],
  created(){
  },
  data () {
    return {
      value: '',
    }
  },
  methods: {
    addressSearchFunction(input, callback){
      let service = new google.maps.places.AutocompleteService()
        service.getPlacePredictions({
          input: input,
          types: ['address']
        },(res) => {
          callback(res)
      })
    },
  }
}
</script>
