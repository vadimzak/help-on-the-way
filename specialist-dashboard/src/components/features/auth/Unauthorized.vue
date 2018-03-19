<template>
  <div class="container">
    <div class="row justify-content-center">
      אופס! נראה שאין לך הרשאות לעמוד זה.
      <br/>
      <a class="btn btn-link" @click="$store.dispatch('auth/logout')"> התנתק </a> 
    </div>
  </div>
</template>
<script>
export default {}
</script>
