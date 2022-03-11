<script>
import parse from '../parser';

export default {
  props: {
    text: String,
  },
  emits: [
    'onIdClick',
  ],
  computed: {
    content() {
      return parse(this.text);
    }
  },
}
</script>
<template>
  <div class="formated-text">
    <span class="line" v-for="(line, i) of content" :key="`line-${i}`" name="line">
      <slot v-for="token of line.value" :name="token.type" :value="token.value">
      </slot>
    </span>
  </div>
</template>
<style scoped>
.formated-text {
}

.line {
  display: block;
}
.quote {
  color: green;
}
.id {
  font-weight: bolder;
  cursor: pointer;
}
</style>
