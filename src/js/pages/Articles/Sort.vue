<template>
  <div>
    <app-article-sort
      :creation-year="creationYear"
      :user-list="userList"
      :filter-article-list="filterArticleList"
      :year="searchResult.year"
      :user="searchResult.user"
      :error-message="errorMessage"
      :component-name="componentName"
      @selectedYear="selectedYear"
      @selectedUser="selectedUser"
      @handleSubmit="handleSubmit"
    />
  </div>
</template>

<script>
import { ArticleSort } from '@Components/molecules';

export default {
  components: {
    appArticleSort: ArticleSort,
  },
  data() {
    return {
      year: '',
      user: '',
      searchResult: {
        year: '',
        user: '',
      },
      componentName: '',
      errorMessage: '',
      filterArticleList: [],
    };
  },
  computed: {
    creationYear() {
      const articleYear = this.$store.state.articles.articleList;
      const array = [];
      articleYear.forEach((val) => {
        const years = new Date(val.user.created_at).getFullYear();
        array.push(years);
      });
      const newArray = array.filter((v, i, a) => a.indexOf(v) === i);
      return newArray;
    },
    userList() {
      const users = this.$store.state.users.userList;
      const array = users.map(val => val.fullName);
      const newArray = array.filter(Boolean);
      return newArray;
    },
    articleList() {
      return this.$store.state.articles.articleList;
    },
  },
  created() {
    this.$store.dispatch('articles/getAllArticles', 1);
    this.$store.dispatch('users/getAllUsers');
  },
  methods: {
    selectedYear($event) {
      this.year = $event.target.value;
    },
    selectedUser($event) {
      this.user = $event.target.value;
    },
    handleSubmit() {
      this.searchResult.year = '';
      this.searchResult.user = '';
      if (!this.year && !this.user) {
        this.errorMessage = '作成年・ユーザーどちらか選択必須です';
        this.filterArticleList = [];
        return;
      }
      this.errorMessage = '';
      this.searchResult.year = this.year;
      this.searchResult.user = this.user;
      const newArticleList = this.articleList.slice();
      const newUserList = this.userList.slice();
      const newCreationYear = this.creationYear.slice();
      const filterYear = newArticleList.filter((val) => {
        const articleYear = new Date(val.created_at).getFullYear();
        return articleYear === Number(this.year);
      });
      if (this.year && this.user) {
        this.componentName = 'both';
        const filterUser = filterYear.filter(val => this.user === val.user.full_name);
        this.filterArticleList = filterUser;
      } else if (this.year) {
        this.componentName = 'year';
        const filteringYear = newUserList.reduce((acc, value) => {
          const obj = {};
          obj.user = value;
          const filter = newArticleList.filter(val => value === val.user.full_name);
          obj.articles = filter;
          acc.push(obj);
          return acc;
        }, []);
        const creatorHasArticle = filteringYear.filter(val => val.articles.length);
        this.filterArticleList = creatorHasArticle;
      } else {
        this.componentName = 'user';
        const filteringUser = newCreationYear.reduce((acc, value) => {
          const obj = {};
          obj.year = value;
          obj.user = this.user;
          const filter = newArticleList.filter(val => this.user === val.user.full_name);
          obj.articles = filter;
          acc.push(obj);
          return acc;
        }, []);
        this.filterArticleList = filteringUser;
      }
      this.year = '';
      this.user = '';
    },
  },
};
</script>
<style lang="postcss" scoped>
</style>
