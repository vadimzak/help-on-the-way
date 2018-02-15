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

    <h4>תצוגה מקדימה להודעה קבוצתית</h4>
    <group-message-preview 
      :ticket="exampleTicket"
    />

  </div>
</template>

<script>
import RadioBoxes from '@/components/RadioBoxes'
import AddressPicker from '@/components/AddressPicker'
import GroupMessagePreview from '@/components/GroupMessagePreview'

export default {
  components: { RadioBoxes, AddressPicker, GroupMessagePreview },
  data () {
    return {
      exampleTicket:{
        elderFirstName: "שמוליק",
        elderAddress: "המייסדים 25, גבעתיים",
        ticketDescription: "ליווי לקניית רדיאטור חדש",
        ticketTiming: "היום או מחר",
        ticketPermalink: "https://bit.ly/dorldor"
      }
    }
  }
}
</script>

<style scoped>
</style>
