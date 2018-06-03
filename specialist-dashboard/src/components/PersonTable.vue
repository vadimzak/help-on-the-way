<template>
  <Table
    :data="tableData3"
    height="250"
    style="width: 100%">
    <!-- <TableColumn
      prop="date"
      label="Date"
      width="180">
    </TableColumn> -->
    <TableColumn
      prop="name"
      label="Name"
      width="180">
    </TableColumn>
    <TableColumn
      prop="address"
      label="Address">
    </TableColumn>
  </Table>
</template>

<script>
import contextMenu from 'vue-context-menu'
import categoriesTree from 'shared/constants/categoriesTree';
import gql from 'graphql-tag'
import {Table, TableColumn} from 'element-ui';
export default {
  components: { Table, TableColumn },
	props: {
    personType: String,
	},
	methods: {
  },
  data() {
    return {
      ready: false,
    }
  },
    apollo: {
    allPersons:{
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
    update: (data) =>{debugger; data.allPersons.nodes; },
      // result(value) {
        // this.setList(value.data.allPersons.nodes)
        // this.ready = true
      // },
    } 
  },
};
</script>


<style scoped>

</style>
