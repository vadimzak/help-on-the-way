<template>
  <div>
    <h3>תגיות במערכת</h3>
    <a
      v-for="(tag,i) in tags"
      :key="i"
      href="#"
      class="badge badge-primary m-1 p-2"
      :style="colorStyle(tag)"
    >
      {{tag.title}}
      <b-button class="btn btn-sm mr-2 p-1" @click="removeTag(i)">x</b-button>
    </a>
    <div class="form-inline mt-4">
      <b-form-input class="form-control" type="text" v-model="newTagTitle" placeholder="הוספת תגית">
      <b-button 
        variant="primary"
        class="mr-2 btn" 
        @click="addTag"
        :class="{disabled: newTagTitle===''}"
      >הוסף</b-button>
    </div>

  </div>
</template>

<script>
import CounterDisplay from '@/components/CounterDisplay'
import TicketTable from '@/components/TicketTable'

export default {
  components: { CounterDisplay, TicketTable },
  data () {
    return {
      newTagTitle: '',
      tags: [
        { title: 'סיוע טכני', color: '#EAC100' },
        { title: 'ליווי', color: '#48C0D3' },
        { title: 'נדרש יותר מאדם אחד', color: '#0B8457' },
        { title: 'נדרש רכב', color: '#48BA95' },
        { title: 'דחוף', color: '#BB0029' },
        { title: 'רוסית', color: '#FF6C00' },
        { title: 'ערבית', color: '#FF6C00' },
        { title: 'אמהרית', color: '#FF6C00' }
      ]
    }
  },
  methods: {
    colorStyle(tag){
      return `background-color:${tag.color};`
    },
    removeTag(i){
      this.tags.splice(i,1)
    },
    addTag(){
      this.tags.push({
        title: this.newTagTitle,
        color: '#ff8383'
      })
      this.newTagTitle = ''
    }
  }
}
</script>

<style scoped>
</style>
