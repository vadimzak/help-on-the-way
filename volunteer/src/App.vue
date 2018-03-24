<template>
  <v-app id="app">
    <app-header></app-header>
    <app-sidenav></app-sidenav>
    <v-content>
      <h4 class="greeting" v-if="$store.state.user && $store.state.user.role!=='ANONYMOUS'">היי, {{$store.state.user.name}}, כיף לראות אותך כאן :) </h4>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
 <app-footer></app-footer>
  </v-app>
</template>

<script>
  import AppHeader from './components/AppHeader.vue'
  import AppSidenav from './components/AppSidenav.vue'
  import AppFooter from './components/AppFooter.vue'

  export default {
    components: {
      AppSidenav,
      AppHeader,
      AppFooter
    },
    name: 'App',
    props: {
      source: String
    }
  }
</script>

<style>
  .application {
    font-family: 'Rubik', Helvetica, Arial, sans-serif;
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
</style>
