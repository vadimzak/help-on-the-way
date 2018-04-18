<script>
import AutoComplete from '@/components/AutoComplete'
import VueTypes from 'vue-types';
export default {
  props: {
      value: VueTypes.any,
      personType: VueTypes.any,
  },
  methods: {
      async searchPerson(value) {
        return [value];
      }
  },
  components: { AutoComplete,}
}
</script>
<template>
  <AutoComplete v-model="value" @input="val => value = val" :searchFunction="searchPerson" placeholder="חיפוש">
    <template slot-scope="props">
      {{props.item}}
    </template>
  </AutoComplete>
</template>

