<template>
  <div>
    <div 
      class="option"
      v-for="(option,index) of options" 
      :key="index"
      @click="changeSelection(index)"
      :class="{selected: index==currentSelection}"
    >
      {{option.text}}
    </div>
  </div>
</template>

<script>
export default {
  components: {  },
  props: [ 'options' ],
  data () {
    return {
      currentSelection: undefined,
    }
  },
  methods: {
    changeSelection(index){
      if(this.currentSelection==index){
        this.currentSelection = undefined
      } else {
        this.currentSelection = index
      }
      this.$emit('change', this.currentSelection)
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

  .option:hover{
    background-color: #eee;
  }

  .option.selected{
    background-color: #333;
    color: #eee;
  }
</style>
