<template>
  <div>
    <div 
      class="option text-center"
      v-for="(option,index) of options" 
      :key="index"
      @click="changeSelection(option.value)"
      :class="{selected: option.value === currentSelection}"
    >
    <span class="option-icon" :class="{ ['icon-' + option.icon ] : true }"></span>
      {{option.text}}
    </div>
  </div>
</template>

<script>
export default {
  components: {  },
  props: [ 'options', 'value' ],
  data () {
    return {
      currentSelection: this.value,
    }
    
  },
  methods: {
    changeSelection(value){
      if(this.currentSelection === value){
        this.currentSelection = ''
      } else {
        this.currentSelection = value
      }
      this.$emit('input', this.currentSelection)
    }
  }
}
</script>

<style scoped>
  .option{
    display: inline-block;
    padding: 20px;
    border: 1px solid #333;
    margin: 5px;
    cursor: pointer;
    user-select: none;
  }

  .option-icon{
    display: block;
    text-align: center;
    font-size: 40px;
  }
  .option:hover{
    background-color: #eee;
  }

  .option.selected{
    background-color: #333;
    color: #eee;
  }
</style>
