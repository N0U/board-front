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
    <template class="line" v-for="(line, i) of content" :key="`line-${i}`" name="line">
      <slot v-for="token of line.value" :name="token.type" :value="token.value">
      </slot>
      <br v-if="i !== content.length - 1"/>
    </template>
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
