<template>
<div @click="goToStep" :class="{ 'completed': !!heading, 'active': active, disabled: disabled, 'actionable': step && !disabled }" class="p-3 d-flex flex-column  align-items-start justify-content-start">
            <Truncate class="h3">
                <span>{{heading || emptyheading }}</span>
            </Truncate>
            <Truncate>
                <span>{{ (heading && subheading) ? subheading : '&nbsp;'}}</span>
            </Truncate>
</div>  
</template>
<script>
import Truncate from '@/components/base/Truncate';

export default {
components: { Truncate },
  props: ['heading', 'subheading', 'disabled', 'emptyheading', 'step'],
  computed: {
      active(){
          return this.$store.state.createTicket.currentStep == this.step
      }
  },
  methods: {
      goToStep(){
          if(this.step && !this.disabled){
            this.$store.commit('createTicket/setStep', this.step)
          }
      }
  }
}
</script>
<style scoped>
    div.disabled{
        color: var(--light);
    }

    div.completed{
        border-bottom: 7px solid var(--primary);
    }
    div.active{
        border-bottom: 7px solid var(--yellow);
    }
    div.actionable{
        cursor: pointer;
    }
    div.actionable:hover{
        background-color: var(--primary);
        color: white;
        border-bottom: 7px solid var(--white);
    }
    div{
        background-color: var(--white);
        border-bottom: 7px solid var(--secondary);
        box-shadow: 0px 2px 8px 0 rgba(0, 0, 0, 0.08);
        flex: 1;
        height: 95px;
        width: 50px;
    }
</style>
