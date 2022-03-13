<script>
export default {
  props: {
    resource: Object,
  },
  data: () => ({
    full: false,
  }),
  computed: {
    VIDE_PREVIW_WIDTH() {
      return 200;
    },
    VIDE_PREVIW_HEIGHT() {
      return 150;
    },
    videoSource() {
      const url = new URL(this.resource.fullUrl);
      console.log(this.resource);
      switch(this.resource.type) {
        case 'youtube':
        {
          const id = url.searchParams.get('v');
          return `http://www.youtube.com/embed/${id}?autoplay=0`;
        }
        case 'tiktok':
        {
          const path = url.pathname.split('/');
          console.log(path);
          const last = path[path.length - 1];
          return `https://www.tiktok.com/embed/${last}`;
        }
        default:
          return '';
      }
    },
    isImage() {
      return this.resource.type === 'image';
    },
    isYoutube() {
      return this.resource.type === 'youtube';
    },
    isTiktok() {
      return this.resource.type === 'tiktok';
    },
  },
  methods: {
    openFull() {
      this.full = true;
    },
    closeFull() {
      this.full = false;
    },
  },
}
</script>
<template>
  <img class="preview" v-if="isImage" :src="resource.thumbnailUrl" @click="openFull" />
  <div class="full" v-if="isImage && full" @click="closeFull">
    <img :src="resource.fullUrl" />
  </div>
  <div>
    <iframe v-if="isYoutube" type="text/html"
      width="100%" height="100%"
      :src="videoSource"
      frameborder="0"
    />
    <iframe v-if="isTiktok" type="text/html"
      width="85px" height="150px"
      :src="videoSource"
      allow="encrypted-media;"
      frameborder="0"
    ></iframe>
  </div>
</template>
<style scoped>
.preview {
  max-width: 150px;
  max-height: 150px;
  width: auto;
  height: auto;
  cursor: pointer;
}

.full {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
}

.full img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
}

div {
  height: 100%;
}
</style>
