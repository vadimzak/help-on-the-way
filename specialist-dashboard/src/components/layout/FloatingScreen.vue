<template>
<div>
    <b-popover ref="popover" @shown="(e) => $emit('shown', e)" @hidden="(e) => $emit('hidden', e)" :target="target" boundary="viewport" placement="bottomleft" triggers="click" container="floating-screen-container-root">
            <button @click="close" class="close">x</button>
            <slot></slot>
</b-popover>
</div>

</template>
<script>
export default {
  props: {
      target: { type: String, required: true },
  },
  methods: {
      close(){
          this.$refs.popover.$emit('close');
          this.$emit('close');
      }
  },
  watch: {
      isOpen(newVal){
          if(newVal){
            this.$refs.popover.$emit('open');
          } else{
            this.$refs.popover.$emit('close');
          }
      }
  }
}
</script>

<style scoped>
    .close{
        z-index: 12;
        position: absolute;
        left: 10px;
        top: 0;
    }
</style>
