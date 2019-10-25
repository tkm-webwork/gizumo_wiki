import axios from '@Helpers/axiosDefault';
/*
  どのリクエストもヘッダーにトークンを組み込みたい！共通部分のURLは省略したい！
  → axios.create()で「設定が組み込まれた別のインスタンス」として定義すればいい。
    それを呼び出せば毎回の記入を省略してaxiosのリクエストが飛ばせる！！
*/
export default {
  namespaced: true,
  state: {
    loading: false, // manegement.vue → :disabled="loading ? true : false"
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
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: '/category',
      }).then((response) => {
        const payload = { categories: [] };
        response.data.categories.forEach((val) => {
          payload.categories.push(val); // 定義した空の配列に順に詰め込む
        });
        commit('doneGetAllCategories', payload); // それを渡して発火させる。
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message }); // 通信して取得したメッセージ
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
          // 通信成功かつエラーが出た→Errorインスタンスにmessageを引数として入れる。
          commit('doneDeleteCategory');
          resolve();
        }).catch((err) => { // 通信そのものが失敗した場合の処理
          commit('failFetchCategory', { message: err.message });
        });
      });
    },
    pushCategory({ commit, rootGetters }, { category }) { // 作成
      // console.log(category); // このaxiosはaxiosDefaultで定義されたインスタンス。
      return new Promise((resolve) => { // application/x-www-form-urlencoded形式で送る。
        commit('toggleLoading'); // 処理後に反転させる。
        const data = new URLSearchParams(); // URLSearchParamsのインスタンス
        data.append('name', category); // の最後に追加
        // console.log(data);
        axios(rootGetters['auth/token'])({ // 1つ目の()でトークンを渡し、２つ目でaxiosインスタンスを呼び出す。
          url: '/category',
          method: 'POST',
          data, // 上で定義したインスタンス（オブジェクト）を組み込む。
        }).then(() => {
          commit('doneAddCategory'); // 完了メッセージの表示
          commit('toggleLoading'); // リスト追加後に反転させる。
          resolve();
        }).catch((err) => { // 通信そのものが失敗した場合の処理
          commit('failFetchCategory', { message: err.message });
          commit('toggleLoading'); // 反転させ正常に戻す
        });
      });
    },
    getCategoryDetail({ commit, rootGetters }, categoryId) {
      axios(rootGetters['auth/token'])({
        method: 'GET',
        url: `/category/${categoryId}`,
      }).then((response) => {
        const payload = response.data.category;
        commit('doneGetCategoryDetail', payload);
      }).catch((err) => {
        commit('failFetchCategory', { message: err.message });
      });
    },
    editedCategoryName({ commit }, categoryName) {
      commit('editedCategoryName', { categoryName });
    },
    updateCategory({ commit, rootGetters }) {
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
    clearMessage(state) { // メッセージのリセット
      state.errorMessage = '';
      state.doneMessage = '';
    },
    doneGetAllCategories(state, { categories }) { // getAllCategoriesアクションで発火
      state.categoryList = [...categories]; // categoriesは通信で取得したカテゴリー達
    },
    failFetchCategory(state, { message }) { // カテゴリーの取得失敗
      state.errorMessage = message; // axiosで返ってきたメッセージ
    },
    toggleLoading(state) { // loadhingの切り替え
      state.loading = !state.loading;
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
    doneAddCategory(state) {
      state.doneMessage = 'カテゴリーの追加が完了しました。'; // 作成。
    },
    doneGetCategoryDetail(state, payload) {
      state.updateCategoryId = payload.id;
      state.updateCategoryName = payload.name;
    },
    editedCategoryName(state, { categoryName }) {
      state.updateCategoryName = categoryName;
    },
    doneUpdateCategory(state, payload) {
      state.updateCategoryId = payload.id;
      state.updateCategoryId = payload.name;
      state.doneMessage = 'カテゴリーの更新が完了しました。';
    },
  },
};
