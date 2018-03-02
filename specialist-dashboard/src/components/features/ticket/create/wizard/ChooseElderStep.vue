<template>
  <div>
      <h2>פתיחת פניה חדשה</h2>
      <p class="small">הקלד את שם ו/או מספר הטלפון של הזקן לחיפוש.</p>
      <ElderSearch @select="onElderSelect" callToActionLabel="צור פניה" />
  </div>
</template>
<script>
import { ElderSearch } from '@/components/features/elder/';
export default {
  components: { ElderSearch },
  data() {
    return {}
  },
  methods: {
      onElderSelect(elder) {
          this.$emit('update', { elder });
          this.$emit('next');
      }
  }
}
</script>
