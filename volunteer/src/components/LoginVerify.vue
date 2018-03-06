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
	methods: {
		submit: async function() {
			let { status, body } = await this.$http.post(`${config.SERVER_BASE_URL}/phone/verify`, {
				verificationCode: this.verificationCode
			});

			if (status == 200) {
				window.location.href = '/';
			} else {
				alert(body);
			}
		}
	}
};
</script>

<style scoped>

</style>
