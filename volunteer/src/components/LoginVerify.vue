<template>
  <v-layout column wrap>
    <h1>Verification Code</h1>
    <form>
        <h2>אנא הכנס את הקוד שנשלח אלייך בSMS</h2>
        <input type="text" name="verificationCode" v-model="verificationCode" />
        <button type="button" @click="submit()">Submit</button>
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

</style>
