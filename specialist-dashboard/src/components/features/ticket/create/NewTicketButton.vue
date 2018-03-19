<template>
<div>
    <FloatingScreen target="ticket-btn">
      <TicketWizard></TicketWizard>
    </FloatingScreen>
    <div id="ticket-btn" class="ticket-btn p-4 h4">פניה חדשה</div>
</div>
</template>

<script>
import TicketWizard from './wizard/TicketWizard';
import FloatingScreen from '@/components/layout/FloatingScreen';
export default {
  components: {TicketWizard, FloatingScreen},
  }
</script>

<style scoped>
.ticket-btn{
  text-align: center;
  background-color: #e6eeff;
  cursor: pointer;
}

</style>