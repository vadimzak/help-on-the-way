<script>
import AutoComplete from '@/components/AutoComplete'
import VueTypes from 'vue-types';
import { buildSearchByConditionQuery } from '@/graphql/utils/queryBuilder'
import { AUTO_COMPLETE_PERSON_OF_TYPE } from '@/graphql/queries/person'
export default {
  props: {
      value: VueTypes.any,
      personType: VueTypes.any,
  },
  methods: {
      async searchPerson(value) {
        const variables = constructSearchQuery.call(this, value);
        const results = await this.$apollo.mutate({
             mutation: AUTO_COMPLETE_PERSON_OF_TYPE,
             variables,
        });
        const people = results.data.getPersonByCondition.people;
        return people;
      },
      personChanged(value) {
        this.$emit('input', value);
      }
  },
  components: { AutoComplete }
}
function constructSearchQuery(textQuery){
    const query  = {
        and: [
            { or: [
                {firstName: { like: `%${textQuery}%` } },
                {lastName:  { like: `%${textQuery}%` }},
                {phoneNumber:  { like: `%${textQuery}%` }},
            ] },
            { type: { eq: this.personType.toLowerCase() } },
        ]
    };
    return buildSearchByConditionQuery(query);
}
</script>
<template>
  <auto-complete
  v-model="value"
  @input="personChanged"
  :searchFunction="searchPerson"
  placeholder="חיפוש">
    <template slot-scope="props">
      {{props.item | formatName}}
    </template>
  </auto-complete>
</template>

