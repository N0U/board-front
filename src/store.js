import _ from 'lodash';
import { createStore } from 'vuex';
import Api from './api';

function transformPostData({ id, title, sage, content, createdAt, Attachments, replayToId }) {
  return {
    id,
    title,
    sage,
    content,
    createdAt,
    threadId: replayToId || id,
    attachments: Attachments,
  };
}

export default createStore({
  devtools: true,
  state: {
    loading: false,
    error: false,

    board: [],
    threads: {},
    posts: {},
    totalPages: 0,
  },
  getters: {
    isLoading: state => state.loading,
    error: state => state.error,
    totalPages: state => state.totalPages,
    board: state => state.board,
    getThreadById: state => id => state.threads[id],
    getPostById: state => id => state.posts[id],
  },
  mutations: {
    startFetching(state) {
      state.loading = true;
    },
    endFetching(state) {
      state.loading = false;
    },
    clearError(state) {
      state.error = false;
    },
    failFetching(state, error) {
      state.loading = false;
      state.error = error;
    },
    updateBoard(state, { totalPages, board }) {
      state.totalPages = totalPages;
      state.board = board;
    },
    updateThreads(state, threads) {
      threads.forEach(t => {
        state.threads[t.id] = t;
      });
    },
    updatePosts(state, posts) {
      posts.forEach(p => {
        state.posts[p.id] = p;
      });
    },
  },
  actions: {
    commitData({ commit }, payload) {
      commit('updatePosts', _.flatten(
        payload.map(({ headPost }) => ([
          transformPostData(headPost),
          ...headPost.replies.map(transformPostData),
        ]))
      ));
      commit('updateThreads', payload.map(({ id, postCount, headPost }) => ({
        id,
        postCount,
        headPost: headPost.id,
        replies: headPost.replies.map(r => r.id),
      })));
    },
    clearError({ commit }) {
      commit('clearError');
    },
    async fetchBoard({ dispatch, commit }, { page = 0 }) {
      try {
        commit('startFetching');
        const { data } = await Api.fetchBoard(page);
        const totalPages = data.pageCount;
        const threads = data.threads;
        dispatch('commitData', threads);
        commit('updateBoard', { totalPages, board: threads.map(t => t.id) });
        commit('endFetching');
      } catch(error) {
        console.error(error);
        commit('failFetching', error);
      }
    },
    async fetchThreadById({ dispatch, commit }, id) {
      try {
        commit('startFetching');
        const { data } = await Api.fetchThread(id);
        dispatch('commitData', [ data ]);
        commit('endFetching');
      } catch(error) {
        console.error(error);
        commit('failFetching', error);
      }
    },
  },
});
