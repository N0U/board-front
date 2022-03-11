import { createRouter, createWebHistory } from 'vue-router';
import BoardView from './views/board-view.vue';
import ThreadView from './views/thread-view.vue';

const routes = [
  { path: '/:page(\\d+)?', component: BoardView },
  { path: '/thread/:id(\\d+)', component: ThreadView },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
