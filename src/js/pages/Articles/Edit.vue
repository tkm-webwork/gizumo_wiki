<template lang="html">
  <app-article-edit
    :article-id="articleId"
    :article-title="articleTitle"
    :article-content="articleContent"
    :markdown-content="markdownContent"
    :current-category-name="currentCategoryName"
    :category-list="categoryList"
    :loading="loading"
    :done-message="doneMessage"
    :access="access"
    @selectedArticleCategory="selectedArticleCategory"
    @editedTitle="editedTitle"
    @editedContent="editedContent"
    @handleSubmit="handleSubmit"
  />
</template>

<script>
import { ArticleEdit } from '@Components/molecules';

export default {
  components: {
    appArticleEdit: ArticleEdit,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
  computed: { // targetArticleの変更をpropsに渡し表示に反映させる
    articleId() {
      let { id } = this.$route.params;
      id = parseInt(id, 10);
      return id;
    },
    articleTitle() { // titleを取り出し代入。valueを紐づく。
      const { title } = this.$store.state.articles.targetArticle;
      return title;
    },
    articleContent() { // contentを取り出し代入。valueと紐づく。
      const { content } = this.$store.state.articles.targetArticle;
      return content;
    },
    markdownContent() { // #はh1を、\nはUNIX系の改行を表す。マークダウンの表示に紐づく。
      return `# ${this.articleTitle}\n${this.articleContent}`;
    },
    currentCategoryName() { // targetArticle.categoryの{ name }を取得。リストの初期表示に紐づく。
      const { name } = this.$store.state.articles.targetArticle.category;
      return name;
    },
    categoryList() { // categoriesディレクトリの{ categoryList }を取得。nameが
      const { categoryList } = this.$store.state.categories; // v-forによりリストに紐づく。
      return categoryList;
    },
    loading() {
      return this.$store.state.articles.loading;
    },
    doneMessage() {
      return this.$store.state.articles.doneMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() { // まずすべてのリストを取得。リストに反映させる
    this.$store.dispatch('categories/getAllCategories'); // 既存の内容を反映
    this.$store.dispatch('articles/getArticleDetail', parseInt(this.articleId, 10));
  }, // ↑ articleIdで識別。通信してdataを取得しtargetArticleを更新。
  methods: { // stateの更新→computedに反映→markdownContentに反映
    editedTitle($event) { // →子のpropsに反映→孫のatomsに反映→プレビューに内容が表示
      this.$store.dispatch('articles/editedTitle', $event.target.value);
    },
    editedContent($event) { // 同上
      this.$store.dispatch('articles/editedContent', $event.target.value);
    },
    handleSubmit() { // 内容更新のaxios通信を発火
      if (this.loading) return;
      this.$store.dispatch('articles/updateArticle');
    },
    selectedArticleCategory($event) { // リストからカテゴリーが選択されたら実行
      const categoryName = $event.target.value;
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
  },
};
</script>
