<template>
    <b-form-group
                :description="ticket | formatTicketTitle"
                label="נושא הפנייה"
                label-for="ticketSubject">
                 <b-form-input id="ticketSubject" :value="value" @input="(v) => $emit('input', v.trim())"></b-form-input>
    </b-form-group>
</template>
<script>
export default {
    props: ['ticket', 'value'],
}
</script>
