<template>
  <v-layout column class="container">
						<div class="text-xs-center top-image"><img src="static/assets/login.png" class="img-responsive" title="התחברות"></div>
            <div class="message">
              <h4 class="headline mt-2 text-xs-center color-secondary bold">איזה יופי שבאת!</h4>
              <div class="body-2 color-secondary text-xs-center">
               <p>כדי לשמור על הפרטיות של הזקנים, אפשר לצפות </p>
               <p>  בפניות המלאות רק אחרי שנכנסים למערכת </p>
               <p>לוקח פחות מדקה, מדדנו!</p>
                <p class="mt-2 color-primary"> אנו מבטיחים שלא נפרסם שום דבר בשמך </p>
              </div>
            </div>
            <div class="social-login">
              <a :href="`${SERVER_BASE_URL}/login/facebook?redirectUrl=${redirectUrl}`"
                 class="btn-login-with bg1 m-b-10">
                כניסה עם Facebook
              </a>

              <a :href="`${SERVER_BASE_URL}/login/google?redirectUrl=${redirectUrl}`"
                 class="btn-login-with bg2">
                כניסה עם Google
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
.message p{
    text-align: center;
    margin-bottom: 0;
}

.message {
      height: 23vh;
      overflow:hidden;
}
  .social-login{
    position:relative;
    width: 100%;
    display:flex;
    flex-direction: column;
        height: 18vh;
              overflow:hidden;

  }
  .social-login a{
    position:relative;
    text-decoration: none;
    color: #fff;
    border: 1px solid rgba(0,0,0,0.05);
    padding: 1vh;
    font-size: 20px;
    text-align:center;
    flex:1;
    line-height: 1;
    margin-top: 20px;

  }
  .social-login a i{
    position: relative;
    float: left;
    width: 20px;
    top: 2px;
  }
  .social-login a:first-child{
    background-color: var(--primary);
  }
  .social-login a:last-child{
    background-color:var(--pink);
  }

  .top-image {
    height: 40vh;
    overflow:hidden;
  }

  .top-image img {
    height:100%;
    overflow:hidden;
  }
</style>


