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
        <FloatingScreenRoot/>
  </div>
</template>

<script>
import SideBar from './components/layout/SideBar'
import AppHeader from './components/layout/AppHeader'
import FloatingScreenRoot from './components/layout/FloatingScreenContainer'
export default {
  name: 'app',
  components: {SideBar, AppHeader, FloatingScreenRoot},
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
