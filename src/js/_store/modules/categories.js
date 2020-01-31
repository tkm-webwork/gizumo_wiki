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
    getAllCategories({ commit, rootGetters }) {
      // ユーザーのトークンを取得
      // メソッドとエンドポイントを指定
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((response) => {
        // カテゴリーオブジェクトを取得している
        const payload = { categories: [] };
        // responseからデータをひとつずつ取り出し、payload.categoriesへ代入している
        response.data.categories.forEach((val) => {
          payload.categories.push(val);
        });
        // mutationsのdoneGetAllCategoriesを実行し、payloadを引き渡している
        commit('doneGetAllCategories', payload);
      }).catch((err) => {
        // mutationsのfailFetchCategoryを実行し、エラーメッセージを引き渡している
        commit('failFetchCategory', { message: err.message });
      });
    },
    postCategoris({ commit, rootGetters }, categoryName) {
    // "作成"→"作成中"の表示を切り替える
      commit('toggleLoading');
      // サーバーサイド側にformのdataを認識させる為の処理を行う
      const data = new URLSearchParams();
      // カテゴリーネームを送る
      data.append('name', categoryName);
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'POST',
          url: '/category',
          data,
        }).then(() => {
          // 作成完了のメッセージを表示
          commit('donePostCategory');
          // "作成中"→"作成"の表示を切り替える
          commit('toggleLoading');
          resolve();
        }).catch((err) => {
          // エラーメッセージの表示
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading');
          reject();
        });
      });
    },
    getCategory({ commit, rootGetters }, categoryId) {
      return new Promise((resolve, reject) => {
        // カテゴリーIDを元にして変更対象のカテゴリーを検索
        axios(rootGetters['auth/token'])({
          method: 'GET',
          url: `/category/${categoryId}`,
        }).then((response) => {
          // thenの引数からidとnameのオブジェクトを変数に代入
          const payload = response.data.category;
          // updateDetailsを実行し、payloadを引き渡す
          commit('updateDetail', payload);
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
          reject();
        });
      });
    },
    updateCategoryName({ commit }, updateValue) {
      commit('updateCategoryName', updateValue);
    },
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    editCategory({ commit, rootGetters, state }) {
      commit('toggleLoading');
      const editId = state.updateCategoryId;
      const editName = state.updateCategoryName;
      const data = new URLSearchParams();
      data.append('id', `${editId}`);
      data.append('name', `${editName}`);
      return new Promise((resolve, reject) => {
        axios(rootGetters['auth/token'])({
          method: 'PUT',
          url: `/category/${editId}`,
          data,
        }).then(() => {
          commit('donePutCategory');
          commit('toggleLoading');
          resolve();
        }).catch((err) => {
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading');
          reject();
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
    updateDetail(state, payload) {
      state.updateCategoryId = payload.id;
      state.updateCategoryName = payload.name;
    },
    updateCategoryName(state, payload) {
      state.updateCategoryName = payload;
    },
    donePutCategory(state) {
      state.deleteCategoryId = null;
      state.deleteCategoryName = '';
      state.doneMessage = 'カテゴリーの更新が完了しました。';
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
  },
};
