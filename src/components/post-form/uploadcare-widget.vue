<script>
import uploadcare from 'uploadcare-widget';

const UPLOADCARE_PUBLIC_KEY = '57a86f3940106f16505b';

export default {
  props: {
    url: String,
    maxImages: {
      type: Number,
      default: 5,
    }
  },
  emits: [
    'update:url',
  ],
  data: () => ({
    widget: null,
  }),
  watch: {
    url() {
      if(this.widget) {
        this.widget.value(this.url);
      }
    },
  },
  mounted() {
    this.widget = uploadcare.Widget(this.$el, {
      publicKey: UPLOADCARE_PUBLIC_KEY,
      imagesOnly: true,
      multiple: true,
      multipleMax: this.maxImages,
      imageShrink: '4096x4096',
      tabs: 'file',
    });
    if(this.url)
      this.widget.value(this.url);
    this.widget.onUploadComplete((info) => this.$emit('update:url', info.cdnUrl));
  },

  unmounted() {

  },
};
</script>
<template>
  <div>
    <input type="hidden" />
  </div>
</template>
