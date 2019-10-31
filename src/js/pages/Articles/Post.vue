<template lang="html">
  <app-article-post
    :article-title="articleTitle"
    :article-content="articleContent"
    :markdown-content="markdownContent"
    :category-list="categoryList"
    :loading="loading"
    :error-message="errorMessage"
    :access="access"
    :current-category-name="currentCategoryName"
    @selectedArticleCategory="selectedArticleCategory"
    @editedTitle="editedTitle"
    @editedContent="editedContent"
    @handleSubmit="postArticle"
  />
</template>

<script>
import { ArticlePost } from '@Components/molecules';

export default {
  components: {
    appArticlePost: ArticlePost,
  },
  data() {
    return {
      title: '',
      content: '',
    };
  },
  computed: { // targetArticleの変更をpropsに渡し表示に反映させる
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
    categoryList() { // categoriesディレクトリの{ categoryList }を取得。nameが
      const { categoryList } = this.$store.state.categories; // v-forによりリストに紐づく。
      return categoryList;
    },
    currentCategoryName() { // targetArticle.categoryの{ name }を取得。リストの初期表示に紐づく。
      const { name } = this.$store.state.articles.targetArticle.category;
      return name;
    },
    loading() {
      return this.$store.state.articles.loading;
    },
    errorMessage() {
      return this.$store.state.articles.errorMessage;
    },
    access() {
      return this.$store.getters['auth/access'];
    },
  },
  created() { // まずすべてのリストを取得。リストに反映させる
    this.$store.dispatch('categories/getAllCategories');
  },
  methods: { // stateの更新→computedに反映→markdownContentに反映
    editedTitle($event) { // getterへの反映もこの段階で行い、通信時参照データを作成
      this.$store.dispatch('articles/editedTitle', $event.target.value);
    },
    editedContent($event) { // 同上
      this.$store.dispatch('articles/editedContent', $event.target.value);
    },
    postArticle() { // 新規作成のaxios通信を発火
      if (this.loading) return;
      this.$store.dispatch('articles/postArticle').then(() => { //
        // this.$store.dispatch('articles/getArticles'); // 記事一覧の取得
        this.$router.push({ path: '/articles' }); // 遷移先のpush
      });
    },
    selectedArticleCategory($event) { // リストからカテゴリーが選択されたら実行。
      const categoryName = $event.target.value; // 対象となるカテゴリーのnameを送信しstateに対象のデータ登録
      this.$store.dispatch('articles/selectedArticleCategory', categoryName);
    },
  },
};
</script>
