<template>
  <div>
    <h3>דוגמאות</h3>
    <h4>לחיצי רדיו</h4>
    <radio-boxes
      :options="[
        {
          text: 'ליווי לחנות',
          icon: 'shopping-cart'
        },
        {
          text: 'ליווי חברתי',
          icon: 'party'
        },
        {
          text: 'ליווי רפואי',
          icon: 'doctor-stethoscope'
        }
      ]"
    />

    <h4>אוטוקומפלט גנרי</h4>
    Accepts a searchFunction prop with a signature (inputString, callback)

    <auto-complete
      placeholder="התחל להקלד משהו"
      :searchFunction="exampleSearchFunction"
    />


    <h4>תצוגה מקדימה להודעה קבוצתית</h4>
    <group-message-preview
      :ticket="exampleTicket"
    />

    <List v-model="exampleListModel" :search="exampleSearchFunction">
      <div slot="auto-complete-result" slot-scope="props">
        {{props.item.description}}
      </div>
      <div slot="list-item" slot-scope="props">
            {{props.item.description}}
      </div>
    </List>

    <div>
      selected filter : {{selectedFilter}}
      <tickets-filter :filterChanged="ticketFilterChanged" :buttonFilters="filters.buttons" :dropDownFilters="filters.dropDown">

      </tickets-filter>
    </div>

     <InputAddress/>
  </div>
</template>

<script>
import RadioBoxes from '@/components/inputs/RadioBoxes'
import AutoComplete from '@/components/AutoComplete'
import TicketsFilter from '@/components/TicketsFilter'
import InputAddress from '@/components/InputAddress'
import List from '@/components/inputs/List'

export default {
  components: { RadioBoxes, AutoComplete, TicketsFilter, InputAddress, List},
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
      exampleListModel: [{name: 'תל אביב'}, {name: 'חיפה'}],
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
