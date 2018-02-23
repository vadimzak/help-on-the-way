<template>
  <div>
      <h2>פתיחת פניה חדשה</h2>
      <p class="small">נא לבחור את מקור הפניה.</p>
      <RadioBoxes :options="sources"/>
  </div>
</template>
<script>
import RadioBoxes from '@/components/inputs/RadioBoxes';
export default {
  components: { RadioBoxes },
  data() {
    return {
      sources: [
      { text: 'זקן', 'icon': '', value: 'elder' },
      { text: 'עו״ס', 'icon': '', value: 'social_worker' },
      { text: 'מתנדב', 'icon': '', value: 'volunteer' },
      { text: 'קרוב משפחה', 'icon': '', value: 'relative' },
      { text: 'אחר', 'icon': '', value: 'other' },
    ]
  }
  }
}
</script>
