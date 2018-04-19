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
  font-family: 'Tahoma';
}

.need-to-know .section-title{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size:15px;
  margin-bottom:6px;
}

div i {
margin-left:10px;
font-size: 25px;
}

.items-list{
padding-right: 52px;
}

.items-list li {
  /* font-size:12px; */
}

</style>
