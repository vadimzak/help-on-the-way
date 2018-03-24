<template>
  <v-layout column wrap class="">
    <div class="related-tickets">
      <v-list three-line>
        <template v-for="(ticket, index) in $data.related">
          <v-list-tile avatar :key="ticket.title" @click="$router.replace('/ticket/'+ticket.id)">
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
          <v-divider></v-divider>
        </template>
      </v-list>
    </div>
  </v-layout>
</template>

<script>
  import config from '../services/config';

  export default {
    name: "related-tickets",
    components: {},
    methods: {},
    data() {
      return {
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

<style scoped>

  .list__tile__sub-title, .list__tile__title {
    text-align: right;
  }

  .list__tile__content {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .related-tickets li:first-of-type {
    border-right: 6px solid #ff5f5f;
  }

  .related-tickets li:nth-of-type(2) {
    border-right: 6px solid #23f7c4;
  }

  .related-tickets li:nth-of-type(3) {
    border-right: 6px solid #fff34c;
  }

  .related-tickets li:nth-of-type(4) {
    border-right: 6px solid #ff9141;
  }

</style>
