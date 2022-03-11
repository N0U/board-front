<script>
import Api from '../../api';
import Loader from '../loaders/round-loader.vue';
import UploadcareWidget from './uploadcare-widget.vue';
import Button from '../controls/button.vue';
import ToggleButton from '../controls/toggle-button.vue';
import VideInfo from './video-info.vue';
import VideoInput from './video-input.vue';

export default {
  components: {
    Loader,
    UploadcareWidget,
    Button,
    ToggleButton,
    VideInfo,
    VideoInput,
  },
  props: {
    threadId: Number,
  },
  emits: [
    'submited',
  ],
  data: () => ({
    open: false,
    error: false,
    loading: false,

    title: '',
    content: '',
    sage: false,
    imagesUrl: '',
    videos: [],
  }),
  mounted() {
    this.$emitter.on('quote-post', this.addPostId);
  },
  unmounted() {
    this.$emitter.off('quote-post', this.addPostId);
  },
  computed: {
    toggleTextClosed() {
      return !!this.threadId? 'Ответ' : 'Создать тред';
    },
  },
  watch: {
    imagesUrl() {
      this.error = false;
    },
  },
  methods: {
    onToggle() {
      this.open = !this.open;
    },
    addVideo(v) {
      this.videos.push(v);
      this.error = false;
    },
    deleteVideo(i) {
      this.videos.splice(i, 1);
    },
    validate() {
      const { content, imagesUrl, videos } = this;
      if(!this.threadId && imagesUrl === '' && videos.length === 0) {
        this.error = 'Нельзя создать тред без вложения';
        return false;
      }
      if(!!this.threadId && imagesUrl === '' && videos.length === 0 && content === '') {
        this.error = 'Нельзя создать пустой пост';
        return false;
      }

      return true;
    },
    async submit() {
      const { title, content, sage, imagesUrl, videos} = this;
      const attachments = []

      if(!this.validate()) {
        return;
      }

      videos.forEach(({ url, provider }) => attachments.push({
        url,
        type: provider,
      }));

      if(imagesUrl !== '') {
        attachments.push({
          url: imagesUrl,
          type: 'images',
        });
      }

      try {
        this.loading = true;
        let results;
        if(!this.threadId) {
          results = await Api.createThread(title, content, attachments);
        } else {
          results = await Api.createPost(this.threadId, title, sage, content, attachments);
        }
        this.clear();
        this.$emit('submited', results);
      } catch (error) {
        console.log(error);
        this.error = error.toString();
      } finally {
        this.loading = false;
      }
    },
    clear() {
      this.open = false;
      this.title = '';
      this.content = '';
      this.sage = false;
      this.imagesUrl= '';
      this.videos = [];
      this.error = false;
    },
    addPostId(id) {
      if(this.content !== '') {
        this.content = this.content.trimEnd() + '\r\n';
      }
      this.content += '#' + id + '\r\n';
    },
  }
};
</script>
<template>
  <div class="container">
    <Button class="toggle" wide color="gray" @click="onToggle">{{ open? 'Закрыть' : toggleTextClosed}}</Button>
    <template v-if="open">
      <div class="row">
        <input maxlength="100" placeholder="Заголовок" v-model.trim="title" />
        <ToggleButton v-if="!!threadId" v-model="sage">SAGE</ToggleButton>
      </div>
      <textarea maxlength="2000" placeholder="Текст" v-model.trim="content"></textarea>
      <UploadcareWidget maxImages="3" v-model:url="imagesUrl" />
      <VideoInput v-if="videos.length < 3" class="row" @addVideo="addVideo"/>
      <VideInfo v-for="(v, i) in videos" :key="v.title" class="row" :video="v" @delete="deleteVideo(i)"/>
      <div class="error" v-if="error">{{ error }}</div>
      <Button class="last" wide @click="submit">Отправить</Button>
    </template>
    <Loader class="round-bg" v-if="loading" local />
  </div>
</template>
<style>
.container .uploadcare--widget__button_type_open {
  border-radius: 0;
  width: 100%;
  font-size: 16px;
}
</style>
<style scoped>
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  border-radius: var(--border-radius);
  margin-top: 6px;
  margin-bottom: 6px;
}

.container::v-deep input, .container textarea {
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
  margin: 0;
  border: 0;
  background-color: var(--light-color0);
  outline: 0;
  border-bottom: 1px solid var(--dark-light-color0);
}

.container::v-deep input::placeholder, .container textarea::placeholder {
  color: var(--text-color1);
}

.container::v-deep input:invalid {
  border-left: 2px solid var(--red0);
}

.container::v-deep input:read-only {
  background-color: var(--dark-light-color0);
  color: var(--text-color1);
}

.container textarea {
  height: 8em;
  resize: none;
}

.row {
  display: flex;
  height: 25px;
}

.error {
  color: var(--red0);
}

.round-bg {
  border-radius: var(--border-radius);
}

.toggle {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
}

.toggle:last-child {
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}

.last {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}
</style>
