<script>
export default {
  props: ['currentStep', 'step'],
}
</script>
<template>
<div>
    <slot v-if="currentStep == step"></slot>
</div>
</template>
