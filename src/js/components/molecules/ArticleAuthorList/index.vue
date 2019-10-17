<template lang="html">
  <div class="article-author-list">
    <app-heading :level="1">作成者ごとの記事リスト</app-heading>
    <div class="article-author-list__accordion-list">
      <app-accordion
        v-for="(articles, author) in articleByAuthor"
        :key="genUniqueKey(author)"
        class="article-author-list__accordion-list__item"
      >
        <template #title>
          <app-text>{{ author }}</app-text>
        </template>
        <template #content>
          <ul>
            <app-list-item
              v-for="(article) in articles"
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
    articleByAuthor: {
      type: Object,
      default: () => {},
    },
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
