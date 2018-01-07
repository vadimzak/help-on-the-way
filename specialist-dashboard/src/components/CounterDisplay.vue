<template>
  <div id="main" :style="style" class="card text-center m-4 p-3">
    <div id="main-number">{{counterValue}}</div>
    <div id="description">{{description}}</div>
  </div>
</template>

<script>
export default {
  props: ['counterValue', 'description', 'color'],
  data () {
    return {
    }
  },
  computed: {
    style(){
      return `background-color: ${this.color};`
    }
  }
}
</script>

<style scoped>
#main-number{
  font-size: 3em;
}
</style>
