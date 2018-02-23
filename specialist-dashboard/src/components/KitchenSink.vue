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

    {{showModal==true}}
    <button @click="showModal=true">open modal</button>
    <modal v-bind:onESC="closeModal" v-if="showModal==true">
      <date-picker v-model="time1" format="yyyy-MM-dd HH:mm:ss" lang="en" :placeholder="'Select date and time'" :type="'datetime'" :first-day-of-week="1"></date-picker>
      <date-picker v-model="time3" :lang="'en'" :first-day-of-week="1"></date-picker>
      <date-picker v-model="time2" :lang="'en'" range :shortcuts="shortcuts"></date-picker>

      <button @click="showModal=false">close modal</button>
    </modal>

    <div>
      selected filter : {{selectedFilter}}
      <tickets-filter :filterChanged="ticketFilterChanged" :buttonFilters="filters.buttons" :dropDownFilters="filters.dropDown">

      </tickets-filter>
    </div>
  </div>
</template>

<script>
import RadioBoxes from '@/components/RadioBoxes'
import AutoComplete from '@/components/AutoComplete'
import AddressPicker from '@/components/AddressPicker'
import GroupMessagePreview from '@/components/GroupMessagePreview'
import DatePicker from 'vue2-datepicker'
import Modal from '@/components/Modal'
import TicketsFilter from '@/components/TicketsFilter'


export default {
  components: { RadioBoxes, AutoComplete, AddressPicker, GroupMessagePreview, DatePicker, Modal , TicketsFilter},
  data () {
    return {
      showModal: false,
      time1: '',
      time2: '',
      time3:'',
      shortcuts: [
        {
          text: 'Today',
          start: new Date(),
          end: new Date()
        }
      ],
      exampleTicket: {
        elderFirstName: "שמוליק",
        elderAddress: "המייסדים 25, גבעתיים",
        ticketDescription: "ליווי לקניית רדיאטור חדש",
        ticketTiming: "היום או מחר",
        ticketPermalink: "https://bit.ly/dorldor"
      },
      selectedFilter: { },
      filters: {
          buttons: [
            {
              name: 'open',
              count: 4
            },
            {
              name: 'today',
              count: 3
            },
            {
              name: "before execution",
              count: 12
            }
          ],
          dropDown: [
            {
              name: 'drafts',
              count: 2
            },
            {
              name: 'before approval',
              count: 4
            },
            {
              name: 'not approved',
              count: 4
            },
            {
              name: 'before assign',
              count: 5
            },
            {
              name: 'closed',
              count: 20
            }
          ]
      }
    }
  },
  methods: {
    closeModal: function() {
      this.showModal = false;
    },
    ticketFilterChanged: function(newFilter) {
      this.selectedFilter = newFilter;
    },
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
