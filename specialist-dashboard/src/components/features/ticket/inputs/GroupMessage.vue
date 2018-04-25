<template>
  <div>
    <textarea
      v-model="textareaText"
      @input="modifyText"
    >
    </textarea>
    <br />
    <b-button v-show="modified" @click="undoMods" >בטל שינוים בהודעה</b-button>
  </div>
</template>

<script>

import TicketCategoryType from 'shared/constants/enums/TicketCategory'
export default {
  
  components: {  },
  props: [ 'ticket'],
  data () {

    return {
      modified: false,
      textareaText: ''
    }
  },
  watch:{
    ticket(){
      if(!this.modified) this.compileText()
    }
  },
  created(){
    this.compileText()
    this.$emit('input', this.textareaText)
  },
  methods: {
    modifyText(){
      if(!this.modified){
        this.modified = true
      } 
      this.$emit('input', this.textareaText)
    },
    undoMods(){
      this.modified = false
      this.compileText()
      this.$emit('input', this.textareaText)
    },
    compileText(){
      this.textareaText = 'היי :) חברים!' + this.buildTextByCategory(this.ticket.category) + 'מישהו יכול לעזור? הנה כל הפרטים?';
  
    },
    getDueDateAlias(dueDate){
        if(!dueDate){
          return 'במהלך השבוע'
        }
        return this.$moment(dueDate).calendar(null, {
          sameDay: 'היום',
          nextDay: 'מחר',
          nextWeek: 'ביום dddd',
          sameElse: 'בתאריך D.M'
      });
    },
    getDueTime(ticket){
        if(ticket.dueTime){
          return ` בשעה ${this.$options.filters.formatTicketTime(ticket)}`
        } else if( ticket.details.flexibleTime === allday){
          return ``
        } else {
          return ` בשעות ${this.$options.filters.formatTicketTime(ticket)}` 
        }
    },
    getStartAddres(){
        return this.ticket.startAddress ? this.ticket.startAddress.street : this.ticket.details.startAddressAlias
    },
    getDestAddres(){
        return this.ticket.details.destinationAddressAlias || (this.ticket.destinationAddress ? this.ticket.destinationAddress.street : '')
    },
    getWordByGender(maleWord,FemaleWord){
        return this.ticket.elder.gender === 'MALE' ? maleWord : FemaleWord
    },
    buildTextByCategory(category){

      switch(category){
        case TicketCategoryType.medical.value:
          return this.buildCategoryMedicalMessage();
        case TicketCategoryType.social.value:
          return this.buildCategorySocialMessage();
        case TicketCategoryType.repairs.value:
          return this.buildCategoryRepearMessage();
        case TicketCategoryType.shopping.value:
          return this.buildCategoryShoppingMessage();
        case TicketCategoryType.socialEscort.value:
          return this.buildCategorySocialEscortMessage();
        case TicketCategoryType.instructions.value:
          return this.buildCategoryInstructionsMessage();
        case TicketCategoryType.clean_organize.value:
          return this.buildCategoryCleanOrganizeMessage();
        case TicketCategoryType.bureaucracy.value:
          return this.buildCategoryBureaucracyMessage();
      }
    },
  
    buildCategoryMedicalMessage(){
      return `${this.ticket.elder.firstName} מ${this.getStartAddres()} ${this.getWordByGender('צריך', 'צריכה')} לווי ל${(this.ticket.details.subject || this.getDestAddres())} ${this.getDueDateAlias(this.ticket.dueDate)}${this.getDueTime(this.ticket)}. רוצה לעזור ל ${this.ticket.elder.firstName}? ` ;
   
    },
    buildCategorySocialMessage(){
       return `${this.ticket.elder.firstName} מ${this.getStartAddres()} רוצה  עזרה  ב ${this.ticket.details.subject} ${this.getWordByGender('והיה', 'והייתה')} ${this.getWordByGender('שמח', 'שמחה')} שזה יקרה ${this.getDueDateAlias(this.ticket.dueDate)} 🔧 . רוצה לעזור ל ${this.ticket.elder.firstName}? ` ;
  
    },
    buildCategoryRepearMessage(){
      return `${this.ticket.elder.firstName} מ${this.getStartAddres()} ${this.getWordByGender('צריך', 'צריכה')} עזרה בתיקון של ${this.ticket.details.subject} ${this.getWordByGender('והיה', 'והייתה')} ${this.getWordByGender('שמח', 'שמחה')} שזה יקרה ${this.getDueDateAlias(this.ticket.dueDate)} 🔧 . רוצה לעזור ל ${this.ticket.elder.firstName}? ` ;
    }, 
    buildCategoryShoppingMessage(){
       return `${this.ticket.elder.firstName} מ${this.getStartAddres()} רוצה לצאת ${this.getDueDateAlias(this.ticket.dueDate)} לקניית ${this.ticket.details.subject} ומחפשת שותפ/ה. רוצה לעזור ל${this.ticket.elder.firstName}?`
    },
    buildCategorySocialEscortMessage(){
      return `${this.ticket.elder.firstName} מ${this.getStartAddres()} רוצה לצאת ${this.getDueDateAlias(this.ticket.dueDate)} ל ${this.ticket.details.subject} ומחפשת שותפ/ה. רוצה לארח חברה ל${this.ticket.elder.firstName}?`
    },
    buildCategoryInstructionsMessage(){
      return `${this.ticket.elder.firstName} מ${this.getStartAddres()} ${this.getWordByGender('צריך', 'צריכה')} עזרה בהדרכה של ${this.ticket.details.subject} ${this.getWordByGender('והיה', 'והייתה')} ${this.getWordByGender('שמח', 'שמחה')} שזה יקרה ${this.getDueDateAlias(this.ticket.dueDate)} 🔧 . רוצה לעזור ל ${this.ticket.elder.firstName}? ` ;
    },
    buildCategoryCleanOrganizeMessage(){
       return `${this.ticket.elder.firstName} מ${this.getStartAddres()} רוצה  עזרה  ב ${this.ticket.details.subject} ${this.getWordByGender('והיה', 'והייתה')} ${this.getWordByGender('שמח', 'שמחה')} שזה יקרה ${this.getDueDateAlias(this.ticket.dueDate)} 🔧 . רוצה לעזור ל ${this.ticket.elder.firstName}? ` ;
    }, 
    buildCategoryBureaucracyMessage(){
      return `${this.ticket.elder.firstName} מ${this.getStartAddres()} ${this.getWordByGender('צריך', 'צריכה')} עזרה בירוקרטית של ${this.ticket.details.subject} ${this.getWordByGender('והיה', 'והייתה')} ${this.getWordByGender('שמח', 'שמחה')} שזה יקרה ${this.getDueDateAlias(this.ticket.dueDate)} 🔧 . רוצה לעזור ל ${this.ticket.elder.firstName}? ` ;
   
    },
  }
}

</script>

<style scoped>
textarea{
  width: 400px;
  height: 80px;
}
</style>
