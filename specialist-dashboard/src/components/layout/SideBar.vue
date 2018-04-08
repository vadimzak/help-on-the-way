<template>
  <div id="side-bar" class="pt-3">
    <ul class="h4 p-0">
      <li class="side-list-item mt-5">
        <router-link to="/" class="nav-link" :class="{active: this.$route.name == 'TicketsView' }"><i class="material-icons">home</i></router-link>
      </li>
 
      <li class="side-list-item">
        <router-link to="/volunteers" class="nav-link" :class="{active: this.$route.name == 'VolunteerView' }"><i class="fa d-icon-help-2"></i></router-link>
      </li>
      <!-- <li class="side-list-item">
        <a class="nav-link" href="#">קבוצות מתנדבים</a>
      </li> -->
      <li class="side-list-item">
        <a class="nav-link" href="#"><i class="fa d-icon-old-man"></i></a>
      </li>
      <!-- <li class="side-list-item">
        <router-link to="/tags" class="nav-link"  :class="{active: this.$route.name == 'TagManager' }">ניהול תגיות</router-link>
      </li> -->
      <!-- <li class="side-list-item">
        <a class="nav-link" href="#">מפה</a>
      </li> -->
      <li class="side-list-item">
        <router-link to="/kitchenSink" class="nav-link" :class="{active: this.$route.name == 'KitchenSink' }"><i class="fa d-icon-prayer"></i></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import NewTicketButton from '@/components/features/ticket/create/NewTicketButton';
export default {
 components: { NewTicketButton },
  methods: {
  },
  created(){
  }
}
</script>

<style scoped>

#side-bar{
  height: 100vh;
    background-color: #ffffff;
    box-shadow: 0px 2px 38px 0 rgba(39, 39, 39, 0.06);
}

#side-bar ul{
      margin-top: 12vh;
}
.side-list-item{
  list-style: none;
  padding: 0.5em 0em 0.5em 0em;
}
.side-list-item a{
  color:  #c2c2c2;
      text-align: center;
}

.side-list-item i{
  text-align: center;
  color:  #c2c2c2;
      font-size: 44px;
}
.router-link-active i{
  color: #0089fd;
}
</style>
