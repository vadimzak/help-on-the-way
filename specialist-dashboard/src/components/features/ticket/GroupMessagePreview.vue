<template>
  <div>
    <textarea
      v-model="textareaText"
      @input="modifyText"
    >
    </textarea>
    <br />
    <button v-show="modified" @click="undoMods">בטל שינוים בהודעה</button>
  </div>
</template>

<script>
export default {
  components: {  },
  props: [ 'ticket' ],
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
    this.$emit('initialValue', this.textareaText)
  },
  methods: {
    modifyText(){
      if(!this.modified){
        this.modified = true
      } 
      this.$emit('change', this.textareaText)
    },
    undoMods(){
      this.modified = false
      this.compileText()
    },
    compileText(){
      this.textareaText = `${this.ticket.elderFirstName}, מ${this.ticket.elderAddress}, צריך/ה עזרה ב${this.ticket.ticketDescription} ${this.ticket.ticketTiming}.\nרוצה לעזור ל${this.ticket.elderFirstName}? לחץ על הקישור: ${this.ticket.ticketPermalink}`
    }
  }
}
</script>

<style scoped>
textarea{
  width: 400px;
  height: 80px;
}
</style>
