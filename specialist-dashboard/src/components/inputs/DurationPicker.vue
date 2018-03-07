<template>
    <div>
        <RadioBoxes :options="timeOptions" @input="pickedTime" />
        <label  v-if="otherOpen">זמן אחר (דקות)
            <input type="number" min="1" v-model="otherTime" @change="(e) => updateValue(e.target.value)"/>
        </label>
    </div>
</template>
<script>
import RadioBoxes from '@/components/inputs/RadioBoxes'
export default {
  components: { RadioBoxes },
  data(){
      return {
          otherTime: undefined,
          otherOpen: false,
          timeOptions: [
              { text: 'רבע שעה', value: 15 },
              { text: 'חצי שעה', value: 30 },
              { text: 'שעה', value: 60 },
              { text: 'שעה וחצי', value: 90 },
              { text: 'שעתיים', value: 120 },
              { text: 'אחר', value: 'other' },
          ]
      }
  },
  methods: {
      updateValue(value){
          this.$emit('input', value);
      },
      pickedTime(value){
          if(value !== 'other'){
              this.otherOpen = false;
              this.updateValue(value);
          } else{
             this.otherOpen = true;
             this.updateValue(this.otherTime);
          }
      }
  }
}
</script>
<style scoped>

</style>
