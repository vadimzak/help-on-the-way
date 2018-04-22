<template>
  <v-app id="app" :class="{ 'loggged-out': !isLoggedIn }">
    <app-header v-if="isLoggedIn"></app-header>
    <app-sidenav v-if="isLoggedIn"></app-sidenav>
    <v-content>
      <h4 class="greeting" v-if="isLoggedIn && $store.state.layoutDisplay.greeting">היי, {{$store.state.user.name}}, כיף לראות אותך כאן 😇 </h4>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
 <app-footer v-if="isLoggedIn && $store.state.layoutDisplay.footer"></app-footer>
  </v-app>
</template>

<script>
  import AppHeader from './components/layout/AppHeader.vue'
  import AppSidenav from './components/layout/AppSidenav.vue'
  import AppFooter from './components/layout/AppFooter.vue'

  export default {
    components: {
      AppSidenav,
      AppHeader,
      AppFooter
    },
    name: 'App',
    computed: {
      isLoggedIn(){
        return this.$store.state.user && this.$store.state.user.role!=='ANONYMOUS' && this.$store.state.user.role!=='VOLUNTEER_UNVERIFIED'
      }
    },
    props: {
      source: String
    }
  }
</script>

<style>
  #app {
    font-family: 'Open Sans Hebrew', Arial;
    direction: rtl;
    text-align: right;
  }
  .container.fill-height {
    padding: 0;
  }
  .greeting {
    text-align: center;
    width: 100%;
    margin: 15px 0;
    font-weight: lighter;
  }

  .content {
    padding-bottom: 50px;
  }
</style>
