<script>
import { mapGetters } from 'vuex';
import Loader from './components/loaders/round-loader.vue';

export default {
  components: {
    Loader,
  },
  computed: {
    ...mapGetters([
      'isLoading', 'error',
    ]),
  },
}
</script>

<template>
  <Loader v-if="isLoading" />
  <div class="logo">
    LOGO
  </div>
  <router-view/>
</template>
<style>
/* https://colorscheme.ru/#3V11TddP.g0II */
:root {
  --color0: #0d7eff;
  --semilight-color0: #dbeaff;
  --light-color0: #f5f9ff;
  --dark-light-color0: #bec5cf;

  --text-color0: #424242;
  --text-color1: #606060;

  --red0: #d61111;
  --gray0: #5e5e5e;

  --border-radius: 6px;

  --head-post-bg: var(--semilight-color0);
  --post-bg: var(--light-color0);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<style scoped>
.logo {
  width: 100%;
  height: 150px;
}
.nav {
  text-align: left;
  margin-top: 6px;
  margin-bottom: 6px;
}
</style>
