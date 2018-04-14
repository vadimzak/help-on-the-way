<template>
     <div>
         <TimePicker
            :arrow-control="true"
            align="center"
            format="HH:mm"
            placeholder="הזן שעה מדוייקת"
            :value="value"
            prefix-icon="hidden"
            clear-icon="hidden"
            class="a"
            @input="(val) => updateInput(val, true)" />
     </div>
</template>
<script>
import { TimePicker } from 'element-ui'
export default {
    props: ['value'],
    components: { TimePicker },
    data(){
        return {
            pickerOptions: {
                start: '07:00',
                step: '00:30',
                end: '23:30'
            },
        };
    },
    methods: {
        updateInput(value, isExact){
            this.$emit('input', value)
        },
    }
}
</script>
<style scoped>

</style>