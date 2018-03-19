<template>
  <div id="side-bar" class="pt-3">
     <NewTicketButton/>
    <ul class="h4">
      <li class="side-list-item mt-5">
        <router-link to="/" append class="nav-link">מסך ראשי</router-link>
      </li>
      <li class="side-list-item">
        <router-link to="/volunteers" append class="nav-link">מתנדבים</router-link>
      </li>
      <li class="side-list-item">
        <a class="nav-link" href="#">קבוצות מתנדבים</a>
      </li>
      <li class="side-list-item">
        <a class="nav-link" href="#">זקנים</a>
      </li>
      <li class="side-list-item">
        <router-link to="/kitchenSink" class="nav-link">דוגמאות של חתיכות מהממשק</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import NewTicketButton from '@/components/features/ticket/create/NewTicketButton';
export default {
 components: { NewTicketButton },
  methods: {
    setNewTikcetModal(modalRef){
      this.ticketModal = modalRef;
    },
    showTicketModal(){
      this.ticketModal.show();
    }
  },
  created(){
  }
}
</script>

<style scoped>

#side-bar{
  background-color: black;
  height: 93vh;
}

#side-bar ul{
      margin-top: 12vh;
}
.side-list-item{
  list-style: none;
  padding: 0.5em 0em 0.5em 0em;
}
.side-list-item a{
  color: #eee;
}

.side-list-item a.router-link-exact-active{
  color: yellow;
}
</style>
