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
    updateCategoryId: state => state.updateCategoryId,
    updateCategoryName: state => state.updateCategoryName,
  },
  actions: {
    clearMessage({ commit }) {
      commit('clearMessage');
    },
    getAllCategories({ commit, rootGetters }) {
      // const payload = { categories: [{ id: 9999, name: 'ダミーカテゴリー' }] };
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((res) => {
        const payload = { categories: [] };
        res.data.categories.forEach((value) => {
          payload.categories.push(value);
        });
        commit('doneGetAllCategories', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then((response) => {
        const payload = response.data.category;
        commit('doneGetCategory', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
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
    postCategory({ commit, rootGetters }, category) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', category);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('donePostCategory');
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failFetchCategory', { message: err.message });
          reject();
        });
      });
    },
    updateCategory({ commit, rootGetters }) {
      return new Promise((resolve, reject) => {
        commit('clearMessage');
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('id', rootGetters['categories/updateCategoryId']);
        data.append('name', rootGetters['categories/updateCategoryName']);
        axios(rootGetters['auth/token'])({
          method: 'PUT',
          url: `/category/${rootGetters['categories/updateCategoryId']}`,
          data,
        }).then((res) => {
          const payload = res.data.category;
          commit('updateCategory', payload);
          commit('doneUpdateCategory');
          commit('toggleLoading');
          resolve();
        }).catch((err) => {
          commit('toggleLoading');
          commit('failFetchCategory', { message: err.message });
          reject();
        });
      });
    },
    editedCategory({ commit }, category) {
      commit('editedCategory', category);
    },
    openDeleteModal({ commit }, category) {
      commit('openDeleteModal', category);
    },
  },
  mutations: {
    editedCategory(state, category) {
      state.updateCategoryName = category;
    },
    clearMessage(state) {
      state.errorMessage = '';
      state.doneMessage = '';
    },
    updateCategory(state, payload) {
      state.updateCategoryName = payload.name;
    },
    doneUpdateCategory(state) {
      state.doneMessage = 'カテゴリーの更新が完了しました';
    },
    doneGetCategory(state, payload) {
      state.updateCategoryId = payload.id;
      state.updateCategoryName = payload.name;
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
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },
    openDeleteModal(state, category) {
      state.deleteCategoryId = category.id;
      state.deleteCategoryName = category.name;
    },
    doneDeleteCategory(state) {
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
  },
};
