<script>
import Button from '../controls/button.vue';

export default {
  components: {
    Button,
  },
  props: {
    video: Object,
  },
  emits: [
    'delete',
  ],
}
</script>
<template>
  <div class="video-info">
    <img v-if="video.provider==='youtube'" src="https://www.youtube.com/s/desktop/f03577db/img/favicon_96x96.png" />
      <img v-if="video.provider==='tictok'" src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web-common-sg/mtact/static/images/logo_144c91a.png" />
    <div>{{ video.title }}</div>
    <Button small color="red" @click="$emit('delete')">X</Button>
  </div>
</template>
<style scoped>
.video-info {
  display: flex;
  border-bottom: 1px solid var(--dark-light-color0);
}

.video-info div {
  padding: 4px;
  text-overflow: "";
  overflow: hidden;
  white-space: nowrap;
  flex-grow: 1;
}
</style>
