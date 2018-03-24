<template>
  <v-layout column wrap>
    <div class="divider-title">
      <div class="divider-text">
 יש לנו עבורך <span class="highlighted"> {{openTickets.length}} הזדמנויות </span> לעשות מעשה טוב בדרך שלך
      </div>
      <img src="static/assets/homepage.png" class="divider-image">
    </div>
        <OpenTicketsList/>
  </v-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {TicketPreview, OpenTicketsList } from '@/components/features/ticket/'
export default {
  components: { TicketPreview, OpenTicketsList },
    data () { return {} },
  computed: {
    ...mapState(['openTickets'])
  },
  methods: {}
}
</script>

<style scoped>

  .divider-title {
    height: 180px;
    position: relative;
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
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    text-align: center;
    color: #1273ff;
    width: 70%;
    margin: auto;
    margin-top: 0;
    z-index: 1;
  }

  .divider-text i {
    display:block;
  }
  .list__tile__sub-title, .list__tile__title{
    text-align:right;
  }

  .list__tile__content{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .highlighted{
    background-color: #1273ff;
    color: white;
  }

  .related-tickets li:first-of-type{
    border-right:6px solid #ff5f5f;
  }
  .related-tickets li:nth-of-type(2){
    border-right:6px solid #23f7c4;
  }
  .related-tickets li:nth-of-type(3){
    border-right:6px solid #fff34c;
  }
  .related-tickets li:nth-of-type(4){
    border-right:6px solid #ff9141;
  }
</style>
