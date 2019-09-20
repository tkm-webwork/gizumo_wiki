<template>
  <div>
    <app-article-sort
      :creation-year="creationYear"
      :user-list="userList"
      :filter-article-list="filterArticleList"
      :year="searchResult.year"
      :user="searchResult.user"
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
      filterArticleList: [],
    };
  },
  computed: {
    creationYear() {
      const years = this.$store.state.articles.articleList;
      const array = [];
      years.forEach((val) => {
        const year = new Date(val.user.created_at).getFullYear();
        array.push(year);
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
      this.searchResult.year = this.year;
      this.searchResult.user = this.user;
      const newArticleList = this.articleList.slice();
      const newUserList = this.userList.slice();
      const newCreationYear = this.creationYear.slice();
      const filterYear = newArticleList.filter((val) => {
        const year = new Date(val.created_at).getFullYear();
        return year === Number(this.year);
      });
      if (this.year && this.user) {
        const filterUser = filterYear.filter(val => this.user === val.user.full_name);
        this.filterArticleList = filterUser;
      } else if (this.year) {
        const filteringYear = newUserList.reduce((acc, value) => {
          const obj = {};
          obj.user = value;
          const filter = newArticleList.filter(val => value === val.user.full_name);
          obj.articles = filter;
          acc.push(obj);
          return acc;
        }, []);
        this.filterArticleList = filteringYear;
      } else {
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
