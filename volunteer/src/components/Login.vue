<template>
  <v-layout column wrap>
    <h1>Login</h1>
    <a :href="SERVER_BASE_URL + '/login/facebook?redirectUrl=' + APP_URL">Facebook Login</a>
    <a :href="SERVER_BASE_URL + '/login/google?redirectUrl=' + APP_URL">Google Login</a>
  </v-layout>
</template>

<script>
import config from '../services/config';

export default {
  name: 'Login',
  components: {  },
  methods: {
  },
  data () {
    return {
      SERVER_BASE_URL: config.SERVER_BASE_URL,
      APP_URL: config.APP_URL
    }
  }
}
</script>

<style scoped>
</style>
