<template>
  <div class="article-sort">
    <app-heading :level="1">記事の検索</app-heading>
    <app-select
      class="article-sort__year"
      name="year"
      @updateValue="$emit('selectedYear', $event)"
    >
      <option value="" disabled selected> --- </option>
      <option
        v-for="years in creationYear"
        :key="years.id"
        :value="years"
      >
        {{ years }}
      </option>
    </app-select>
    <app-select
      class="article-sort__user"
      name="user"
      @updateValue="$emit('selectedUser', $event)"
    >
      <option value="" disabled selected> --- </option>
      <option
        v-for="users in userList"
        :key="users.id"
        :value="users"
      >
        {{ users }}
      </option>
    </app-select>
    <div>
      {{ userList }}
    </div>
    <app-button
      class="article-sort__button"
      round
      @click="$emit('handleSubmit', $event)"
    >
      検索
    </app-button>
    <div class="article-sort__box">
      <div v-if="year && user">
        <app-text>
          {{ year }}
        </app-text>
        <app-text>
          {{ user }}
        </app-text>
        <app-list-item
          v-for="article in filterArticleList"
          :key="article.id"
          flex
          beetween
          align-items
          bg-white
          large
          border-bottom-gray
        >
          <app-text>
            {{ article.title }}
          </app-text>
        </app-list-item>
      </div>
      <div
        v-else-if="year"
        class="article-sort__box"
      >
        <app-text>
          {{ year }}
        </app-text>
        <app-list-item
          v-for="article in filterArticleList"
          :key="article.id"
          beetween
          align-items
          flex
          bg-white
          large
          border-bottom-gray
        >
          <app-text class="article-sort__box__user">
            {{ article.user }}
          </app-text>
          <app-list-item
            v-for="articleTitle in article.articles"
            :key="articleTitle.id"
            beetween
            flex
            bg-white
            large
          >
            <app-text class="article-sort__box__title">
              {{ articleTitle.title }}
            </app-text>
          </app-list-item>
        </app-list-item>
      </div>
      <div
        v-else
        class="article-sort__box"
      >
        <app-text>
          {{ user }}
        </app-text>
        <app-list-item
          v-for="article in filterArticleList"
          :key="article.id"
          beetween
          align-items
          flex
          bg-white
          large
          border-bottom-gray
        >
          <app-text class="article-sort__box__user">
            {{ article.year }}
          </app-text>
          <app-list-item
            v-for="articleTitle in article.articles"
            :key="articleTitle.id"
            beetween
            flex
            bg-white
            large
          >
            <app-text class="article-sort__box__title">
              {{ articleTitle.title }}
            </app-text>
          </app-list-item>
        </app-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Heading,
  Select,
  Button,
  ListItem,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appSelect: Select,
    appButton: Button,
    appListItem: ListItem,
    appText: Text,
  },
  props: {
    creationYear: {
      type: Array,
      default: () => [],
    },
    userList: {
      type: Array,
      default: () => [],
    },
    filterArticleList: {
      type: Array,
      default: () => [],
    },
    year: {
      type: String,
      default: '',
    },
    user: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="postcss" scoped>
.article-sort {
  &__box {
    &__user {
      display: block;
    }
    &__title {
      display: block;
    }
  }
}
</style>
