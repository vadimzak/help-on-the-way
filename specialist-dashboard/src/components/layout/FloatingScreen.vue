<template>
<div>
    <b-popover ref="popover" :target="target" boundary="viewport" placement="left" triggers="click" container="floating-screen-container-root">
            <button @click="close" class="close">x</button>
            <slot></slot>
</b-popover>
</div>

</template>
<script>
export default {
  props: {
      target: { type: String, required: true }
  },
  methods: {
      close(){
          this.$refs.popover.$emit('close');
      }
  }
}
</script>

<style scoped>
    .close{
        position: absolute;
        left: 10px;
        top: 10px;
    }
</style>
