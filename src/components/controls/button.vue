<script>
export default {
  props: {
    small: Boolean,
    wide: Boolean,
    color: {
      type: String,
      validator(value) {
        return ['red', 'gray'].includes(value)
      }
    },
  },
  emits: [
    'click',
  ],
};
</script>
<template>
  <button
    class="button"
    :class="[{ small: small, wide: wide, }, color]"
    @click.prevent="$emit('click')"
  >
    <slot></slot>
  </button>
</template>
<style scoped>
button {
  height: 40px;
  padding-left: 4px;
  padding-right: 4px;
  border: 0;
  border-radius: 0;
  background-color: var(--color0);
  color: white;
  font-weight: bold;
  font-size: 16px;
  border-radius: var(--border-radius);
}

.wide {
  width: 100%;
}

.small {
  height: inherit;
}

.red {
  background-color: var(--red0);
}

.gray {
  background-color: var(--gray0);
}
</style>
