<template>
    <div>
        <RadioBoxes :options="timeOptions" :value="pickerValue" @input="pickedTime" />
        <label  v-if="pickerValue === 'other'">זמן אחר (דקות)
            <b-form-input type="number" min="1" :value="value" @change="(e) => updateValue(e.target.value)"/>
        </label>
    </div>
</template>
<script>
import RadioBoxes from '@/components/inputs/RadioBoxes'
export default {
  components: { RadioBoxes },
  props: ['value'],
  data(){
      const timeOptions = [
              { text: 'רבע שעה', value: 15 },
              { text: 'חצי שעה', value: 30 },
              { text: 'שעה', value: 60 },
              { text: 'שעה וחצי', value: 90 },
              { text: 'שעתיים', value: 120 },
              { text: 'אחר', value: 'other' },
          ]
      const timeOptionsAsValues = timeOptions.map( t => t.value)
      return {
          otherTime: undefined,
          otherOpen: false,
          timeOptions,
          timeOptionsAsValues,
          pickerValue: this.value && !timeOptionsAsValues.includes(this.value) ? 'other' : this.value
      }
  },
  computed: {
  },
  methods: {
      updateValue(value){
          this.$emit('input', value);
      },
      pickedTime(value){
          if(value !== 'other'){
              this.updateValue(value);
          } else{
            this.updateValue(null);
          }
          this.pickerValue = value
      }
  }
}
</script>
<style scoped>

</style>
