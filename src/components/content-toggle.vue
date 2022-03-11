<script>
import Button from './controls/button.vue';

export default {
  components: {
    Button,
  },
  data: () => ({
    open: false,
  }),
}
</script>
<template>
  <div class="toggle-content">
    <Button class="toggle" wide color="gray" @click="onToggle">{{ open? 'Закрыть' : 'Открыть'}}</Button>
    <slot v-if="open"></slot>
  </div>
</template>
<style scoped>
.toggle-content {

}

.toggle {
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
}

.toggle:last-child {
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}
</style>
