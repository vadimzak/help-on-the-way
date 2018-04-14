<template>
  <List v-model="value" :addItem="addGroup" :removeItem="removeGroup" :search="searchGroups">
      <div slot="auto-complete-result" slot-scope="props">
          {{props.item.channels}}
      </div>
      <div slot="list-item" slot-scope="props">
            <span class="name">{{props.item.channels}}</span>
            <span class="members-count">({{props.item.volunteers.count}})</span>
      </div>
  </List>
</template>
<script>
import List from '@/components/inputs/List'
import { GET_ALL, ASSIGN_GROUP_TO_TICKET, UNASSIGN_GROUP_FROM_TICKET } from '@/graphql/queries/group'
export default {
  components: { List },
  props: ['value', 'ticketId'],
  methods: {
      async searchGroups(searchQuery){
        const result = await this.$apollo.query({
              query: GET_ALL,
          });
          const currentGroupsIds = this.value.map( g => g.id )
          return result.data.allGroups.nodes
          .filter(g => g.channels.includes(searchQuery))
          .filter(g => !currentGroupsIds.includes(g.id))
      },
      async addGroup(group){
            await this.$apollo.mutate({
                mutation: ASSIGN_GROUP_TO_TICKET,
                variables: {
                    ticketId: this.ticketId,
                    groupId: group.id,
                }
            })
          this.$emit('input', [...this.value, group])
      },
      async removeGroup(group){
            await this.$apollo.mutate({
                mutation: UNASSIGN_GROUP_FROM_TICKET,
                variables: {
                    ticketId: this.ticketId,
                    groupId: group.id,
                }
            })
            this.$emit('input', this.value.filter(g => !g.id === group.id))
      }
  }
}
</script>
