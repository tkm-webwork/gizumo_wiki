import axios from '@Helpers/axiosDefault';

export default {
  namespaced: true,
  state: {
    targetCategoryName: '',
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
    deleteCategoryId: state => state.deleteCategoryId,
    // ↑追加しなくてもいい（DELETEリクエスト時のurl指定でrootGettersを使いたい場合のみ必要）
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategories({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        const payload = { categories: [] };
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: '/category',
        }).then((response) => {
          const categoriesData = response.data.categories;
          categoriesData.forEach((val) => {
            // console.log('forEachのval:', val);
            payload.categories.push(val);
          });
          commit('doneGetAllCategories', payload);
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
          reject();
        });
      });
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      // console.log(categoryId, categoryName);
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters }) {
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${rootGetters['categories/deleteCategoryId']}`,
          // url: `/category/${this.state.categories.deleteCategoryId}`,
        }).then((response) => {
          // NOTE: エラー時はresponse.data.codeが0で返ってくる。
          console.log('response.data.code:', response.data.code);
          if (response.data.code === 0) throw new Error(response.data.message);

          commit('doneDeleteCategory');
          resolve();
        });
      });
    },
    postCategory({ commit, rootGetters }, targetCategoryName) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', targetCategoryName);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('doneTargetCategory', { targetCategoryName });
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failFetchCategory', { message: err.message });
          reject();
        });
      });
    },
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then((response) => {
        const payload = response.data.category;
        commit('getCategoryDetail', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    editedCategoryName({ commit }, targetCategoryName) {
      commit('editedCategoryName', { targetCategoryName });
    },
    updateCategory({ commit, rootGetters }) {
      commit('clearMessage');
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
        commit('updateCategory', payload);
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
    getCategoryDetail(state, payload) {
      state.updateCategoryId = payload.id;
      state.updateCategoryName = payload.name;
    },
    editedCategoryName(state, { targetCategoryName }) {
      state.updateCategoryName = targetCategoryName;
    },
    updateCategory(state, payload) {
      state.updateCategoryId = payload.id;
      state.updateCategoryName = payload.name;
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
    confirmDeleteCategory(state, { categoryId, categoryName }) {
      state.deleteCategoryId = categoryId;
      state.deleteCategoryName = categoryName;
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    doneTargetCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },
  },
};
