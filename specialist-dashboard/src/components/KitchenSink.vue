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

    <h4>אוטוקומפלט גנרי</h4>
    Accepts a searchFunction prop with a signature (inputString, callback)
    
    <auto-complete
      placeholder="התחל להקלד משהו"
      :searchFunction="exampleSearchFunction"
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
import AutoComplete from '@/components/AutoComplete'
import AddressPicker from '@/components/AddressPicker'
import GroupMessagePreview from '@/components/GroupMessagePreview'

export default {
  components: { RadioBoxes, AutoComplete, AddressPicker, GroupMessagePreview },
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
  },
  methods: {
    exampleSearchFunction(input,callback){
      if (input != ''){
        let testResponse = [
          'result 1',
          'result 2',
          'result 3',
          'the fourth results',
          'and the last one'
        ]

        testResponse = testResponse.map(item => { return {
          description: item+' '+input
        }})
        callback(testResponse)
      } else {
        callback([])
      }
    }
  }
}
</script>

<style scoped>
</style>
