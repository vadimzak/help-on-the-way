<template>
    <b-form-select :value="value" @input="v => $emit('input', v)" size="md"  :options="statusOptions">
    </b-form-select>
</template>
<script>
  import { TicketStatus} from "@/constants/enums";
export default {
  props: ['value'],
  data(){
      const statusOptions = Object.values(TicketStatus).map(status => ({ 
          text: status.presentationName, value: status.queryTern
          }));
      return {
          statusOptions,
      }
  }
}
</script>

<style scoped>

</style>
