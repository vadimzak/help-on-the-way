<template>
  <div class="pa-2">
      <div class="upper-message body-2 color-secondary  text-xs-center">
          <p>היי {{currentUserName}},</p>
          <p>הפנייה שנכנסת אליה נענתה ע״י מישהו אחר.</p>
          <p>איזה כיף לדעת ש{{ticket.elder.firstName}} לא לבד!</p>
      </div>
      <div class="py-3 text-xs-center">
          <img class="img-responsive" src="static/assets/matched.png" />
      </div>
      <div class="lower-message body-2 color-primary text-xs-center pb-1">
          <p>יכול להיות שיש עוד מישהו שזקוק לעזרה באזור שלך.</p>
          <p>כל הפניות הפתוחות מופיעות בעמוד הבית</p>
      </div>
      <div class="call-to-action">
            <v-btn block depressed @click="$router.push('/')" color="primary">מי עוד צריך עזרה?</v-btn>
      </div>
  </div>
</template>
<script>
export default {
  props: ['ticket'],
  computed: {
      currentUserName(){
          return this.$store.state.user.name
      }
  },
  beforeMount(){
            this.$store.commit('updateLayoutDisplay', { footer: false, greeting: false })
  }
}
</script>
<style scoped>
    p{
        margin-bottom: 0;
    }
</style>
