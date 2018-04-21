<template>
  <div v-if="type === 'WALK'">
    <i class="material-icons">directions_walk</i>
    הולכים ברגל
  </div>
  <div v-else-if="type === 'TAXI'">
    <i class="material-icons">local_taxi</i>
נוסעים במונית
  </div>
  <div v-else-if="type === 'BUS'">
    <i class="material-icons">directions_bus</i>
נוסעים באוטובוס
  </div>
  <div v-else-if="type === 'TRAIN'">
    <i class="material-icons">train</i>
נוסעים ברכבת
  </div>
  <div v-else-if="type === 'PRIVATE_CAR_ELDER'">
    <i class="material-icons">directions_car</i>
נוסעים ברכב
  </div>
  <div v-else-if="type === 'PRIVATE_CAR_VOLUNTEER'">
    <i class="material-icons">directions_car</i>
נוסעים ברכב
  </div>
  <div v-else-if="type === 'PRIVATE_CAR_OTHER'">
    <i class="material-icons">directions_car</i>
  </div>
</template>

<script>
  export default {
    props: ['type'],
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
div{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 12px;
}

div i {
margin-left:10px;
font-size: 25px;
}
</style>
