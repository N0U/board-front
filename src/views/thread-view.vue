<script>
import { mapGetters, mapActions } from 'vuex';
import PostForm from '../components/post-form/index.vue';
import Thread from '../components/thread.vue';
import Button from '../components/controls/button.vue';

export default {
  components: {
    PostForm,
    Thread,
    Button,
  },
  computed: {
    threadId() {
      return parseInt(this.$route.params.id);
    },
  },
  mounted() {
    this.fetchThread();
  },
  methods: {
    ...mapActions([
      'fetchThreadById',
    ]),
    fetchThread() {
      this.fetchThreadById(this.threadId);
    },
    submited() {
      this.fetchThread();
    },
  },
};
</script>
<template>
  <Button wide @click="$router.push('/')">Главная</Button>
  <Thread :id="threadId" />
  <Button wide @click="fetchThread">Обновить</Button>
  <PostForm @submited="submited" :threadId="threadId"/>
</template>
<style scoped>
</style>
