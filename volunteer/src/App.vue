<template>
  <v-app id="app">
    <app-header></app-header>
    <app-sidenav></app-sidenav>
    <v-content>
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
  v-app {
    font-family: 'Rubik', Helvetica, Arial, sans-serif;
  }
</style>
