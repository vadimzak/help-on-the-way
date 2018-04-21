<template>
<div>
 <b-modal ref="modalRef" hide-footer :title="title">
    <slot name="modal"></slot>
  </b-modal>
      <div @click="$refs.modalRef.show()"><slot name="trigger"></slot></div>
</div>
</template>
<script>
export default {
  props: ['title'],
  data(){
      return {}
  },
}
</script>
