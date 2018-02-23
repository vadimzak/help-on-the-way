<template>
<div>
    <FloatingScreen target="ticket-btn">
      <TicketWizard></TicketWizard>
    </FloatingScreen>
    <button id="ticket-btn" tag="button" type="button" class="btn btn-primary btn-lg m-4 mx-auto d-block">פניה חדשה</button>
</div>
</template>

<script>
import TicketWizard from './wizard/TicketWizard';
import FloatingScreen from '@/components/layout/FloatingScreen';
export default {
  components: {TicketWizard, FloatingScreen},
  }
</script>