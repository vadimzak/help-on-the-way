<template>
  <v-toolbar color="indigo" dark fixed app>
    <v-toolbar-side-icon v-if="$store.state.user" @click.stop="toggleMenu"></v-toolbar-side-icon>
    <v-toolbar-title>Help On The Way</v-toolbar-title>
    <v-spacer></v-spacer>
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

</style>
