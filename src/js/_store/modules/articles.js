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
      user: {
        account_name: '',
        created_at: '',
        email: '',
        full_name: '',
        id: '',
        password_reset_flg: null,
        role: '',
        updated_at: '',
      },
    },
    articleList: [],
    deleteArticleId: null,
  },
  getters: {
    transformedArticles(state) {
      return state.articleList.map(article => ({
        id: article.id,
        content: `${article.title + article.content}`,
      }));
    },
    targetArticle: state => state.targetArticle,
    deleteArticleId: state => state.deleteArticleId,
  },
  mutations: {
    initPostArticle(state) {
      state.targetArticle = Object.assign({}, {
        id: null,
        title: '',
        content: '',
        category: {
          id: null,
          name: '',
        },
        user: {
          account_name: '',
          created_at: '',
          email: '',
          full_name: '',
          id: '',
          password_reset_flg: null,
          role: '',
          updated_at: '',
        },
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
    selectedArticleCategory(state, payload) {
      state.targetArticle.category = Object.assign(
        {},
        { ...state.targetArticle.category },
        { ...payload.category },
      );
    },
    updateArticle(state, { article }) {
      state.targetArticle = Object.assign({}, state.targetArticle, { ...article });
    },
    confirmDeleteArticle(state, { articleId }) {
      state.deleteArticleId = articleId;
    },
    doneDeleteArticle(state) {
      state.deleteArticleId = null;
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
          articles: res.data.data.articles,
        };
        commit('doneGetAllArticles', payload);
      }).catch((err) => {
        commit('failFetchArticle', { message: err.message });
      });
    },
    getArticleDetail({ commit, rootGetters }, articleId) {
      return new Promise((resolve) => {
        axios(rootGetters.token)({
          method: 'GET',
          url: `/article/${articleId}`,
        }).then((res) => {
          const category = res.data.article.category
            ? res.data.article.category.category
            : { id: null, name: '' };
          const payload = {
            article: {
              id: res.data.article.id,
              title: res.data.article.title,
              content: res.data.article.content,
              updated_at: res.data.article.updated_at,
              created_at: res.data.article.created_at,
              user: res.data.article.user,
              category,
            },
          };
          commit('doneGetArticle', payload);
          resolve();
        }).catch((err) => {
          commit('failFetchArticle', { message: err.message });
        });
      }).catch(() => {
        throw new Error('エラーが発生しました');
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
            articles: res.data.data.articles,
          };
          commit('doneFilteredArticles', payload);
          resolve();
        }).catch((err) => {
          commit('failFetchArticle', { message: err.message });
          reject(new Error('エラーが発生しました'));
        });
      });
    },
    selectedArticleCategory({ commit, rootGetters }, categoryName) {
      const { categoryList } = rootGetters;
      let matches = categoryList.find(category => category.name === categoryName);
      // カテゴリーが空のときのidとnameは下記をセット
      if (!matches) {
        matches = {
          id: null,
          name: '',
        };
      }
      const payload = {
        category: matches,
      };
      commit('selectedArticleCategory', payload);
    },
    updateArticle({ commit, rootGetters }) {
      const data = new URLSearchParams();
      data.append('id', rootGetters.targetArticle.id);
      data.append('title', rootGetters.targetArticle.title);
      data.append('content', rootGetters.targetArticle.content);
      data.append('user_id', rootGetters.targetArticle.user.id);
      data.append('category_id', rootGetters.targetArticle.category.id);
      axios(rootGetters.token)({
        method: 'PUT',
        url: `/article/${rootGetters.targetArticle.id}`,
        data,
      }).then((res) => {
        const payload = {
          article: {
            id: res.data.article.id,
            title: res.data.article.title,
            content: res.data.article.content,
            updated_at: res.data.article.updated_at,
            created_at: res.data.article.created_at,
            user: res.data.article.user,
            category: res.data.article.category.category,
          },
        };
        commit('updateArticle', payload);
      }).catch(() => {

      });
    },
    confirmDeleteArticle({ commit }, articleId) {
      commit('confirmDeleteArticle', { articleId });
    },
    deleteArticle({ commit, rootGetters }) {
      const data = new URLSearchParams();
      data.append('id', rootGetters.deleteArticle);
      axios(rootGetters.token)({
        method: 'DELETE',
        url: `/article/${rootGetters.deleteArticleId}`,
        data,
      }).then(() => {
        commit('doneDeleteArticle');
      });
    },
    postArticle({ rootGetters }) {
      const data = new URLSearchParams();
      data.append('title', rootGetters.targetArticle.title);
      data.append('content', rootGetters.targetArticle.content);
      data.append('user_id', rootGetters.user.id);
      if (rootGetters.targetArticle.category.id !== null) {
        data.append('category_id', rootGetters.targetArticle.category.id);
      }
      axios(rootGetters.token)({
        method: 'POST',
        url: '/article',
        data,
      }).then((res) => {
        console.log(res);
      }).catch(() => {

      });
    },
  },
};
