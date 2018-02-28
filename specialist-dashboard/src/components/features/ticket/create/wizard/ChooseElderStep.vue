<template>
  <div>
      <h2>פתיחת פניה חדשה</h2>
      <p class="small">הקלד את שם ו/או מספר הטלפון של הזקן לחיפוש.</p>
      <ElderSearch callToActionLabel="צור פניה" />
  </div>
</template>
<script>
import { ElderSearch } from '@/components/features/elder/';
export default {
  components: { ElderSearch },
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
