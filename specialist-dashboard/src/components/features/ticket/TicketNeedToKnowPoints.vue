<template>
  <b-row>
      <b-col>
            <b-form-input placeholder="הוספת נקודה" v-model="newPointModel" @keyup.enter.native="addItem"/>
             <b-list-group>
                 <b-list-group-item v-for="(item, index) in value" :key="index" class="d-flex justify-content-between align-items-center">
                     {{item}}
                      <b-badge href="#" variant="dark" @click="() => removeItem(index)">מחק הערה</b-badge>
                 </b-list-group-item>
             </b-list-group>
      </b-col>
  </b-row>
</template>
<script>
    export default {
        props: ['value'],
        data(){
            return {
                newPointModel: '',
            }
        },
        methods: {
            addItem(item){
                this.$emit('input', [...this.value, this.newPointModel])
                this.newPointModel = ''
            },
            removeItem(indexToRemove){
                this.$emit('input', this.value.filter((val, i) => i !==indexToRemove))
            }
        }
    }
</script>