<template>
  <div>
    <app-category-edit
      :disabled="loading ? true : false"
      :update-category="updateCategory"
      :access="access"
      :error-message="errorMessage"
      :done-message="doneMessage"
      @updateValue="updateValue"
      @clearMessage="clearMessage"
      @editCategory="editCategory"
    />
  </div>
</template>

<script>
import { CategoryEdit } from '@Components/molecules';

export default {
  components: {
    appCategoryEdit: CategoryEdit,
  },
  data() {
    return {
      updateCategory: this.$store.state.categories.updateCategoryName, // 新しいカテゴリーネームがupdateValueメソッドにより代入される。
    };
  },
  computed: { // 対象stateの変化で実行される。子コンポーネントにpropsとして渡す。
    access() {
      return this.$store.getters['auth/access'];
    },
    loading() {
      return this.$store.state.categories.loading;
    },
    updateCategoryId() { // 対象カテゴリーのidを取得
      return this.$store.state.categories.updateCategoryId;
    },
    errorMessage() {
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() {
      return this.$store.state.categories.doneMessage;
    },
  },
  methods: { // 再描画に応じて実行
    updateValue($event) { // 入力されたvalue(題名)を反映して上書き
      this[$event.target.name] = $event.target.value; // 今回は[$event.target.name] = updateCategory。つまり、リアクティブプロパティへの代入
    }, // オブジェクトは、必要なvalueを「オブジェクト名.プロパティ名」という型だけではなく「オブジェクト名[プロパティ名]」と取り出せる。
    clearMessage() { // 成功・失敗メッセージのリセット。どこで実施？→
      this.$store.dispatch('categories/clearMessage');
    },
    editCategory() {
      this.$store.dispatch('categories/editCategory',
        { categoryId: this.updateCategoryId, newCategoryName: this.updateCategory });
    },
  },
};
</script>
