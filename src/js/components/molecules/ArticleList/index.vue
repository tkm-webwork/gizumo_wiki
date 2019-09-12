<template lang="html">
  <div class="article-list">
    <div v-if="doneMessage" class="article-list__notice--create">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <div v-if="errorMessage" class="article-list__notice--create">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <app-router-link
      to="articles/post"
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
      to="articles/trashed"
      key-color
      white
      bg-danger
      round
      hover-opacity
      small
    >
      削除済み記事一覧
    </app-router-link>
    <transition-group
      class="article-list__articles"
      name="fade"
      tag="ul"
    >
      <app-list-item
        v-for="article in targetArray"
        :key="article.id"
        flex
        beetween
        align-items
        bg-white
        large
        border-bottom-gray
      >
        <app-text
          class="article-list__title"
        >
          {{ article.title }}
        </app-text>
        <div class="article-list__links">
          <app-router-link
            :to="`/articles/${article.id}`"
            theme-color
            underline
            hover-opacity
          >
            詳細
          </app-router-link>
          <app-router-link
            :to="`/articles/${article.id}/edit`"
            white
            bg-lightgreen
            small
            round
            hover-opacity
          >
            更新
          </app-router-link>
          <app-button
            bg-danger
            small
            round
            hover-opacity
            :disabled="!access.delete"
            @click="openModal(article.id)"
          >
            {{ buttonText }}
          </app-button>
        </div>
      </app-list-item>
    </transition-group>
    <app-modal>
      <app-text
        ex-large
      >
        本当に削除しますか?
      </app-text>
      <app-button
        bg-danger
        @click="$emit('handleClick')"
      >
        削除
      </app-button>
    </app-modal>
    <div class="article-list__pagination">
      <app-router-link
        v-if="!isFirstPage"
        key-color
        white
        bg-lightgreen
        small
        round
        hover-opacity
        :to="{ path: '/articles', query: { page: 1, category: category }}"
        class="article-list__pagination--margin"
      >
        最初
      </app-router-link>
      <app-router-link
        v-if="!isFirstPage"
        key-color
        white
        bg-lightgreen
        small
        round
        hover-opacity
        :to="{ path: '/articles', query: { page: currentPage - 1, category: category }}"
        class="article-list__pagination--margin"
      >
        前
      </app-router-link>
      <app-router-link
        v-if="!isLastPage"
        key-color
        white
        bg-lightgreen
        small
        round
        hover-opacity
        :to="{ path: '/articles', query: { page: currentPage + 1, category: category }}"
        class="article-list__pagination--margin"
      >
        次
      </app-router-link>
      <app-router-link
        v-if="!isLastPage"
        key-color
        white
        bg-lightgreen
        small
        round
        hover-opacity
        :to="{ path: '/articles', query: { page: lastPage, category: category }}"
        class="article-list__pagination--margin"
      >
        最後
      </app-router-link>
    </div>
  </div>
</template>

<script>
import {
  Heading,
  ListItem,
  RouterLink,
  Button,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appListItem: ListItem,
    appRouterLink: RouterLink,
    appButton: Button,
    appText: Text,
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
    errorMessage: {
      type: String,
      default: '',
    },
    access: {
      type: Object,
      default: () => ({}),
    },
    currentPage: {
      type: Number,
      default: null,
    },
    lastPage: {
      type: Number,
      default: null,
    },
    category: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    articleTitle() {
      return `${this.title}の一覧`;
    },
    buttonText() {
      return this.access.delete ? '削除' : '削除権限がありません';
    },
    isFirstPage() {
      return this.currentPage === 1;
    },
    isLastPage() {
      return this.currentPage === this.lastPage;
    },
  },
  methods: {
    openModal(articleId) {
      if (!this.access.delete) return;
      this.$emit('openModal', articleId);
    },
  },
};
</script>

<style lang="postcss" scoped>
  .article-list {
    &__articles {
      margin-top: 16px;
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
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
    &__pagination {
      margin-top: 20px;
      text-align: center;
      &--margin {
        margin-left: 15px;
      }
      &--margin:first-child {
        margin-left: 0;
      }
    }
  }
</style>
