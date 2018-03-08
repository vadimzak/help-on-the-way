<script>
export default {
  props: ['elder', 'onPick', 'callToAction'],
}
</script>
<template>
        <b-row>
        <b-col cols="8">
            {{elder.firstName}} {{elder.lastName}}
            <p v-if="elder.address">
                {{elder.address.street}} {{elder.address.houseNumber}} {{elder.address.city}}
            </p>
            </b-col>
        <b-col cols="4">
            {{elder.phoneNumber}}
            <br/>
            <b-button @click="onPick(elder)">{{callToAction}}</b-button>
        </b-col>
    </b-row> 
</template>