<template>
<div class="need-to-know">
  <div class="section-title">
      <i class="material-icons">star</i>
    דברים שחשוב לדעת
  </div>
<div class="items-list"> 
  <ul>
          <li v-for="info in items">
            {{info}}
          </li>
        </ul>
</div>
</div>
</template>

<script>
  export default {
    props: ['items'],
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
.need-to-know{
  margin-bottom:10px;
}

.need-to-know .section-title{
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

div i {
margin-left:10px;
}

.items-list{
padding-right: 50px;
}
</style>
