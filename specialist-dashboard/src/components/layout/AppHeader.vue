<template>
  <div id="app-header" class="m-0 row align-items-center h3">
    <h3 @click=" () => $router.push('/')" class="pr-5 app-header-text text-right row align-content-center align-items-center">
       עזרה בדרך
    </h3>
      <NewTicketButton class="mr-5"/>
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
  height: 75px;
  position: fixed;
  z-index: 15;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 2px 38px 0 rgba(39, 39, 39, 0.06);
}
.app-header-text{
  cursor: pointer;
  font-family: 'Amatic SC', cursive;
  font-size: 40px;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.65;
  letter-spacing: normal;
  color: #7f7f7f;
}
</style>
