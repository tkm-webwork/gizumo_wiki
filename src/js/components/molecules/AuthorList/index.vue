<template lang="html">
  <div class="article-list">
    <div v-if="doneMessage" class="article-list__notice--create">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <app-router-link
      to="/articles/post"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-list__create-link"
    >
      新しいドキュメントを作る
    </app-router-link>
    <app-router-link
      to="/articles/trashed?page=1"
      key-color
      white
      bg-lightgreen
      small
      round
      hover-opacity
      class="article-list__create-link"
    >
      削除済み記事一覧
    </app-router-link>
    <ul
      class="article-list__articles"
    >
      <app-accordion
        v-for="[authorName, articleTitles] in authorMap"
        :key="authorName"
        bg-white
        large
        border-bottom-gray
      >
        <template #title>
          <h3>
            {{ authorName }}
          </h3>
        </template>
        <template #content>
          <ul>
            <li
              v-for="article in articleTitles"
              :key="article"
            >
              {{ article }}
            </li>
          </ul>
        </template>
      </app-accordion>
    </ul>
  </div>
</template>

<script>
import {
  Heading,
  RouterLink,
  Text,
  Accordion,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appRouterLink: RouterLink,
    appText: Text,
    appAccordion: Accordion,
  },
  filters: {
    textFormat(text) {
      if (text.length <= 30) return text;
      return `${text.substring(1, 30)}...`;
    },
  },
  props: {
    className: {
      type: String,
      default: '',
    },
    targetArray: {
      type: Array,
      default: () => [],
    },
    borderGray: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'すべて',
    },
    doneMessage: {
      type: String,
      default: '',
    },
  },
  computed: {
    articleTitle() {
      return `${this.title}の一覧`;
    },
    authorMap() {
      const authorMap = new Map();
      this.targetArray.forEach((todo) => {
        if (authorMap.has(todo.user.full_name)) {
          authorMap.get(todo.user.full_name).push(todo.title);
        } else {
          authorMap.set(todo.user.full_name, [todo.title]);
        }
      });
      return authorMap;
    },
  },
};
</script>

<style lang="postcss" scoped>
.article-list {
  &__title {
    width: 60%;
  }
  &__create-link {
    margin-top: 16px;
  }
  &__links {
    *:not(first-child) {
      margin-left: 16px;
    }
  }
  &__notice--create {
    margin-bottom: 16px;
  }
}
</style>
