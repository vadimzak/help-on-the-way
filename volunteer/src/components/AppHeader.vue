<template>
  <v-toolbar color="white" light fixed app>
    <v-avatar>
      <h4>7653*</h4>
      <!--<img src="/static/apple-touch-icon-180x180.png" alt="avatar">-->
    </v-avatar>
    <v-spacer></v-spacer>
    <v-toolbar-title class="top-title"  @click="$router.push('/')">עזרה בדרך</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon v-if="$store.state.user" @click.stop="toggleMenu"></v-toolbar-side-icon>
  </v-toolbar>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'AppHeader',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {...mapActions([
      'toggleMenu'
    ])}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-title{
  font-family: 'Amatic SC', cursive;
  font-size: 35px;
}
</style>
