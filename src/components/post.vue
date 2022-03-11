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
    quote: Boolean,
  },
  computed: {
    ...mapGetters([
      'getPostById'
    ]),
    post() {
      return this.getPostById(this.id);
    },
  },
  methods: {
    onIdClick() {
      this.$emitter.emit('quote-post', this.post.id);
    },
  },
}
</script>
<template>
  <div class="post-container" :class="{ 'head-post': head, 'quote': quote, }">
    <div class="header">
      <span class="title" v-if="post.title">{{ post.title }}</span>
      <span class="date">{{ new Date(post.createdAt).toLocaleDateString("ru-RU") }}</span>
      <span class="id" @click="onIdClick">{{ `#${post.id}` }}</span>
      <span v-if="post.sage" class="sage">SAGE</span>
      <router-link v-if="head" :to="`/thread/${post.id}`">Открыть</router-link>
    </div>
    <div class="attachments-container" >
      <Attachment v-for="res in post.attachments" :resource="res" />
    </div>
    <FormatedText class="content" :text="post.content">
      <template #text="{ value }">{{ value }}</template>
      <template #quote="{ value }">{{ value }}</template>
      <template #id="{ value }">
        <Post :id="value" quote />
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

.head-post {
  background-color: var(--head-post-bg);
}

.quote {
  border: 1px solid var(--dark-light-color0);
  max-height: 60px;
  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis ellipsis;
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

.attachments-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  margin-bottom: 4px;
}

.content {
  text-align: justify;
}

.post-quote {
  margin: 4px;
  border: 1px solid var(--dark-light-color0);
  text-overflow: ellipsis;
}
</style>
