<template>
    <div>
    <b-button 
        v-on-click-outside="() => showButtons = false"
        @click="showButtons = !showButtons"
        :id="compId" :variant="value ? 'primary' : 'secondary'">
        {{mainBtnText}}
    </b-button>
      <b-tooltip :target="compId" placement="bottom" triggers="click" :show.sync="showButtons" :container="compId">
        <b-button-group>
            <b-btn
                @click="() => valueChosen(btn.value)" 
                v-for="btn in buttons" :key="btn.value" :variant="value === btn.value ? 'primary' : 'secondary'">
                {{btn.text}}
            </b-btn>
        </b-button-group>
       </b-tooltip>
    </div>
</template>
<script>
import VueTypes from 'vue-types';
let counter = 0;
export default {
props: {
      value: VueTypes.any,
      buttons: VueTypes.arrayOf(VueTypes.shape({
          text: String,
          value: VueTypes.any,
      })).isRequired,
      placeholder: String,
  },
  data(){
      const buttonsAsMap = this.buttons.reduce((map, curr) => {
          map[curr.value] = curr.text
          return map
      }, {})
      return {
          showButtons: false,
          compId: 'btn-options-button-' + counter++,
          buttonsAsMap,
      }
  },
    methods: {
        valueChosen(value){
            this.$emit('input', value)
            this.showButtons = false
        }
    },
    computed: {
          mainBtnText(){
              return this.buttonsAsMap[this.value] || this.placeholder
          }
      }, 
}
</script>

<style scoped>
     >>> .tooltip.show{
        opacity: 1;
    }
    >>> .arrow::before{
            border-bottom-color: var(--secondary);
    }
    >>> .tooltip-inner{
        max-width: unset;
        padding: 0;
        background-color: var(--secondary);
    }
</style>
