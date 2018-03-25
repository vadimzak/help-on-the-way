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
          <h3>היי {{$store.state.user.name}} :)</h3>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="$router.replace('/')">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>דף הבית</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="$router.replace('/mine')">
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>הכרטיסים שלך</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="">
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>צור קשר</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="logout()">
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>התנתקות</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer></template>

<script>
import config from "@/services/config";

export default {
  name: 'AppSidenav',
  data () {
    return {
      SERVER_BASE_URL: config.SERVER_BASE_URL,
    }
  },
  methods:{
    logout : function () {
     this.$store.commit('logout');
     window.location.href =  `${this.SERVER_BASE_URL}/logout/`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
