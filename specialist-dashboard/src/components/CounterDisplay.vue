<template>
  <div id="main" :style="style" class="card text-center m-5 p-1">
    <div id="description">{{description}}</div>
      <div id="main-number">({{counterValue}})</div>
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
 .card-deck .card{
    flex-direction: row;
    justify-content: center;
  }
</style>
