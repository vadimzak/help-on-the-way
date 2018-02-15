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

  </div>
</template>

<script>
import RadioBoxes from '@/components/RadioBoxes'

export default {
  components: { RadioBoxes },
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
</style>
