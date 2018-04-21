<template>
 <div class="route" :class="{ 'single-route': route.length === 1}">
    <div class="route-icons">
      <span  v-for="(addressKey, index) in route" :key="index">
          <img src="static/assets/placeholder-copy.png" v-if="index === 0">
          <div class="middle-destination" v-if="index === 1"></div>
          <img src="static/assets/placeholder-copy.png" v-if="index === 2">
      </span>
    </div>
    <div class="route-addresses">
      <a  v-for="(addressKey, index) in route" :key="index" class="address"  target="_blank" :href="getGeoLink(ticket[addressKey])">
         <span class="address-title">{{ticket.details[addressKey + 'Alias'] ? `${steps[index].preword}${ticket.details[addressKey + 'Alias']}` : steps[index].alias}}</span>
        {{ticket[addressKey] | formatAddress(preview ? 'preview' : '') }}
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['ticket', 'preview'],
    data() {
      const ticket = this.ticket
      const allAddresses = ['startAddress', 'destinationAddress', 'endAddress']
      const route = allAddresses.filter(key => ((ticket[key] && ticket[key].location) || ticket.details[key + 'Alias']))
      const steps = [{ preword: 'מ', alias: route.length > 1 ? 'איסוף' : 'מיקום'}, { preword: 'ל', alias: 'יעד'}, { preword: 'ול', alias: 'חזרה'}]
      return {
        route,
        steps,
      }
    },
    methods: {
      getGeoLink(address){
        if(address && address.location && !this.preview){
          const coords = address.location
          return `geo:0,0?q=${coords.lat},${coords.lng}`
        }
        return `javascript:void(0)`
        
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
    z-index:1;
    background-color: #fafafa;
  }

  .route-icons span{
    z-index: 1;
  }
  .route-icons span:first-child img{
      margin-bottom: 10px;
  }
  .route-icons  span:last-child img{
        margin-top: 10px;
  }

  .route-icons:not('.single-route'):before {
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
