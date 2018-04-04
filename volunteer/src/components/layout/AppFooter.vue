<template>
  <v-footer app>
    <a href="tel:*5823">
    <span>המוקד שלנו זמין לכל שאלה</span>
    <i class="material-icons">phone</i>
    </a>
  </v-footer>
</template>

<script>
  export default {
    name: 'AppFooter',
    data() {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .application .footer {
    background-color: #1273ff;
    display: flex;
    align-items: center;
    color: white;
    justify-content: center;
  }

  .footer a {
    width:100%;
    text-decoration:none;
    color:white;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }
  .footer a span {
    margin-left:10px;
  }
</style>
