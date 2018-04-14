<template>
    <ButtonOptions 
    placeholder="גמיש"
    :value="value" @input="(v) => $emit('input', v)"
    :buttons="buttons" />
</template>
<script>
    import ButtonOptions from '@/components/inputs/ButtonOptions'
    import FlexibleTime from 'shared/constants/enums/FlexibleTime'
    export default{
        props: ['value'],
        components: { ButtonOptions },
        data(){
            return {
                buttons: Object.values(FlexibleTime),
            }
        }
    }
</script>