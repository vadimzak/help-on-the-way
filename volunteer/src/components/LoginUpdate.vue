<template>
  <v-layout column wrap>
    <form class="container">
      <img src="static/assets/sms.png" class="sms">
      <h2>הכנס את מס' הנייד שלך לצורך אימות</h2>
      <input type="number"
        required
        v-model="phoneNumber"
        ref="number"
        placeholder="05*-*******"
      />
      <v-btn @click="submit()" color="success">שלח קוד</v-btn>

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
