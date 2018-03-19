<template>
  <div v-on-click-outside="showAsLabel" class="editable-input">
    <div v-if="!showEditableInput">
      <span>{{_value}}</span>
    </div>
      <i  v-if="!showEditableInput" v-on:click="showAsInput" v-bind:class="icon" class="icon"></i>
    <div v-if="showEditableInput">
      <textarea type="text" v-if="showAsLabel" v-model="_value" class="edit-box"/>
    </div>
  </div>
</template>

<script>
  import { mixin as onClickOutside } from 'vue-on-click-outside'

  export default {
    mixins: [onClickOutside],
    data () {
      return {
        showEditableInput: false,
        _value: ''
      }
    },
    created: function() {
      this.showEditableInput = this.showInput;
      this._value = this.value;
    },
    props: {
      value: String,
      showInput: Boolean,
      valueChanged: Function,
      icon: String
    },
    methods: {
        showAsLabel: function() {
            this.showEditableInput = false;
            this.valueChanged(this._value);
        },
        showAsInput: function() {
          this.showEditableInput = true;
        }
    }
  }
</script>
<style scoped>
  .edit-box {
    width: 100%;
  }
  .editable-input{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  } 
 .icon{
     color:  #6699ff;
     padding: 0px 0px 10px 5px;
  }


</style>
