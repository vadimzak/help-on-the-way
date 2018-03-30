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
  props: [ 'ticket', 'value' ],
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
      this.textareaText = `${this.ticket.elder.firstName}, מ${this.ticket.elder.lastName}, צריך/ה עזרה ב${this.ticket.ticketDescription} ${this.ticket.ticketTiming}.\nרוצה לעזור ל${this.ticket.elder.firstName}? `
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
