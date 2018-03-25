<template>
<div class="col-2">
    <FloatingScreen target="ticket-btn">
      <TicketWizard></TicketWizard>
    </FloatingScreen>
    <div id="ticket-btn" class="ticket-btn p-4 h4"> + פניה חדשה</div>
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
  border-radius: 1px;
  background-color: #299dff;
  box-shadow: 0px 5px 14.9px 1.1px rgba(142, 142, 142, 0.26);
  font-family:  'Open Sans Hebrew';
  font-size: 30px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
}

</style>