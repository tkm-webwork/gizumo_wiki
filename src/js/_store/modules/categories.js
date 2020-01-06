import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    loading: false,
    errorMessage: '',
    doneMessage: '',
    categoryList: [],
    deleteCategoryId: null,
    deleteCategoryName: '',
    updateCategoryId: null,
    updateCategoryName: '',
  },
  getters: {
    categoryList: state => state.categoryList,
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    editedCategoryName({ commit }, categoryName) {
      commit('editedCategoryName', { categoryName });
    },
    getAllCategories({ commit, rootGetters }) {
      axios(rootGetters['auth/token'])({ /**/
        method: 'GET',
        url: '/category',
      }).then((response) => {
        const payload = { categories: [] };
        response.data.categories.forEach((val) => {
          payload.categories.push(val);
        });
        commit('doneGetAllCategories', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    postCateogry({ commit, rootGetters }, categoryName) { // rootGettersで全てのGettersが使えるようになる。categoryNameにはインプットに入力した値が入っている。
      commit('toggleLoading'); // 質問

      const data = new URLSearchParams(); // 送りたいパラメータを使いやすくしている。
      data.append('name', categoryName); // パラメータ（data）に追加する
      return new Promise((resolve) => { // promise(resolve)で通信成功のthen表示ができる。
        axios(rootGetters['auth/token'])({ // 全てのGettersのauth.jsのtokenをとってくる。
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('donePostCategory');
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoding');
        });
      });
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters }, categoryId) {
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${categoryId}`,
        }).then((response) => {
          // NOTE: エラー時はresponse.data.codeが0で返ってくる。
          if (response.data.code === 0) throw new Error(response.data.message);

          commit('doneDeleteCategory');
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
        });
      });
    },
    getCategoryDetail({ commit, rootGetters }, categoryId) { // 最初の更新ボタンを押した時に、インプットにカテゴリーネームが表示される処理
      const { id } = categoryId;
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then((response) => {
        const responseData = response.data.category;
        commit('doneGetCategoryDetail', responseData);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    updateCategory({ commit, rootGetters }) { // 更新したいカテゴリーネームを更新した時の処理。
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', this.state.categories.updateCategoryId);
      data.append('name', this.state.categories.updateCategoryName);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${this.state.categories.updateCategoryId}`,
        data,
      }).then((response) => {
        const payload = response.data.category;
        commit('doneUpdateCategory', payload);
        commit('toggleLoading');
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
        commit('toggleLoading');
      });
    },
  },
  mutations: {
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, { categories }) {
      state.categoryList = [...categories];
    },
    failFetchCategory(state, { message }) {
      state.errorMessage = message;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    doneGetCategoryDetail(state, payload) {
      console.log(payload);
      state.updateCategoryId = payload.id;
      state.updateCategoryName = payload.name;
    },
    editedCategoryName(state, { categoryName }) {
      console.log(categoryName);
      state.updateCategoryName = categoryName;
    },
    doneUpdateCategory(state, payload) {
      console.log(payload);
      state.updateCategoryId = payload.id;
      state.updateCategoryName = payload.name;
      state.doneMessage = ('カテゴリーの更新完了しました。');
    },
  },
};
