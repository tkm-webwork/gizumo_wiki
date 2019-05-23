<template lang="html">
  <ul :class="classes">
    <app-list-item
      v-for="item in targetArray"
      :key="item.id"
      flex
      beetween
      align-items
      bg-white
      large
    >
      <app-text
        inline-block
      >
        {{ item.title }}
      </app-text>
      <div class="article-list-links">
        <app-router-link
          :to="`articles/${item.id}`"
          bg-keycolor
          large
          white
        >
          詳細
        </app-router-link>
        <app-router-link
          :to="`articles/${item.id}/edit`"
          white
          bg-lightgreen
          large
        >
          更新
        </app-router-link>
        <app-button
          bg-danger
        >
          削除
        </app-button>
      </div>
    </app-list-item>
  </ul>
</template>

<script>
import {
  ListItem,
  RouterLink,
  Button,
  Text,
} from '@Components/atoms';

export default {
  components: {
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
  },
  computed: {
    classes() {
      return {
        'article-list--bordergray': this.borderGray,
      };
    },
  },
};
</script>

<style lang="css" scoped>
  .article-list-links *:not(first-child) {
    margin-left: 16px;
  }
  .article-list--bordergray li {
    border-bottom: 1px solid var(--lightGray);
  }
  .article-list--bordergray li:first-child {
    border-top: 1px solid var(--lightGray);
  }

</style>
