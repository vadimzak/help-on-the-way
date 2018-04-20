<template>
  <b-form-group :label-for="'step-need-to-know-' + step" label="דברים שחשוב לדעת">
           <input :id="'step-need-to-know-' + step" class="form-control" :value="point" @change="e => updateValue(e.target.value)" />
  </b-form-group >
</template>
<script>
    import VueTypes from 'vue-types';
    export default {
        props: {
            step: VueTypes.any,
            value: VueTypes.array,
        },
        data(){
            return {
                point: this.getCurrentStepPoint(),
                newPointModel: '',
            }
        },
        watch: {
            step(){
                this.point = this.getCurrentStepPoint()
            },
        },
        methods: {
            inputChange(value = ""){
                value = value.trim();
                if(value){
                    this.updateValue(value)
                } else {
                    this.removePoint()
                }
            },
            updateValue(newPoint){
                const itemIndex = this.findStepPointIndex()
                const exists = itemIndex > -1
                const updatedPoint =  { text: newPoint, step: +this.step };
                const updatedPonitsArray = [...this.value]
                if(exists){
                    updatedPonitsArray[itemIndex] = updatedPoint
                } else {
                    updatedPonitsArray.push(updatedPoint)
                }
                this.$emit('input', updatedPonitsArray)
            },
            getCurrentStepPoint(){
              const index = this.findStepPointIndex()
                if(index > -1){
                    return this.value[index].text
                } else{
                    return ''
                }
            },
            removePoint(){
                const pointsArrayWithoutStepPoint =  this.value.filter(i => +i.step !== +this.step)
                this.$emit('input', pointsArrayWithoutStepPoint)
            },
            findStepPointIndex(){
                const index = this.value.findIndex(i => +i.step === +this.step )
                return index
            }
        }
    }
</script>