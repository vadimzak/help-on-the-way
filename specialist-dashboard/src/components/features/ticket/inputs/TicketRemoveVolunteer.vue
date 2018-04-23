<template>
    <b-btn v-if="isVolunterrExits()" class="px-5" variant="primary" v-on:click='removeVolunteer()'>  הסר מתנדב מהפנייה </b-btn>  
    

</template>

<script>
export default {
     props: ['ticket'],
     methods: {
         isVolunterrExits(){
             return this.ticket.volunteers.nodes.length > 0
         },
         async removeVolunteer (){
            //todo send mutation to remove volunteer  from the ticket
            debugger;
         }
        
     }
 

}
</script>

<style scoped>

</style>