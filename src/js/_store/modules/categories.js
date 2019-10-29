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
    getAllCategories({ commit }) {
      const payload = { categories: [{ id: 9999, name: 'ダミーカテゴリー' }] };
      commit('doneGetAllCategories', payload);
    },
    postCateogry({ commit, rootGetters }, categoryName) {
      commit('toggleLoading');

      const data = new URLSearchParams();
      data.append('name', categoryName);
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          commit('toggleLoading');
          commit('donePostCategory');
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading');
        });
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
    // -------------------------カテゴリー作成時に追加したもの。-----------------------------------------
    resisterCategory({ commit, rootGetters }, { category }) {
      return new Promise((resolve) => { // 指定したvalueデータを受け取っている。
        commit('toggleLoading');
        const data = new URLSearchParams();
        // console.log(this.state.categories.updateCategoryId);何も値が入っていなかった。
        // console.log(category); // 入力されたcategoryに値が入ってくる。
        data.append('name', category); // 登録の際は、nameのみとAPIに書いてあるので、nameのみ。ここでは、categoryが入力された値のため、
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then((response) => {
          const payload = { categories: [] }; // 空の配列が入っているため、一件しか表示されていない？
          payload.categories.push(response.data.category); // リストにpushして表示している。更新の際にも使用できるかも。
          commit('AddDoneMessage');
          commit('toggleLoading');
          resolve();
        }).catch((err) => {
          // console.log('通信失敗');
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading');
        });
      });
    },
    // -------------------------カテゴリー更新時に追加したもの。-----------------------------------------
    getCategoryDetail({ commit, rootGetters }, categoryId) { // 更新ボタンを押した際にカテゴリー詳細を取ってくる処理。
      axios(rootGetters['auth/token'])({
        method: 'GET', // 取得しているからget
        url: `/category/${categoryId}`,
      }).then((response) => {
        const payload = response.data.category;
        commit('doneGetCategoryDetail', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    editUpdateCategoryName({ commit }, categoryName) {
      // console.log(categoryName);undefinedと出てしまう。
      commit('editUpdateCategoryName', { categoryName });
    },
    updateCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('id', this.state.categories.updateCategoryId);
      data.append('name', this.state.categories.updateCategoryName);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${this.state.categories.updateCategoryId}`, // 更新の際には、更新すべきIdが必要なためつけている。
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
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },
    doneDeleteCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの削除が完了しました。';
    },
    // -------------------------カテゴリー作成時に追加したもの。-----------------------------------------
    AddDoneMessage(state) {
      state.errorMessage = '';
      state.doneMessage = 'カテゴリーの追加が完了しました';
    },
    // -------------------------カテゴリー更新時に追加したもの。-----------------------------------------
    doneGetCategoryDetail(state, payload) {
      // console.log(payload);
      state.updateCategoryId = payload.id;
      state.updateCategoryName = payload.name;
    },
    editUpdateCategoryName(state, { categoryName }) {
      // console.log(categoryName);
      state.updateCategoryName = categoryName;
    },
    doneUpdateCategory(state, payload) {
      state.updateCategoryId = payload.id;
      state.updateCategoryName = payload.name;
      state.doneMessage = 'カテゴリーの更新が完了しました';
    },
  },
};
