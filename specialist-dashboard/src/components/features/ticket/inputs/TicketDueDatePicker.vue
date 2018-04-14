<template>
<div class="d-flex justify-content-between">
    <RadioBoxes :options="radioOptions" :value="selected" @input="changeTimeOption" />
    <DatePicker input-class="form-control"	 placeholder="הזן תאריך" :disabled="disabledDates" language="he" @input="updateInput" v-if="selected === 'fixed'"  :value="value"></DatePicker>
</div>
</template>
<script>

import DatePicker from 'vuejs-datepicker'

import RadioBoxes from '@/components/inputs/RadioBoxes'
export default {
  components: { DatePicker, RadioBoxes },
  props: ['value'],
  data(){
      return {
          selected: null,
          disabledDates: { to: this.$moment().subtract(1, 'day').toDate() }, // all dates before today
          radioOptions: [{ value: 'flexible', text: 'במהלך השבוע' }, { value: 'fixed', text: 'בתאריך ספציפי' }],
      }
  },
  mounted(){
      this.selected = this.value ? 'fixed' : 'flexible'
  },
  methods: {
      updateInput(date){
        this.$emit('input', date)
      },
      changeTimeOption(value){
          if(value === 'flexible' || !value){
            this.$emit('input', null)
          } else {
              this.$emit('input', new Date()) // default specifc date is today
          }
          this.selected = value ? value : 'flexible';
      }
  },
}
</script>
<style scoped>
</style>

