<script>
export default {
  props: {
    modelValue: Boolean,
  },
  emits: [
    'update:modelValue',
  ],
};
</script>
<template>
  <div class="toggle-container">
    <div class="toggle" :class="[modelValue ? 'toggle-on' : 'toggle-off']" @click="$emit('update:modelValue', !modelValue)">
      <slot></slot>
    </div>
  </div>
</template>
<style scoped>
.toggle-container {
  display: flex;
  cursor: pointer;
  user-select: none;
}

.toggle {
  box-sizing: border-box;
  display: flex;
  height: 100%;
  padding-left: 4px;
  padding-right: 4px;
  align-items: end;
  border: 2px solid;

  transition-property: border-color border-width;
  transition-duration: 0.5s;
}

.toggle-on {
  border-left-width: 18px;
  border-color: var(--color0);
}

.toggle-off {
  border-right-width: 18px;
  border-color: var(--red0);
}

.toggle div {
  height: 100%;
}

.on {
  width: 20%;
  background-color: var(--color0);
}

.off {
  width: 20%;
  background-color: var(--red0);
  margin-left: auto;
}

.content {
  padding-left: 2px;
  padding-right: 2px;
}
</style>
