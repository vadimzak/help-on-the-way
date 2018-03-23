<template>
  <b-form  @submit.prevent="onSubmit" class="w-100" novalidate>
      <b-form-group>
              <label for="personFormFirstName">שם פרטי</label>
              <b-form-input id="personFormFirstName" name="firstName" type="text" :state="inputState('firstName')" v-model="firstName"  v-validate="'required'"></b-form-input>
              <label for="personFormLastName">שם משפחה </label>
              <b-form-input id="personFormLastName" name="lastName" type="text" v-model.trim="lastName" :state="inputState('lastName')" v-validate="'required'"></b-form-input>
      </b-form-group>
      <b-form-group>
              <label for="personFormPhone">טלפון</label>
              <b-form-input id="personFormPhone" name="phone" type="text" v-model="phoneNumber"  :state="inputState('phoneNumber')" v-validate="'required'"></b-form-input>
      </b-form-group>
    <b-form-group label="מין">
      <b-form-radio-group>
              <input id="personFormMale" type="radio" name="gender"  v-model="gender" v-validate="'required'" value="MALE"/>
              <label for="personFormMale">זכר</label>
              <input id="personForFemale" type="radio" name="gender" value="FEMALE"/>
              <label for="personForFemale">נקבה</label>
      </b-form-radio-group>
    </b-form-group>
    <b-form-group label="כתובת">
        <InputAddress class="w-100" :keepOpen="true" name="address" v-validate="'address'" v-model="address"></InputAddress>
    </b-form-group>    
    <b-form-group label="תאריך לידה">
        <DatePicker placeholder="בחר תאריך לידה" :inline="true" language="he" name="birthdate" v-model="birthdate"></DatePicker>
    </b-form-group>
    <b-form-row>
        <b-button type="submit" variant="secondary">
            שמור והמשך
        </b-button>
    </b-form-row>
  </b-form>

</template>
<script>
import DatePicker from 'vuejs-datepicker'
import InputAddress from '@/components/InputAddress'
import { PersonTypes } from '@/constants/enums/'
import { mapStateForForm } from '@/store/utils'
import VueTypes from 'vue-types';

export default {
  props: {
    personType: VueTypes.oneOf(Object.values(PersonTypes)),
  },
  computed: {
    ...mapStateForForm(['firstName', 'lastName', 'phoneNumber', 'gender', 'address', 'birthdate'], 'person', 'current', 'person/updateCurrent'),
  },
  components: { DatePicker, InputAddress },
  mounted(){
    this.$store.commit('person/updateCurrent', { type: this.$store.state.person.current.type || this.personType });
  },
  methods: {
      async onSubmit(event){
        const isValid = await this.$validator.validateAll()
        if(isValid){
          await this.$store.dispatch('person/save');
          this.$emit('save', this.$store.state.person.current);
          this.$store.commit('person/setCurrent', {})
        }
      },
      inputState(name){
        const hasError = this.errors.has(name);
        if(hasError === true){
          return 'invalid'
        }
       
        return null
      }
  }
}
</script>
<style>

</style>
