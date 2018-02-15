<template>
  <div>
    <h3>דוגמאות</h3>
    <h4>לחיצי רדיו</h4>
    <radio-boxes
      :options="[
        {
          text: 'ליווי לחנות',
          icon: ''
        },
        {
          text: 'ליווי חברתי',
          icon: ''
        },
        {
          text: 'ליווי רפואי',
          icon: ''
        }        
      ]"
    />

    <h4>בוחר כתובת</h4>
    <address-picker/>

  </div>
</template>

<script>
import RadioBoxes from '@/components/RadioBoxes'
import AddressPicker from '@/components/AddressPicker'

export default {
  components: { RadioBoxes, AddressPicker },
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
</style>
