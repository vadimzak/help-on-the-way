<template>

  <v-layout column  class="container">
	  <div class=" text-xs-center w-100"><img src="static/assets/phone-verify.png" class="img-responsive" title="אימות טלפון"></div>
      <div class="message">
        <h4 class="headline text-xs-center color-secondary">שלחנו לך עכשיו קוד</h4>
          <div class="body-2 color-secondary text-xs-center">
               <p>רק כדי לוודא שקלטנו את המספר שלך נכון,</p>
               <p>  מה הקוד שקיבלת?</p>
          </div>
      </div>
      <v-form>
        <p v-show="displayError" class="error-message">
          אופס נראה שהקוד שהזנת אינו תקין.
        </p>
        <div class="verification-digits">
                <v-text-field type="number" class="digit input-group--focused" @input="(v) => focusInput('Two', v)" v-model="verificationCode[0]" ref="digitOne" mask="#" required></v-text-field>
                <v-text-field type="number" class="digit input-group--focused" @input="(v) => focusInput('Three', v)" v-model="verificationCode[1]" ref="digitTwo" mask="#" required></v-text-field>
                <v-text-field type="number" class="digit input-group--focused" @input="(v) => focusInput('Four', v)" v-model="verificationCode[2]" ref="digitThree" mask="#" required></v-text-field>
                <v-text-field type="number" class="digit input-group--focused" v-model="verificationCode[3]" ref="digitFour" mask="#" required></v-text-field>
        </div>              
        <v-btn block :loading="inProgress" :disabled="!valid" depressed @click="submit()" color="primary">בוא נתחיל לעזור לאנשים</v-btn>
        <div class="text-xs-center"><a  @click="retry">לא קיבלתי קוד</a></div>
      </v-form>
  </v-layout>
</template>

<script>
import config from '@/services/config';
import { paths } from '@/router/login';

export default {
	data() {
		return {
      verificationCode: [],
      code: [],
      inProgress: false,
      displayError: undefined,
		};
  },
  computed: {
    valid(){
      const isValidDigit = this.validDigit;
      return this.verificationCode.filter(d => isValidDigit(d)).length === 4
    }
  },
	methods: {
    validDigit(d){
      return d !== undefined && d !== '' && d!==null
    },
		submit: async function() {
      if(this.inProgres){
        return;
      }
      this.displayError = false
      this.inProgress = true
			this.$http
				.post(`${config.SERVER_BASE_URL}/phone/verify`, {
					verificationCode: this.verificationCode.join('')
				})
				.then(({ status, body }) => {
					window.location.href = '/';
				})
				.catch(({ status, body }) => {
					this.displayError = true
				}).finally(() => this.inProgress = false)
    },
    focusInput(number, v){
      const ref = this.$refs['digit' + number]
      if(this.validDigit(v)){
      setTimeout(() => {
        ref.$el.querySelector('input').focus()
      }, 0);
      }
    },
    retry(){
      	this.$router.push(paths.update);
    }
	}
};
</script>

<style scoped>
.verification-digits{
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
>>> .digit{
  flex-grow: unset !important;
}
>>> .digit input{
  text-align: center !important;
}
.error-message{
  color: var(--pink)
}
.message p{
    text-align: center;
    margin-bottom: 0;
}
</style>
