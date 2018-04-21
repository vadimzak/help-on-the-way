<template>
     <div>
         <TimeSelect
            :arrow-control="true"
            align="center"
            format="HH:mm"
            placeholder="הזן שעה מדוייקת"
            :value="value"
            prefix-icon="hidden"
            clear-icon="hidden"
            :pickerOptions="pickerOptions"
            class="a"
            @input="(val) => updateInput(val, true)" />
     </div>
</template>
<script>
import { TimeSelect } from 'element-ui'
export default {
    props: ['value'],
    components: { TimeSelect },
    data(){
        return {
            pickerOptions: {
                start: '00:00',
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