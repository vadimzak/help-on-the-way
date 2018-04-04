<template>
  <div v-if="!ticket.destinationAddress" class="address">
    {{ticket.startAddress | formatAddress }}
  </div>
  <div v-else class="route">
    <div class="route-icons">
      <img src="static/assets/placeholder-copy.png" v-if="ticket.startAddress && ticket.startAddress.location">
      <img src="static/assets/placeholder-copy.png" v-if="ticket.destinationAddress && ticket.destinationAddress.location">
      <img src="static/assets/placeholder-copy.png" v-if="ticket.endAddress && ticket.endAddress.location">
    </div>
    <div class="route-addresses">
      <a class="address" v-if="ticket.startAddress && ticket.startAddress.location" target="_blank" :href="`geo:${ticket.startAddress.location.lat},${ticket.startAddress.location.lng}`">
        {{ticket.startAddress | formatAddress }}
      </a>
      <a class="address" v-if="ticket.destinationAddress && ticket.destinationAddress.location"  target="_blank" :href="`geo:${ticket.destinationAddress.location.lat},${ticket.destinationAddress.location.lng}`">
        {{ticket.destinationAddress | formatAddress }}
      </a>
      <a class="address" v-if="ticket.endAddress && ticket.endAddress.location" target="_blank" :href="`geo:${ticket.endAddress.location.lat},${ticket.endAddress.location.lng}`">
        {{ticket.endAddress | formatAddress }}
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['ticket'],
    data() {
      return {}
    }
  }
</script>

<style>
  .route-addresses .address {
    box-shadow: 2px 2px 10px lightgrey;
    border-radius: 3px;
    padding: 5px;
    margin-bottom: 10px;
    display:block;
    width:100%;
    color:black;
    text-decoration: none;
  }

  .route{
    display: flex;
    align-items: center;
    flex-direction: row;
    position:relative;
  }

  .route-icons{
    margin-left:15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position:absolute;
    height: 100%;
    justify-content: space-around;
  }
  .route-icons img{
    max-width:100%;
    max-height:20px;
    margin-bottom: 10px;
  }

  .route-addresses{
    margin-right:30px;
    width:100%;
  }
</style>
