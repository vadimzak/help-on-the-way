<template>
  <div v-on-click-outside="() => isOpen = false">
      <div v-if="isOpen"><slot name="input"></slot></div>
      <div v-else  @click="() => isOpen = !isOpen"><i class="material-icons ml-3">mode_edit</i><slot name="label"></slot></div>
  </div>
</template>
<script>
export default {
  props: ['intialState'],
  data(){
      return { isOpen: this.intialState,  }
  }
}
</script>
<style scoped>
  .material-icons{
    color: var(--primary);
  }
</style>
