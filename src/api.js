import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export default {
  fetchBoard: async (page = 0) => await api.get(`/board?page=${page}`),
  fetchThread: async (id) => await api.get(`/board/${id}`),
  createThread: async (title, content, attachments) =>
    await api.post(`/board`, { title, content, attachments}),
  createPost: async (threadId, title, sage, content, attachments) =>
    await api.post(`/board/${threadId}`, { title, sage, content, attachments}),
};
