<template>
  <v-layout column wrap>
    <div class="divider-title">
      <div class="divider-text">
 יש לנו <span class="highlighted"> {{openTickets.length}} הזדמנויות </span> בשבילך לעזור למישהו בדרך שלך
      </div>
      <img src="static/assets/homepage.png" class="divider-image">
    </div>
        <OpenTicketsList/>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import { OpenTicketsList } from '@/components/features/ticket/'
export default {
  components: { OpenTicketsList },
    data () { return {} },
  computed: {
    ...mapState(['openTickets'])
  },
  methods: {}
}
</script>

<style scoped>
  .layout{
    width: 100%;
  }

  .divider-title {
    height: 231px;
    position: relative;
    font-weight: light;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
  }

  .divider-image {
    height: auto;
    width: 100%;
    position: absolute;
    left: 0;
    bottom:0;
    z-index: 0;
  }

  .divider-text {
    padding-top: 36px;
    font-size: 25px;
    font-weight: light;
    font-style: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    text-align: center;
    color: #1273ff;
    width: 80%;
    margin: auto;
    margin-top: 0;
    z-index: 1;
  }

  .divider-text i {
    display:block;
  }


  .highlighted{
    font-weight: bold;
  }

</style>
