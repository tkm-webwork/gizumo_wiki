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
      // const payload = { categories: [{ id: 9999, name: 'ダミーカテゴリー' }] };
      // commit('doneGetAllCategories', payload);
      // console.log(this.state.categories.categoryList);
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((response) => { // APIからGETしたデータを'response'で受け取る
        const payload = { categories: [] }; // ここに一つずつ格納する
        response.data.categories.forEach((val) => {
          payload.categories.push(val);
        });
        commit('doneGetAllCategories', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    // 課題1で追加
    postCategory({ commit, rootGetters }, categoryName) {
      // console.log(this.state.categories.categoryList);
      // Promiseを使用する理由はサーバからの応答に時間がかかる場合があり、処理を止めないようにするため
      return new Promise((resolve) => {
        commit('toggleLoading');
        // By default, axios serializes JavaScript objects to JSON.
        // To send data in the application / x - www - form - urlencoded format instead, you can use one of the following options.
        const data = new URLSearchParams(); // application/x-www-form-urlencoded形式で送る -> keyとvalueを送る方式
        data.append('name', categoryName); // 指定されたキーと値のペアを新しい検索パラメーターとして追加
        axios(rootGetters['auth/token'])({
          method: 'Post',
          url: '/category',
          data,
        }).then(() => {
          commit('doneAddCategory');
          commit('toggleLoading');
          resolve();
        });
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
        commit('toggleLoading');
      });
    },
    // 課題2で追加
    // APIに紐付けたIDからNAMEを取得してupdateCategoryNameに代入する
    getCategoryName({ commit, rootGetters }, categoryId) {
      console.log(rootGetters['auth/token']);
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then((response) => {
        // 本来、payload = response.data.category と定義して、mutationsに送信したかったが、
        // 上手くいかなかったので変数を二つ定義して送信
        const payloadId = response.data.category.id;
        const payloadName = response.data.category.name; // id と name が格納されている
        commit('assignCategoryName', { payloadId, payloadName });
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },

    editCategoryName({ commit }, categoryName) {
      commit('editCategoryName', { categoryName });
    },

    // updateCategoryではPromise()は必要ない
    // 変更したものだけが必要な場合はPromise()がいらない -> オブジェクトの個数には変更がない
    // Promise()が必要になる場合、データを追加や削除して、全ての情報が必要な場合にいる
    updateCategory({ commit, rootGetters }) {
      commit('toggleLoading');
      const data = new URLSearchParams();
      data.append('name', this.state.categories.updateCategoryName);
      data.append('id', this.state.categories.updateCategoryId);
      axios(rootGetters['auth/token'])({
        method: 'PUT',
        url: `/category/${this.state.categories.updateCategoryId}`,
        data,
      }).then((response) => {
        console.log(response);
        commit('doneUpdateCategory');
        commit('toggleLoading');
      })
        .catch((err) => {
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading');
        });
    },
    // 課題3で追加
    confirmDeleteCategory({ commit }, { categoryId, categoryName }) {
      commit('confirmDeleteCategory', { categoryId, categoryName });
    },
    deleteCategory({ commit, rootGetters }, deleteCategoryId) {
      return new Promise((resolve) => {
        axios(rootGetters['auth/token'])({
          method: 'DELETE',
          url: `/category/${deleteCategoryId}`,
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
    donePostCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。';
    },
    doneUpdateCategory(state) {
      state.doneMessage = 'カテゴリーの更新が完了しました';
    },
    assignCategoryName(state, { payloadId, payloadName }) {
      state.updateCategoryName = payloadName;
      state.updateCategoryId = payloadId;
    },
    editCategoryName(state, { categoryName }) {
      state.updateCategoryName = categoryName; // 新しい名前を格納
      console.log(state.updateCategoryName);
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
  },
};
