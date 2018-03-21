<template>
  <b-form  @submit="onSubmit" class="w-100">
      <b-form-group>
              <label for="elderFirstName">שם פרטי</label>
              <b-form-input id="elderFirstName" type="text" v-model="elder.firstName" required></b-form-input>
              <label for="elderLastName">שם משפחה </label>
              <b-form-input id="elderLastName" type="text" v-model="elder.lastName" required></b-form-input>
      </b-form-group>
      <b-form-group>
              <label for="elderPhone">טלפון</label>
              <b-form-input id="elderPhone" type="text" v-model="elder.phone" required></b-form-input>
      </b-form-group>
    <b-form-group label="מין">
      <b-form-radio-group id="elderGender" v-model="elder.gender" name="gender" required>
        <b-form-radio value="male">זכר</b-form-radio>
        <b-form-radio value="female">נקבה</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
    <b-form-group label="כתובת">
        <InputAddress class="w-100" :keepOpen="true" v-model="elder.address"></InputAddress>
    </b-form-group>    
    <b-form-group label="תאריך לידה">
        <DatePicker placeholder="בחר תאריך לידה" :inline="true" language="he" required></DatePicker>
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

export default {
  props: ['elder', 'onSave'],
  components: { DatePicker, InputAddress },
  methods: {
      onSubmit(event){
        event.preventDefault();
        this.onSave(this.elder);
      }
  }
}
</script>
<style>

</style>
