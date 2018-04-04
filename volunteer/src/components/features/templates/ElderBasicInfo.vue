<template>
  <div class="basic-info">
    <i class="material-icons person-icon">person</i>
    <div class="details">
    <div class="elder-name">{{elder.firstName+' '+elder.lastName}}</div>
    <div class="more-reviews">קרא חוויות ממפגשים קודמים</div>
    </div>
    <div class="elder-mobility" v-if="elderMobility">
      <i class="material-icons">{{elderMobilityType[elderMobility].icon}}</i>
      <span>{{elderMobilityType[elderMobility].text}}</span>
    </div>
  </div>
</template>

<script>
  import elderMobilityType from 'shared/constants/enums/ElderMobilityType'
  export default {
    props: ['elder','elderMobility'],
    data() {
      return {
        elderMobilityType,
      }
    }
  }
</script>

<style scoped>
.basic-info{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom:10px;
  width:100%;
  position: relative;
}

div .person-icon {
margin-left:10px;
}

.details{
  display: flex;
  flex-direction: column;
}
.more-reviews{
  color: #2d83ff;
  font-size: 12px;
}
.elder-mobility{
   position: absolute;
   left:0;
    color: white;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.elder-mobility i {
    background-color: #bbbbbb;
    padding:5px;
    border-radius: 100px;
    height: 34px;
    width: 34px;
}

.elder-mobility span{
      color: gray;
    font-size: 8px;
}
</style>
