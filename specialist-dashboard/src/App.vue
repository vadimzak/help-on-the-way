<template>
  <div id="app" class="container">
    <app-header />
    <router-view/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
  name: 'app',
  components: {AppHeader},
  data(){
    return {
      loggedInUser: '',

    }
  }
}
</script>

<style>
body{
  direction: rtl;
  text-align: right;
}
</style>
