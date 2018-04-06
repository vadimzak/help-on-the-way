<template>
  <div>
      <h2>פרטים ראשונים</h2>
      <p class="small">הקלד את שם ו/או מספר הטלפון של הזקן לחיפוש.</p>
      <ElderSearch @select="onElderSelect" callToActionLabel="צור פניה" />
  </div>
</template>
<script>
import { ElderSearch } from '@/components/features/elder/';
export default {
  components: { ElderSearch },
  data() {
    return {}
  },
  methods:{
        async onElderSelect(elder) {
          const ticket = await this.$store.dispatch('createTicket/createTicketForElder', elder);
          this.$router.push({ name: 'Ticket', params: { id: ticket.id }})
      }
  }
}
</script>
