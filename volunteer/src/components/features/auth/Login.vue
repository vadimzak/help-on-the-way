<template>
  <v-layout column wrap class="container">
						<h1>התחברות</h1>
            <div class="social-login">
              <a :href="`${SERVER_BASE_URL}/login/facebook?redirectUrl=${redirectUrl}`"
                 class="btn-login-with bg1 m-b-10">
                <i class="fa fa-facebook-official fa-lg"></i>
                Login with Facebook
              </a>

              <a :href="`${SERVER_BASE_URL}/login/google?redirectUrl=${redirectUrl}`"
                 class="btn-login-with bg2">
                <i class="fa fa-google fa-lg"></i>
                Login with Google
              </a>
            </div>
  </v-layout>
</template>

<script>
import config from '@/services/config';

export default {
  components: {  },
  methods: {},
  data () {
    return {
      redirectUrl: `${window.location.origin}`,
      SERVER_BASE_URL: config.SERVER_BASE_URL,
      APP_URL: config.APP_URL
    }
  }
}
</script>

<style scoped>
  h1{
    text-align: center;
  }
  .social-login{
    position:relative;
    float: left;
    width: 100%;
    height:auto;
    padding: 10px 0 15px 0;
    border-bottom: 1px solid #eee;
    display:flex;
    flex-direction: column;
  }
  .social-login a{
    position:relative;
    float: left;
    text-decoration: none;
    color: #fff;
    border: 1px solid rgba(0,0,0,0.05);
    padding: 12px;
    border-radius: 2px;
    font-size: 12px;
    text-transform: uppercase;
    text-align:center;
    flex:1;
    margin-top: 4vh;

  }
  .social-login a i{
    position: relative;
    float: left;
    width: 20px;
    top: 2px;
  }
  .social-login a:first-child{
    background-color: #49639F;
  }
  .social-login a:last-child{
    background-color: #DF4A32;
  }
</style>
