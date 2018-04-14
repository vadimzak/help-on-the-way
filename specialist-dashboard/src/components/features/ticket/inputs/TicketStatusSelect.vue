<template>
    <b-form-select :value="value" @input="v => $emit('input', v)" size="md"  :options="statusOptions">
    </b-form-select>
</template>
<script>
  import { TicketStatus} from "@/constants/enums";
export default {
  props: ['value'],
  data(){
      const statusOptions = Object.values(TicketStatus)
      return {
          statusOptions,
      }
  }
}
</script>

<style scoped>

</style>
