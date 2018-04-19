<template>
  <div>
    <div v-show="!chosen || !options.toggleOnChoice">
      <input
        :placeholder="this.placeholder"
        v-model="textInput"
        @input="searchIfNeeded"
        ref="inputField"
        @keyup.down="selectNext"
        @keyup.up="selectPrev"
        @keyup.enter="chooseResult"
        @blur="checkEmpty"
      />
      <div class="results" v-if="results.length">
        <div
          v-for="(result, index) in results" 
          :key="index"
          class="result"
          :class="{selected:index==currentlySelected}"
          @click="chooseResult(index)"
          @mouseover="selectResult(index)"
        >
        <slot :item="result" :index="index">
          {{result.description}}
        </slot>
        </div>
      </div>
    </div>
    <div v-if="chosen && options.toggleOnChoice">
        <slot :item="value">
          {{value }}
        </slot>
      <b-button @click="unchoose">עריכה</b-button>
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types';
export default {  
  components: {  },
  props: {
    options: VueTypes.shape({ 
      toggleOnChoice: VueTypes.bool,
      }).def({ toggleOnChoice: true}), 
    placeholder: String,
    searchFunction: Function,
    value: Object,
    itemTextFormater: Function,
  },
  created(){
  },
  data () {
    return {
      textInput: '',
      results: [],
      chosen: !!this.value,
      currentlySelected: undefined
    }
  },
  methods: {
    async searchIfNeeded(){
      if(this.textInput != ''){
        this.results = []
        const results = await this.searchFunction(this.textInput)
        this.results = results
      } else {
        this.results = []
      }
    },
    selectResult(index){
      this.currentlySelected = index
    },
    selectNext(){
      if(this.currentlySelected===undefined) {
        this.currentlySelected = 0 
      } else {
        this.currentlySelected++
        this.currentlySelected = this.currentlySelected%this.results.length
      }
      const selected = this.results[this.currentlySelected]
      this.textInput = this.itemTextFormater ? this.itemTextFormater(selected) : selected
    },
    selectPrev(){
      if(!this.currentlySelected) {
        this.currentlySelected = this.results.length-1
      } else {
        this.currentlySelected--
        this.currentlySelected = this.currentlySelected%this.results.length
      }
    },
    chooseResult(){
      if(this.results.length){
        this.chosen = true
        const choice = this.results[this.currentlySelected]
        this.textInput = '';
        this.results = [];
        this.$emit('input', choice)
      }
    },
    unchoose(){
      this.chosen = false
      this.textInput = this.itemTextFormater ? this.itemTextFormater(this.value) : this.value
      this.results = []
      this.currentlySelected = undefined
      this.$nextTick(() => {
        this.$refs.inputField.focus()
        this.$refs.inputField.select()
      })
      this.searchIfNeeded()
      this.$emit('input', null)
    },
    checkEmpty(){
      if(this.textInput == ''){
        this.results = []
      }
    }
    
  }
}
</script>

<style scoped>
:host{
  position: relative;
}

input{
  width: 100%
}

.results{
  z-index: 11;
  background-color: white;
  position: absolute;
}
.result{
  border: 1px solid #777;
  border-top: none;
  padding: 3px 5px 3px 5px;
  cursor: pointer;
}

.result.selected{
  font-weight: bold;
  background-color: rgba(0,0,0,0.1)
}
</style>
