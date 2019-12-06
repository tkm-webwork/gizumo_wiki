<template lang="html">
  <div class="article-list">
    <div v-if="doneMessage" class="article-list__notice--create">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>
    <app-heading :level="1">{{ articleTitle }}</app-heading>
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
          {{ article.title | formatedTitle }}
        </app-text>
        <app-text
          class="article-list__contents"
        >
          {{ article.content | formatedContent }}
        </app-text>
        <app-text
          class="article-list__date"
        >
          {{ article.created_at | formatDate }}
        </app-text>
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
  </div>
</template>

<script>
import {
  Heading,
  ListItem,
  Button,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appHeading: Heading,
    appListItem: ListItem,
    appButton: Button,
    appText: Text,
  },
  filters: {
    formatDate(value) {
      let formatedDate = new Date(value);
      formatedDate = formatedDate.toLocaleString('ja-JP');
      return formatedDate;
    },
    formatedContent(value) {
      if (value.length > 30) {
        const formatedContent = value.slice(0, 30);
        const dots = '...';
        return formatedContent + dots;
      }
      return value;
    },
    formatedTitle(value) {
      if (value.length > 30) {
        const formatedTitle = value.slice(0, 30);
        const dots = '...';
        return formatedTitle + dots;
      }
      return value;
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
    access: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    articleTitle() {
      return `${this.title}の一覧`;
    },
    buttonText() {
      return this.access.delete ? '削除' : '削除権限がありません';
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
    .list-item{
      flex-direction: column;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    &__title {
      width: 100%;
      font-weight: bold;
    }
    &__date {
      width: 100%;
      color: #191970;
      font-size: 10px;
      opacity: 0.7;
    }
    &__contents{
      width: 100%;
      color: #696969;
      border-top: 1px dotted;
      margin-top: 10px;
      border-color: #f5f5f5;
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
