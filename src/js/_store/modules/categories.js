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
    // カテゴリー欄を取得
    getAllCategories({ commit,rootGetters }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then( response => {
        const payload = response.data;
        commit('doneGetAllCategories',payload);
      }).catch( err => {
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
    // categoryの追加
    addCategory({ commit, rootGetters }, categoryName) {
      return new Promise( resolve => {
        commit('toggleLoading');
        const data = new URLSearchParams();
        data.append('name', categoryName);
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then( response => {
          commit('addCategory');
          commit('toggleLoading');
          resolve();
        }).catch( err => {
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading');
        });
      });
    },
    // 初期状態でカテゴリー名を取得
    getCategoryDetail({ commit, rootGetters }, { id }) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${id}`,
      }).then( response => {
        // id,name情報が入っているobjectをpayloadに代入
        const payload = response.data.category;
        commit('getCategoryDetail', payload);
      }).catch( err => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    // valueの書き換え
    changeCategoryName({ commit }, categoryName) {
      commit('changeCategoryName', categoryName);
    },
    // 変更したvalueの保存
    updateCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', this.state.categories.updateCategoryName);
      data.append('id', this.state.categories.updateCategoryId);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${this.state.categories.updateCategoryId}`,
        data,
      }).then( response => {
        const payload = response.data.category;
        commit('updateCategory', payload);
        commit('toggleLoading');
      }).catch( err => {
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
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    // categoryの追加時のメッセージ
    addCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました';
    },
    // 初期状態でカテゴリー名の取得
    getCategoryDetail(state, payload) {
      state.updateCategoryName = payload.name;
      state.updateCategoryId = payload.id;
    },
    // valueの書き換え
    changeCategoryName(state, categoryName) {
      state.updateCategoryName = categoryName;
    },
    // 変更したvalueの保存
    updateCategory(state, payload) {
      state.updateCategoryName = payload.name;
      state.updateCategoryId = payload.id;
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
  },
};
