<template lang="html">
  <div class="article-author-list">
    <app-heading :level="1">作成者ごとの記事リスト</app-heading>
    <div class="article-author-list__accordion-list">
      <app-accordion
        v-for="(author) in createAuthorList"
        :key="genUniqueKey(author)"
        class="article-author-list__accordion-list__item"
      >
        <template #title>
          <app-text>{{ author }}</app-text>
        </template>
        <template #content>
          <ul>
            <app-list-item
              v-for="(article) in createArticleByAuthor(author)"
              :key="genUniqueKey(article)"
              large
            >
              <app-router-link
                :to="`/articles/${article.articleId}`"
                underline
                hover-opacity
              >
                {{ article.title }}
              </app-router-link>
            </app-list-item>
          </ul>
        </template>
      </app-accordion>
    </div>
  </div>
</template>

<script>
import {
  Accordion, Heading, ListItem, RouterLink, Text,
} from '@Components/atoms';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appAccordion: Accordion,
    appHeading: Heading,
    appListItem: ListItem,
    appRouterLink: RouterLink,
    appText: Text,
  },
  mixins: [Mixins],
  props: {
    articleList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    createAuthorList() {
      const authorList = [];
      let isNullAuthor = false;
      this.articleList.forEach((el) => {
        // ユーザがない場合フラグをtrueにしてreturn
        if (el.user === null) {
          isNullAuthor = true;
          return;
        }
        // 既にリストに入っている作成者だった場合return
        if (authorList.find(item => item === el.user.full_name)) return;
        authorList.push(el.user.full_name);
      });
      // 作成者がnullの記事が存在した場合、リストの末尾にunknownを追加
      if (isNullAuthor) {
        authorList.push('作者不明');
      }
      return authorList;
    },
    // UUID直前挿入版methods
    // createAuthorList() {
    //   const authorList = [];
    //   let isNullAuthor = false;
    //   this.articleList.forEach((el) => {
    //     // ユーザがない場合フラグをtrueにしてreturn
    //     if (el.user === null) {
    //       isNullAuthor = true;
    //       return;
    //     }
    //     // 既にリストに入っている作成者だった場合return
    //     if (authorList.find(item => item.name === el.user.full_name)) return;
    //     const author = {
    //       id: this.$uuid.v4(),
    //       name: el.user.full_name,
    //     };
    //     authorList.push(author);
    //   });
    //   // 作成者がnullの記事が存在した場合、リストの末尾にunknownを追加
    //   if (isNullAuthor) {
    //     const author = {
    //       id: this.$uuid.v4(),
    //       name: '作者不明',
    //     };
    //     authorList.push(author);
    //   }
    //   return authorList;
    // },
  },
  methods: {
    createArticleByAuthor(author) {
      const articleList = [];
      if (author === '作者不明') {
        // articleList = this.articleList.filter(item => item.user === null);
        this.articleList.forEach((item) => {
          if (item.user === null) {
            let title = '';
            if (item.title.length >= 30) {
              title = item.title.substr(0, 30);
              title += '…';
            }
            const article = {
              articleId: item.id,
              title: title || item.title,
            };
            articleList.push(article);
          }
        });
      } else {
        this.articleList.forEach((item) => {
          if (item.user === null) return;
          if (item.user.full_name === author) {
            let title = '';
            if (item.title.length >= 30) {
              title = item.title.substr(0, 30);
              title += '…';
            }
            const article = {
              articleId: item.id,
              title: title || item.title,
            };
            articleList.push(article);
          }
        });
      }
      return articleList;
    },
    // UUID直前挿入版methods
    // createArticleByAuthor(author) {
    //   const articleList = [];
    //   if (author.name === '作者不明') {
    //     // articleList = this.articleList.filter(item => item.user === null);
    //     this.articleList.forEach((item) => {
    //       if (item.user === null) {
    //         let title = '';
    //         if (item.title.length >= 30) {
    //           title = item.title.substr(0, 30);
    //           title += '…';
    //         }
    //         const article = {
    //           id: this.$uuid.v4(),
    //           articleId: item.id,
    //           title: title || item.title,
    //         };
    //         articleList.push(article);
    //       }
    //     });
    //   } else {
    //     this.articleList.forEach((item) => {
    //       if (item.user === null) return;
    //       if (item.user.full_name === author.name) {
    //         let title = '';
    //         if (item.title.length >= 30) {
    //           title = item.title.substr(0, 30);
    //           title += '…';
    //         }
    //         const article = {
    //           id: this.$uuid.v4(),
    //           articleId: item.id,
    //           title: title || item.title,
    //         };
    //         articleList.push(article);
    //       }
    //     });
    //   }
    //   return articleList;
    // },
  },
};
</script>

<style lang="postcss" scoped>
.article-author-list {
  &__accordion-list {
    margin-top: 10px;
    &__item {
      margin-top: 5px;
      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
