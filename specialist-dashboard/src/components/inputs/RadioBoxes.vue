<template>
  <div class="boxes-container">
    <div class="box"
      v-for="(option,index) of options" 
      :key="index"
      @click="changeSelection(option.value)"
      :class="{selected: option.value === value}"
    >
      <div v-if="option.icon" class="box-content" :class="{ [ getIconInfo(option).class ] : true }">
        {{getIconInfo(option).content}}
        <span class="box-text">{{option.text}}</span>
      </div>
      <b-button v-if="!option.icon" class="box-button" 
      :variant="option.value === value ? 'primary' : 'secondary'">
        <span class="box-text">{{option.text}}</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  components: {  },
  props: [ 'options', 'value' ],
  methods: {
    changeSelection(value){
      let valueToUpdate;
      if(this.value === value){
        valueToUpdate = null
      } else {
        valueToUpdate = value
      }
      this.$emit('input', valueToUpdate)
    },
    getIconInfo(option){
      if(_.isObject(option.icon)){
        return option.icon
      }
      return { class: option.icon, content: '' }
    }
  }
}
</script>

<style scoped>
  .boxes-container{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  .box{
    margin: 5px;
    cursor: pointer;
    user-select: none;
    text-align: center;
  }
  .box-content{
    display: flex;
    flex-direction: column;
    font-size: 40px;
    padding: 20px;
  }
  .box-text{
    font-family:  'Open Sans Hebrew';
    font-size: 1.4rem;
  }
  .box:hover{
    background-color: #eee;
  }
  .box.selected{
    color: #0089fd;
  }
</style>
