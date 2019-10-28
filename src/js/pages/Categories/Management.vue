<template lang="html">
  <div class="category-management">
    <section class="category-management-post">
      <app-category-post
        :category="category"
        :disabled="loading ? true : false"
        :error-message="errorMessage"
        :done-message="doneMessage"
        :access="access"
        @udpateValue="updateValue"
        @clearMessage="clearMessage"
        @handleSubmit="pushCategory"
      />
      <!--
        pushCaategoryを定義。
        disabledは文字通り利用できない状態で適用する。上のcategory-postでは、
        loadingの真偽値で属性を与えるため、あらかじめpropsとして渡しているが、
        下のcategory-listはアクセス権の有無で値を切り替えるため、直接定義している
      -->
    </section>
    <section class="category-management-list">
      <app-category-list
        :theads="theads"
        :categories="categoryList"
        :delete-category-name="deleteCategoryName"
        :access="access"
        @openModal="openModal"
        @sendEditData="sendEditData"
      />
    </section>
  </div>
</template>

<script>
import { CategoryPost, CategoryList } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appCategoryPost: CategoryPost,
    appCategoryList: CategoryList,
  },
  mixins: [Mixins],
  data() {
    return {
      category: '', // 追加欄に入力されたタイトル。しかし、リアクティブではない
      theads: ['カテゴリー名', '', '', ''], // 見出し
    };
  },
  computed: {
    access() { // ユーザーの権限を表す。deleteなど、各操作ごとに存在する
      return this.$store.getters['auth/access'];
    },
    loading() { // 処理中か否かを表す。属性disabledが依存している
      return this.$store.state.categories.loading;
    },
    errorMessage() { // エラーメッセージ監視
      return this.$store.state.categories.errorMessage;
    },
    doneMessage() { // doneメッセージ監視
      return this.$store.state.categories.doneMessage;
    },
    categoryList() { // カテゴリーリスト更新
      return this.$store.state.categories.categoryList;
    },
    deleteCategoryId() { // confirmDeleteCategoryミューテーションの監視。
      return this.$store.state.categories.deleteCategoryId;
    },
    deleteCategoryName() { // 同上
      return this.$store.state.categories.deleteCategoryName;
    },
  },
  created() { // まずメッセージリセットと全カテゴリー取得
    this.$store.dispatch('categories/clearMessage');
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: { // こっちでも親のmutationsやactionsが使えるように。
    updateValue($event) { // 追加対象のカテゴリーのvalue(題名)を取り出す
      this[$event.target.name] = $event.target.value; // 今回は[$event.target.name] = category。つまり、リアクティブプロパティへの代入
    }, // オブジェクトは、必要なvalueを「オブジェクト名.プロパティ名」という型だけではなく「オブジェクト名[プロパティ名]」と取り出せる。
    clearMessage() { // CategoryPost.vueで処理が成功した後に発火
      this.$store.dispatch('categories/clearMessage');
    },
    openModal() { // 削除ボタンと紐づいた@openModalにより発火
      this.toggleModal();
      this.$store.dispatch('categories/clearMessage');
    },
    pushCategory() { // 作成。
      this.$store.dispatch('categories/pushCategory', { category: this.category }) // 入力欄と連動したdataのcategory
        .then(() => { // 追加成功後のリスト更新。app-category-listによる再描画が行われる
          this.$store.dispatch('categories/getAllCategories');
          this.category = ''; // 入力欄リセット
        });
    },
    sendEditData(categoryId, categoryName) { // stateはmutationの処理でしか変更できません
      this.$store.dispatch('categories/sendEditData',
        { categoryId, categoryName });
    },
  },
};
</script>

<style lang="postcss" scoped>
.category-management {
  display: flex;
  height: calc(100vh - 94px);
  &-post {
    padding-right: 2%;
    width: 38%;
    border-right: 1px solid #ccc;
  }
  &-list {
    margin-left: 2%;
    width: 60%;
  }
}
</style>
