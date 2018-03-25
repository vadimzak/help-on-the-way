<template>
  <div>
    <div>
      <app-header />
    </div>
    <div id="app" class="container-fluid">
      <div class="row">
        <div class="col-1">
          <side-bar />
        </div>
        <div class="col-10 content pl-0">
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
  components: {SideBar, AppHeader, FloatingScreenRoot},
  data(){
    return {
      loggedInUser: '',
    }
  }
}
</script>

<style>
</style>
