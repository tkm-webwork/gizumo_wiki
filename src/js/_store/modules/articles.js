// 記事全般に関する処理
import axios from '@Helpers/axiosDefault';
// import Cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    targetArticle: { // 更新画面→新規作成画面と遷移すると更新画面のtargetArticle
      id: null, // が残っているためinitPostArticleでstateの初期化をする。
      title: '', // postページのcreatedで発火させる。
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
    lastPage: null, // 追加
    currentArticlePage: null, // 追加。ページ遷移ボタンプッシュ時に値が更新され、通信に用いられる。
    currentArticlesList: [], // ここに入ったものがリストに表示される
    trashedArticleList: [], // 追加
    deleteArticleId: null,
    loading: false,
    doneMessage: '',
    errorMessage: '',
  },
  getters: { // getter は state のデータに何らかの変換を通したものを取り出せるようにするもの
    transformedArticles(state) { // getterから記事一覧情報を取得。
      return state.currentArticlesList.map(article => ({ // 必要dataのみの抽出。contentの変形
        id: article.id,
        content: `${article.title + article.content}`,
      }));
    },
    tenNewArticleList(state) {
      let count = 0;
      return state.currentArticlesList.filter(() => {
        count += 1;
        return count <= 10;
      });
    },
    editedAuthorList(state) {
      const noEditArr = state.currentArticlesList
        .map(article => article.user.account_name); // 重複そのままの作者一覧
      const newArray = Array.from(new Set(noEditArr)); // getterの配列から重複を取り除いた配列の作成
      return newArray.map(author => ({
        name: author,
        articles: state.currentArticlesList
          .filter(article => article.user.account_name === author),
      }));
    },
    targetArticle: state => state.targetArticle, // 更新や作成などの通信で利用できるように
    deleteArticleId: state => state.deleteArticleId, // 削除の通信で利用できるように
    currentArticlePage: state => state.currentArticlePage, // 記事取得のHTTP通信で使用する
  },
  mutations: {
    doneGetTrashedArticles(state, payload) { // 追加
      state.trashedArticleList = [...payload.trashedArticles];
    },
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
    getReEditData(state, ReEditData) {
      state.targetArticle = Object.assign({}, { ...state.targetArticle }, {
        title: ReEditData.articleTitle,
        content: ReEditData.articleContent,
        category: {
          id: ReEditData.categoryId,
          name: ReEditData.categoryName,
        },
      });
    },
    doneGetArticle(state, payload) { // ここでarticleIdで識別した
      state.targetArticle = Object.assign({}, state.targetArticle, payload.article);
    },
    doneGetArticles(state, payload) {
      state.currentArticlesList = [...payload.articles];
      state.lastPage = payload.lastPage;
    },
    updatePageNumber(state, page) { // 追加。ページ番号の更新
      state.currentArticlePage = page;
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
    failRequest(state, { message }) {
      state.errorMessage = message;
    },
    selectedArticleCategory(state, payload) {
      state.targetArticle.category = Object.assign(
        {},
        { ...state.targetArticle.category },
        { ...payload.category }, // リストで選ばれた対象のカテゴリーに上書きする
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
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    clearMessage(state) {
      state.doneMessage = '';
      state.errorMessage = '';
    },
    displayDoneMessage(state, payload = { message: '成功しました' }) {
      state.doneMessage = payload.message;
    },
  },
  actions: {
    updatePageNumber({ commit }, page) { // ページ番号の更新
      commit('updatePageNumber', page);
    },
    getTrashedArticles({ commit, rootGetters }) { // 追加
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/article/trashed',
      }).then((res) => {
        const payload = {
          trashedArticles: res.data.articles,
        };
        commit('doneGetTrashedArticles', payload);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    initPostArticle({ commit }) {
      commit('initPostArticle');
    },
    getReEditData({ commit }, ReEditData) { // 作成
      commit('getReEditData', ReEditData);
    },
    // getArticles({ commit, rootGetters }, categoryName) { // 複数データを渡すため、オブジェクトに変更
    //   return new Promise((resolve, reject) => {
    //     axios(rootGetters['auth/token'])({
    //       method: 'GET', // nameが渡されていれば対象の記事のみ。なければ全て取得。
    //       url: categoryName ? `/article?category=${categoryName}` : '/article',
    //     }).then((res) => {
    //       const payload = {
    //         articles: res.data.articles,
    //         lastPage: res.data.meta.last_page,
    //       };
    //       commit('updatePageNumber', 1); // 基準となるページ番号のセット
    //       commit('doneGetArticles', payload); // リストに取得データを反映
    //       resolve();
    //     }).catch((err) => {
    //       commit('failRequest', { message: err.message });
    //       reject();
    //     });
    //   });
    // },
    getArticles({ commit, rootGetters }, { categoryName, page }) { // ページ取得の処理をまとめた
      let variableURL = '';
      if (categoryName && page) {
        variableURL = `?category=${categoryName}&page=${page}`;
      } else if (!categoryName && page) {
        variableURL = `?page=${page}`;
      } else if (categoryName && !page) {
        variableURL = `?category=${categoryName}`;
      }
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/article${variableURL}`,
      }).then((res) => {
        const payload = {
          articles: res.data.articles,
          lastPage: res.data.meta.last_page,
        };
        commit('doneGetArticles', payload);
      }).catch((err) => {
        commit('failRequest', { message: err.message });
      });
    },
    getArticleDetail({ commit, rootGetters }, articleId) {
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: `/article/${articleId}`,
        }).then((res) => {
          const category = res.data.article.category
            ? res.data.article.category
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
          commit('failRequest', { message: err.message });
          reject();
        });
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
    selectedArticleCategory({ commit, rootGetters }, categoryName) {
      const categoryList = rootGetters['categories/categoryList']; // リストを取得し、カテゴリ名から対象を取得
      const matches = categoryList.find(category => category.name === categoryName); // 対象のオブジェクトを代入
      // カテゴリーが空のときのidとnameは下記をセットmatchesをletに変更
      // if (!matches) {
      //   matches = {
      //     id: null,
      //     name: '',
      //   };
      // }
      const payload = { // nameから特定したカテゴリーを代入してstateの書き換えを行う
        category: matches,
      };
      commit('selectedArticleCategory', payload);
    },
    updateArticle({ commit, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', rootGetters['articles/targetArticle'].id);
      data.append('title', rootGetters['articles/targetArticle'].title);
      data.append('content', rootGetters['articles/targetArticle'].content);
      data.append('user_id', rootGetters['articles/targetArticle'].user.id);
      data.append('category_id', rootGetters['articles/targetArticle'].category.id);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/article/${rootGetters['articles/targetArticle'].id}`,
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
            category: res.data.article.category,
          },
        };
        commit('updateArticle', payload);
        commit('toggleLoading');
        commit('displayDoneMessage', { message: 'ドキュメントを更新しました' });
      }).catch(() => {
        commit('toggleLoading');
      });
    },
    confirmDeleteArticle({ commit }, articleId) {
      commit('confirmDeleteArticle', { articleId });
    },
    deleteArticle({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        const data = new URLSearchParams();
        data.append('id', rootGetters['articles/deleteArticleId']);
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/article/${rootGetters['articles/deleteArticleId']}`,
          data,
        }).then(() => {
          commit('doneDeleteArticle');
          resolve();
          commit('displayDoneMessage', { message: 'ドキュメントを削除しました' });
        }).catch((err) => {
          commit('failRequest', { message: err.message });
          reject();
        });
      });
    },
    postArticle({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('title', rootGetters['articles/targetArticle'].title);
        data.append('content', rootGetters['articles/targetArticle'].content);
        data.append('user_id', rootGetters['auth/user'].id);
        if (rootGetters['articles/targetArticle'].category.id !== null) {
          data.append('category_id', rootGetters['articles/targetArticle'].category.id);
        }
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/article',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('displayDoneMessage', { message: 'ドキュメントを作成しました' });
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failRequest', { message: err.message });
          reject(err);
        });
      });
    },
    clearMessage({ commit }) {
      commit('clearMessage');
    },
  },
};
