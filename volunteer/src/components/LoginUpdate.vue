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
import { paths as loginRoutes } from '../router/login';

export default {
	name: 'LoginUpdate',
	data() {
		return {
			phoneNumber: ''
		};
	},
	methods: {
		submit: async function() {
			this.$http
				.post(`${config.SERVER_BASE_URL}/phone/update`, {
					phoneNumber: this.phoneNumber
				})
				.then(({ status, body }) => {
					this.$router.push(loginRoutes.verify);
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
