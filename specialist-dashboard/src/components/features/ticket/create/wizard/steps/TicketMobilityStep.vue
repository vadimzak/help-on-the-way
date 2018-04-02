<template>
  <div class="container">

      <div class="elder-mobility">
          <h3 class="mobility-title">ניידות הזקן</h3>
          <p class="sub-title">ציין איך הזקן מתנייד ובעזרת מה הוא מסתייע</p>
            <div class="boxes-wrapper">
                <RadioBoxes :value="ticketSource" @input="sourceChanged" :options="sources"/>
            </div>
      </div>

        <div class="ticket-mobility">
          <h3 class="mobility-title">דרך ההתנייות בפנייה</h3>
          <p class="sub-title">ציין איך הזקן מתנייד ובעזרת מה הוא מסתייע</p>
            <div class="boxes-wrapper">
                <RadioBoxes :value="ticketSource" @input="sourceChanged" :options="sources"/>
            </div>
      </div>

  </div>
</template>

<script>
import RadioBoxes from '@/components/inputs/RadioBoxes';

export default {
components: { RadioBoxes },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
