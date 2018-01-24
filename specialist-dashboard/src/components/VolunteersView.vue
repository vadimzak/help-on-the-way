<template>
  <div>
    <h1> מתנדבים:</h1>
    <table class="table">
      <thead>
        <tr>
          <th>שם</th>
          <th>טלפון</th>
          <th>כתובת</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="volunteer in volunteers" :key="volunteer.id">
          <td>{{volunteer.firstName}} {{volunteer.lastName}} </td>
          <td>{{volunteer.phoneNumber}}</td>
          <td>{{volunteer.addressByAddressId.street}} {{volunteer.addressByAddressId.houseNumber}}, {{volunteer.addressByAddressId.city}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
    }
  },
  methods: {
  },
  created() {
  },
  apollo: {
    volunteers:{
      query: gql`{
        allPeople(condition: {type: VOLUNTEER}) {
          nodes {
            id
            firstName
            lastName
            phoneNumber
            addressByAddressId {
              street
              houseNumber
              city
            }            
          }
        }
      }`,
      update: (data) => data.allPeople.nodes
    } 
  }
}
</script>

<style scoped>
th{
  text-align: right;
}
</style>
