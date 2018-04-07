<template>
<div class="col">
    <FloatingScreen @shown="variant = 'outline-primary'" @hidden="variant = 'primary'"	 target="ticket-btn">
      <CreateTicketForElder/> 
    </FloatingScreen>
    <b-btn v-show="$route.name !== 'Ticket'" :variant="variant" id="ticket-btn" size="lg" class=""> + פניה חדשה</b-btn>
    <b-btn @click="() => $router.go(-1)" v-show="$route.name === 'Ticket'" variant="outline-primary"  size="lg" class=""> x פניה חדשה</b-btn>
</div>
</template>

<script>
import CreateTicketForElder from './CreateTicketForElder';
import FloatingScreen from '@/components/layout/FloatingScreen';
import {mapMutations, mapState} from 'vuex'
export default {
  components: {CreateTicketForElder, FloatingScreen},
  data(){
    return {
      variant: 'primary',
    }
  }
  }
</script>

<style scoped>
.ticket-btn{
  width: 250px;
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