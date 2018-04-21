<template>
  <div v-if="!ticket.destinationAddress" class="address">
    {{ticket.startAddress | formatAddress }}
  </div>
  <div v-else class="route">
    <div class="route-icons">
      <img src="static/assets/placeholder-copy.png" v-if="ticket.startAddress && ticket.startAddress.location">
      <div class="middle-destination" v-if="ticket.destinationAddress && ticket.destinationAddress.location"></div>
      <img src="static/assets/placeholder-copy.png" v-if="ticket.endAddress && ticket.endAddress.location">
    </div>
    <div class="route-addresses">
      <a class="address" v-if="ticket.startAddress && ticket.startAddress.location" target="_blank" :href="`${getGeoPrefix()}${ticket.startAddress.location.lat},${ticket.startAddress.location.lng}`">
         <span class="address-title">{{ticket.details.startAddressAlias ? ticket.details.startAddressAlias : 'איסוף'}}</span>
        {{ticket.startAddress | formatAddress }}
      </a>
      <a class="address" v-if="ticket.destinationAddress && ticket.destinationAddress.location"  target="_blank" :href="`${getGeoPrefix()}${ticket.destinationAddress.location.lat},${ticket.destinationAddress.location.lng}`">
        <span class="address-title">{{ticket.details.destinationAddressAlias ? ticket.details.destinationAddressAlias : 'יעד'}}</span>
        {{ticket.destinationAddress | formatAddress }}
      </a>
      <a class="address" v-if="ticket.endAddress && ticket.endAddress.location" target="_blank" :href="`${getGeoPrefix()}${ticket.endAddress.location.lat},${ticket.endAddress.location.lng}`">
         <span class="address-title">{{ticket.details.endAddressAlias ? ticket.details.endAddressAlias : 'חזרה'}}</span>
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
    },
    methods: {
      getGeoPrefix(){
        return 'geo:0,0?q='
      }
    }
  }
</script>

<style>
  .route-addresses .address {
    box-shadow:0px 2px 10px 0 rgba(52, 52, 52, 0.08);   
    border-radius: 0;
    padding: 12px;
    display:block;
    width:100%;
    color:#757575;
    text-decoration: none;
    font-size:15px;
    margin-bottom: 16px;
  }

.route-addresses .address .address-title{
  display:block;
  font-size:12px;
  color:#212121;
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
    align-items: center;
    position:absolute;
    height: 100%;
    justify-content: space-around;
  }
  .route-icons img{
    max-width:100%;
    max-height:20px;
    margin-bottom: 10px;
    z-index:1;
    background-color: #fafafa;
  }

  .route-icons:before {
    content: "";
    width: 1px;
    position: absolute;
    height: 60%;
    background-color: gainsboro;
    z-index: 0;
  }
  

  .route-icons .middle-destination{
    width:10px;
    height: 10px;
    background-color: #fafafa;
    border: 1px solid #757575;
    border-radius: 100px;
    z-index: 1;
  }

  .route-addresses{
    margin-right:30px;
    width:100%;
  }
</style>
