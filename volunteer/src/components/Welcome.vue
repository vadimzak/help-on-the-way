<template>
  <v-layout column wrap>
    <div class="divider-title">
      <div class="divider-text">
 יש לנו עבורך <span class="highlighted"> 5 הזדמנויות </span> לעשות מעשה טוב בדרך שלך
      </div>
      <img src="static/assets/homepage.png" class="divider-image">
    </div>

    <div class="related-tickets">
      <v-list three-line>
        <template v-for="(ticket, index) in $data.related">
          <v-list-tile avatar :key="ticket.title" @click="setPreview(index)" v-if="index !== preview">
            <v-list-tile-content>
              <div class="related-title">
                <v-list-tile-title v-html="ticket.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="ticket.where"></v-list-tile-sub-title>
              </div>
              <div class="related-when">
                {{ticket.when}}
              </div>
              <div class="related-duration">
                {{ticket.durationEta}}
              </div>
            </v-list-tile-content>
          </v-list-tile>
          <ticket-preview v-else :closePreview="closePreview"></ticket-preview>
          <v-divider></v-divider>
        </template>
      </v-list>
    </div>
  </v-layout>
</template>

<script>
import TicketPreview from './TicketPreview'

export default {
  name: 'Welcome',
  components: { TicketPreview },
  methods: {
    setPreview: function(index) {
      this.preview = index !== this.preview ? index : null;
    },
    closePreview: function(index) {
      this.preview = null;
    }
  },
  data () {
    return {
      preview: null,
      related: [
        {
          title: 'ליווי משה לקניית תרופות',
          where: 'הרצל פינת פלורנטין, תל אביב',
          when: 'היום',
          durationEta: '45 דקות',
          id: 2,
        },
        {
          title: 'תיקון קומקום לאהרון',
          where: 'ארלוזורוב, תל אביב',
          when: 'מחר',
          durationEta: '30 דקות',
          id: 3
        },
        {
          title: 'ישיבה לקפה עם קלרה',
          where: 'קפה city, פלורנטין 78 תל אביב',
          when: 'מחר',
          durationEta: '1.5 שעות',
          id: 4
        },
        {
          title: 'הדרכת מחשב לשרה',
          where: 'ארלוזורוב, תל אביב',
          when: 'חמישי',
          durationEta: '2 שעות',
          id: 5
        },
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
