<template>
  <div v-on-click-outside="showAsLabel">
    <div v-if="!showEditableInput">
      <span>{{_value}}</span>
      <i v-on:click="showAsInput" v-bind:class="icon"></i>
    </div>
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
</style>
