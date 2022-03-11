<script>
import CheckVideo from '../../utils/video-checker';
import BarLoader from '../loaders/bar-loader.vue';

export default {
  components: {
    BarLoader,
  },
  emits: [
    'addVideo',
  ],
  data: () => ({
    videoInput: '',
    checkingVideo: false,
    invalidVideo: false,
  }),
  watch: {
    videoInput() {
      if(this.$refs.videoInput && this.$refs.videoInput.checkValidity() && this.videoInput !== '') {
        this.checkVideo();
      }
    },
  },
  methods: {
    async checkVideo() {
      this.checkingVideo = true;
      this.invalidVideo = false;

      try {
        const video = await CheckVideo(this.videoInput);
        if(video) {
          this.$emit('addVideo', {
            url: this.videoInput,
            ...video,
          });
          this.videoInput = '';
        } else {
          this.invalidVideo = true;
        }
      } catch(error) {
      }
      this.checkingVideo = false;
    },
  },
}
</script>
<template>
  <div>
    <input
      v-if="!checkingVideo"
      placeholder="Добавить видео"
      type="url"
      :readonly="checkingVideo"
      v-model.trim="videoInput"
      @blur="invalidVideo = false"
      ref="videoInput"
    />
    <BarLoader class="loader" v-if="checkingVideo"/>
    <span class="error" v-if="invalidVideo && !checkingVideo">Invalid video</span>
  </div>
</template>
<style scoped>
input {
  width: 100%;
}

.loader {
  margin-left: auto;
  margin-right: auto;
}

.error {
  color: var(--red0);
}
</style>
