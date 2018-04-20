<template>
  <v-layout column wrap class="container">
	  <div class=" text-xs-center"><img src="static/assets/update-phone.png" class="img-responsive" title="התחברות"></div>
      <div class="message">
        <h4 class="headline text-xs-center color-secondary">נשמח לקבל את הטלפון שלך</h4>
          <div class="body-2 color-secondary text-xs-center">
               <p> כדי שנוכל לצרף אותך לקבוצת הוואטסאפ של עזרה בדרך  </p>
               <p> אין שם חפירות – רק עדכונים על פניות חדשות  </p>
          </div>
      </div>
      <v-form  v-model="valid" ref="form">              
        <v-text-field
          v-model.lazy="phoneNumber"
          class="text-xs-left phone-input"
          type="phone"
          @blur="postponeValidation = false"
          placeholder="מספר הנייד שלך"
          :rules="[v => postponeValidation || !!v.match(/^\d{10}$/) || 'מספר נייד תקין בלבד, 10 ספרות']"
          required>
        </v-text-field>
        <v-btn block :disabled="!phoneNumber.match(/^\d{10}$/)" depressed @click="submit()" color="primary">אחלה, צרפו אותי!</v-btn>
      </v-form>
  </v-layout>
</template>

<script>
import config from '@/services/config';
import { paths as loginRoutes } from '@/router/login';

export default {
	name: 'LoginUpdate',
	data() {
		return {
      valid: undefined,
      postponeValidation: true,
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
h4{
  font-weight: bold;
}

.message p{
    text-align: center;
    margin-bottom: 0;
}
</style>
