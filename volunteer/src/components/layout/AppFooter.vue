<template>
  <v-footer>
    <a href="tel:0505973002">
    <span>אנו זמינים לכל שאלה</span>
    <i class="material-icons phone-icon">phone</i>
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
    background-color:#fafafa;
    display: flex;
    align-items: center;
    color: white;
    justify-content: center;
    /* position: fixed; */
    width:100%;
    bottom:0;
    z-index:10;
  }

  .footer a {
    width:100%;
    text-decoration:none;
    color:white;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1273ff;
    box-shadow: 0px 1px 7px 0 rgba(0, 68, 223, 0.5);
    padding: 10px 5px;
    font-size:15px;
    font-weight: bold;
    margin:0;
  }
  .footer a span {
    margin-left:10px;
  }

  .phone-icon {
    border: 1px solid white;
    border-radius:100px;
    padding:2px;
    font-size:17px;
  }
</style>
