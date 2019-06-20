import axios from '@Helpers/axiosDefault';
// import Cookies from 'js-cookie';

export default {
  state: {
    targetArticle: {
      id: null,
      title: '',
      content: '',
      category: {
        id: null,
        name: '',
      },
    },
    articleList: [],
  },
  getters: {
    transformedArticles(state) {
      return state.articleList.map(article => ({
        id: article.id,
        content: `${article.title + article.content}`,
      }));
    },
  },
  mutations: {
    initPostArticle(state) {
      state.targetArticle = Object.assign({}, {
        id: null,
        title: '',
        content: '',
      });
    },
    doneGetArticle(state, payload) {
      state.targetArticle = Object.assign({}, state.targetArticle, payload.article);
    },
    editedTitle(state, payload) {
      state.targetArticle = Object.assign({}, { ...state.targetArticle }, {
        title: payload.title,
      });
    },
    editedContent(state, payload) {
      state.targetArticle = Object.assign({}, { ...state.targetArticle }, {
        content: payload.content,
      });
    },
    doneFilteredArticles(state, payload) {
      const filteredArticles = payload.articles.filter(
        article => article.category.name === payload.category,
      );
      state.articleList = [...filteredArticles];
    },
    doneGetAllArticles(state, payload) {
      state.articleList = [...payload.articles];
    },
    failFetchArticle(state) {
      return state;
    },
  },
  actions: {
    initPostArticle({ commit }) {
      commit('initPostArticle');
    },
    getAllArticles({ commit, rootGetters }) {
      axios(rootGetters.token)({
        method: 'GET',
        url: '/article',
      }).then((res) => {
        const payload = {
          articles: res.data.article,
        };
        commit('doneGetAllArticles', payload);
      }).catch((err) => {
        commit('failFetchArticle', { message: err.message });
      });
    },
    getArticleDetail({ commit, rootGetters }, articleId) {
      axios(rootGetters.token)({
        method: 'GET',
        url: `/article/${articleId}`,
      }).then((res) => {
        const payload = {
          article: res.data.article,
        };
        commit('doneGetArticle', payload);
      }).catch((err) => {
        commit('failFetchArticle', { message: err.message });
      });
    },
    editedTitle({ commit }, title) {
      commit({
        type: 'editedTitle',
        title,
      });
    },
    editedContent({ commit }, content) {
      commit({
        type: 'editedContent',
        content,
      });
    },
    filteredArticles({ commit, rootGetters }, category) {
      return new Promise((resolve, reject) => {
        axios(rootGetters.token)({
          method: 'GET',
          url: '/article',
        }).then((res) => {
          const payload = {
            category,
            articles: res.data.article,
          };
          commit('doneFilteredArticles', payload);
          resolve();
        }).catch((err) => {
          commit('failFetchArticle', { message: err.message });
          reject(new Error('エラーが発生しました'));
        });
      });
    },
  },
};
