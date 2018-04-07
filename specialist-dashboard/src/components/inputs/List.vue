<template>
  <div>
      <div class="header my-2">
          <div class="item-counter">
            <span>סהכ פריטים</span>
            <span>{{value.length}}</span>
          </div>
          <div 
            v-on:click="toggleItemSearch" 
            class="add-item"
            v-if="!showItemSearch">
              הוסף 
              <i class="fa fa-plus"></i>
          </div>
          <auto-complete 
            class="item-search" 
            v-if="showItemSearch"
            v-on-click-outside="toggleItemSearch" 
            placeholder="חפש"
            :searchFunction="search"
            :options="{toggleOnChoice: false}"
            @input="addItemToList"
          >
          <template slot-scope="props">
              <slot name="auto-complete-result" :item="props.item">
              {{props.item.name}}
              </slot>
          </template>
          </auto-complete>
      </div>
      <div class="list-wrapper">
          <div class="list-item" 
          v-for="(item, index) in value"
          :key="index">
              <div class="item-info">
                  <slot name="list-item" :item="item">
                    <span class="name">{{item.name}}</span>
                    <span class="members-count">[{{item.count}}]</span>
                  </slot>
              </div>
              <b-button v-on:click="onRemove(index)" class="remove">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </b-button>
          </div>
      </div>
  </div>
</template>

<script>
import AutoComplete from '@/components/AutoComplete'
import { mixin as onClickOutside } from 'vue-on-click-outside'

export default {
    components: {AutoComplete},
    mixins: [onClickOutside],
    props:['value', 'search', 'addItem', 'removeItem'],
    computed: {},
  data(){
      return{
          showItemSearch: false
      }
  },
  methods: {
    async addItemToList(item){
        this.addInProgress = true
        try {
            await this.addItem(item)
        } catch (error) {
            // TODO handle error here
            throw error
        }finally{
            this.addInProgress = false
        }
    },
    async onRemove(index){
        const item = this.value[index]
        this.removeInProgress = true
        try {
            await this.removeItem(item, index)
        } catch (error) {
            // TODO handle error here
            throw error
        }finally{
            this.removeInProgress = false
        }
    },
    toggleItemSearch(){
        this.showItemSearch = !this.showItemSearch
    },
  }
}
</script>

<style scoped>
    .header{
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid gray;
    }
    .add-item{
        cursor: pointer;
    }
    .list-wrapper{
        width: 80%;
        margin: auto;
    }
    .list-item{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid lightgray;
    }
    .remove{
        font-size: 2rem;
        outline: none;
        border: none;
        background: transparent;
    }
</style>


