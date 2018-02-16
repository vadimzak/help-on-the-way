<template>
  <v-navigation-drawer
    fixed
    v-model="$store.state.menuOpen"
    app
    v-if="$store.state.user"
  >
    <v-list dense>
      <v-list-tile @click="">
        <v-list-tile-content>
          <h3>Hello, {{$store.state.user.firstName}} </h3>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Your Tickets</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Chat</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer></template>

<script>
export default {
  name: 'AppSidenav',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
