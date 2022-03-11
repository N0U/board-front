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
  data: () => ({
    page: 0,
  }),
  mounted() {
    this.fetchPage();
  },
  watch: {
    page: () => this.fetchPage(),
  },
  computed: {
    ...mapGetters([
      'totalPages',
      'board',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchBoard',
    ]),
    fetchPage() {
      this.fetchBoard(this.page);
    },
    submited() {
      this.fetchPage();
    },
  },
};
</script>

<template>
  <Button wide @click="fetchPage">Обновить</Button>
  <PostForm @submited="submited" />
  <Thread v-for="id in board" :key="id" :id="id" preview />
</template>
<style scoped>
</style>
