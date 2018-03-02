<template>
  <div>
      <h2>פתיחת פניה חדשה</h2>
      <p class="small">נא לבחור את מקור הפניה.</p>
      <RadioBoxes :options="sources"/>
      <b-btn>המשך</b-btn>
  </div>
</template>
<script>
import RadioBoxes from '@/components/inputs/RadioBoxes';
export default {
  components: { RadioBoxes },
  data() {
    return {
      sources: [
      { text: 'זקן', 'icon': 'old-man-with-cane', value: 'elder' },
      { text: 'עו״ס', 'icon': 'prayer', value: 'social_worker' },
      { text: 'מתנדב', 'icon': 'human-resources', value: 'volunteer' },
      { text: 'קרוב משפחה', 'icon': 'family-group-of-father-and-mother-with-two-babies-and-a-dog', value: 'relative' },
      { text: 'אחר', 'icon': '', value: 'other' },
    ]
  }
  }
}
</script>
