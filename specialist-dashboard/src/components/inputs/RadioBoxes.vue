<template>
  <div>
    <div 
      class="option text-center"
      v-for="(option,index) of options" 
      :key="index"
      @click="changeSelection(option.value)"
      :class="{selected: option.value === currentSelection}"
    >
    <span class="option-icon" :class="{ [ getIconInfo(option).class ] : true }">{{getIconInfo(option).content}}</span>
      {{option.text}}
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
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
    },
    getIconInfo(option){
      if(!option.icon){
        return { class: '', content: '' }
      }
      if(_.isObject(option.icon)){
        return option.icon
      }
      return { class: option.icon, content: '' }
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
