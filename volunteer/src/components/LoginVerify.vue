<template>
  <v-layout column wrap>
    <form class="container">
      <img src="static/assets/sms.png" class="sms">
      <h2>אנא הכנס את הקוד שנשלח בSMS</h2>
      <input type="text" name="verificationCode" v-model="verificationCode" />
      <v-btn @click="submit()" color="success">אישור</v-btn>

    </form>
  </v-layout>
</template>

<script>
import config from '../services/config';
import loginRoutes from '../router/login';

export default {
	name: 'LoginVerify',
	data() {
		return {
			verificationCode: ''
		};
	},
	methods: {
		submit: async function() {
			this.$http
				.post(`${config.SERVER_BASE_URL}/phone/verify`, {
					verificationCode: this.verificationCode
				})
				.then(({ status, body }) => {
					window.location.href = '/';
				})
				.catch(({ status, body }) => {
					alert(body);
				});
		}
	}
};
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .sms {
    max-width: 30%;
  }

  input {
    width: 60%;
    height: 40px;
    font-size: 32px;
    direction: ltr;
    border-bottom: 1px solid lightgray;
  }
</style>
