<template>
  <div>
    <div>
      <app-header />
    </div>
    <div id="app" class="container">
      <div class="row">
        <div class="col-3 h-100">
          <side-bar />
        </div>
        <div class="col">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar'
import AppHeader from './components/AppHeader'

export default {
  name: 'app',
  components: {SideBar, AppHeader},
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
