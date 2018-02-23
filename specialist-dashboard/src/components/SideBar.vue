<template>
  <div id="side-bar" class="mt-3 pt-3 h-100">
    <router-link to="/new-ticket" tag="button" type="button" class="btn btn-primary btn-lg m-4 mx-auto d-block">פניה חדשה</router-link>
    <ul class="h4">

      <li class="side-list-item mt-5">
        <router-link to="/" class="nav-link" :class="{active: this.$route.name == 'Main' }">מסך ראשי</router-link>
      </li>
      <li class="side-list-item">
        <router-link to="/tickets" class="nav-link" :class="{active: this.$route.name == 'TicketsView' }">פניות</router-link>
      </li>
      <li class="side-list-item">
        <router-link to="/volunteers" class="nav-link" :class="{active: this.$route.name == 'VolunteerView' }">מתנדבים</router-link>
      </li>
      <li class="side-list-item">
        <a class="nav-link" href="#">קבוצות מתנדבים</a>
      </li>
      <li class="side-list-item">
        <a class="nav-link" href="#">זקנים</a>
      </li>
      <li class="side-list-item">
        <router-link to="/tags" class="nav-link"  :class="{active: this.$route.name == 'TagManager' }">ניהול תגיות</router-link>
      </li>
      <li class="side-list-item">
        <a class="nav-link" href="#">מפה</a>
      </li>
      <li class="side-list-item">
        <router-link to="/kitchenSink" class="nav-link" :class="{active: this.$route.name == 'KitchenSink' }">דוגמאות של חתיכות מהממשק</router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  created(){
  }
}
</script>

<style scoped>
#side-bar{
  background-color: #eee;
}
.side-list-item{
  list-style: none;
  padding: 0.5em 0em 0.5em 0em;
}
</style>
