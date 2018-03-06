<template>
  <v-layout column wrap>
    <h1>phone number</h1>
    <form>
        <h2>הכנס את מס' הנייד שלך לצורך אימות</h2>
        <input type="text" name="phoneNumber" placeholder="מס' נייד" v-model="phoneNumber" />
        <button type="button" @click="submit()">Submit</button>
    </form>
  </v-layout>
</template>

<script>
import config from '../services/config';
import loginRoutes from '../router/login';

export default {
	name: 'LoginUpdate',
	methods: {
		submit: async function() {
			let { status, body } = await this.$http.post(`${config.SERVER_BASE_URL}/phone/update`, {
				phoneNumber: this.phoneNumber
			});

			if (status == 200) {
				this.$router.push(loginRoutes.paths.verify);
			} else {
				alert(body);
			}
		}
	}
};
</script>

<style scoped>

</style>
