<template>
  <div id="app-header" class="m-0 row align-items-center h3">
    <div class="pr-5 app-header-text text-right col-2">
      עזרה בדרך
    </div>
     <NewTicketButton/>
  </div>
</template>

<script>
import NewTicketButton from '@/components/features/ticket/create/NewTicketButton';

export default {
  components: { NewTicketButton},
  methods: {
    setNewTikcetModal(modalRef){
      this.ticketModal = modalRef;
    },
    showTicketModal(){
      this.ticketModal.show();
    }
  },
  data () {
    return {
    }
  },
  created(){
  }
}
</script>

<style scoped>
#app-header{
  height: 147px;
  background-color: #ffffff;
  box-shadow: 0px 2px 38px 0 rgba(39, 39, 39, 0.06);
}
.app-header-text{
font-family: 'Amatic SC', cursive;
  font-size: 73px;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.65;
  letter-spacing: normal;
  color: #7f7f7f;
}
</style>
