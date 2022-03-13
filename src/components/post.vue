<script>
import { mapGetters } from 'vuex';
import Attachment from './attachment.vue';
import FormatedText from './formated-text.vue';

export default {
  components: {
    Attachment,
    FormatedText,
  },
  props: {
    head: Boolean,
    id: Number,
  },
  data: () => ({
    highlight: false,
  }),
  computed: {
    ...mapGetters([
      'getPostById'
    ]),
    post() {
      return this.getPostById(this.id);
    },
  },
  mounted() {
    this.$emitter.on('scroll-to', this.onScrollTo);
  },
  unmounted() {
    this.$emitter.off('scroll-to', this.onScrollTo);
  },
  methods: {
    onReplyClick() {
      this.$emitter.emit('quote-post', {
        id: this.post.id,
      });
    },
    onIdClick(id) {
      this.$emitter.emit('scroll-to', {
        id,
      });
    },
    onScrollTo({ id }) {
      if(id === this.id) {
        this.highlight = true;
        this.$el.scrollIntoView();
      } else {
        this.highlight = false;
      }
    },
  },
}
</script>
<template>
  <div class="post-container" :class="{ 'head-post': head, 'highlight': highlight, }">
    <div class="header">
      <span class="title" v-if="post.title">{{ post.title }}</span>
      <span class="date">{{ new Date(post.createdAt).toLocaleDateString("ru-RU") }}</span>
      <span class="id">{{ `#${post.id}` }}</span>
      <span v-if="post.sage" class="sage">SAGE</span>
      <router-link v-if="head" :to="`/thread/${post.id}`">Открыть</router-link>
      <span class="reply" @click="onReplyClick">
        <i class="gg-mail-reply"></i>
      </span>
    </div>
    <div class="attachments-container" >
      <Attachment v-for="res in post.attachments" :resource="res" />
    </div>
    <FormatedText class="content" :text="post.content">
      <template #text="{ value }">{{ value }}</template>
      <template #quote="{ value }">
        <span class="quote">{{ value }}</span>
      </template>
      <template #id="{ value }">
        <span class="id" @click="onIdClick(value)">#{{ value }}</span>
      </template>
    </FormatedText>
  </div>
</template>
<style scoped>
.post-container {
  margin-top: 6px;
  margin-bottom: 6px;
  padding: 6px;
  border-radius: var(--border-radius);
  background-color: var(--post-bg);
}

.highlight {
  border: 1px solid var(--color0);
}

.head-post {
  background-color: var(--head-post-bg);
}

.header {
  display: flex;
  align-items: baseline;
}

.header span {
  display: inline-block;
  margin-right: 6px;
}

.title {
  font-size: 110%;
  font-weight: bold;
}

.date {
  color: var(--text-color1);
}

.id {
  font-weight: bolder;
  cursor: pointer;
}

.sage {
  font-weight: bolder;
}

.reply {
  margin-left: auto;
  cursor: pointer;
}

.quote-ctrl {
  cursor: pointer;
}

.attachments-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  margin-bottom: 4px;
}

.content {
  text-align: justify;
}

.quote {
  color: green;
}

.post-quote {
  margin: 4px;
  border: 1px solid var(--dark-light-color0);
  text-overflow: ellipsis;
}
</style>
