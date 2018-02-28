<script>
import AutoComplete from '@/AutoComplete'
import VueTypes from 'vue-types';
import PERSON_TYPES from '@/constants/PersonTypes'
import PERSON_RELATION_TYPES from '@/constants/PersonRelationsTypes'
export default {
  props: {
      value: Object,
      personType: VueTypes.oneOf(PERSON_TYPES),
      relation: VueTypes.shape({ type: VueTypes.oneOf(PERSON_RELATION_TYPES).isRequired, elderId: VueTypes.integer.isRequired })
  },
  methods: {
      searchPerson() {
        
      }
  },
  components: { AutoComplete,}
}
</script>
<template>
  <AutoComplete v-model="value" @input="val => value = val" />
</template>

