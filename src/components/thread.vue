<script>
import { mapGetters } from 'vuex';
import Post from './post.vue';

export default {
  components: {
    Post,
  },
  props: {
    preview: Boolean,
    id: Number,
  },
  computed: {
    ...mapGetters([
      'getThreadById'
    ]),
    thread() {
      return this.getThreadById(this.id);
    },
    headPost() {
      return this.thread && this.thread.headPost;
    },
    replies() {
      return this.thread && this.thread.replies;
    },
    hiddenPosts() {
      return this.thread && this.thread.postCount - 3;
    },
  },
}
</script>
<template>
  <div v-if="thread">
    <Post head :id="headPost" />
    <div class="hidden-count" v-if="preview && hiddenPosts > 0">{{ `Скрыто ${hiddenPosts} постов`}}</div>
    <Post v-for="id in replies" :key="id" :id="id" />
  </div>
</template>
<style scoped>
.hidden-count {

}
</style>
