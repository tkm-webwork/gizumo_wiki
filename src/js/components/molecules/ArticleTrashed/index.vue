<template lang="html">
  <div class="trashedarticle">
    <app-heading :lavel="1">{{ articleTitle }}</app-heading>
    <app-list-item
      v-for="article in trashedList"
      :key="article.id"
      flex
      beetween
      align-items
      bg-white
      large
      border-bottom-gray
    >
      <div class="trashedarticle__contents">
        <app-text
          class="trashedarticle__title"
        >
          {{ article.title | filterText }}
        </app-text>
        <app-text
          class="trashedarticle__content"
        >
          {{ article.content | filterText }}
        </app-text>
        <app-text
          class="trashedarticle__updated_at"
        >
          {{ article.updated_at | filterTimeText }}
        </app-text>
      </div>
    </app-list-item>
  </div>
</template>

<script>
import {
  Heading,
  ListItem,
  Text,
} from '@Components/atoms';

export default {
  components: {
    appListItem: ListItem,
    appHeading: Heading,
    appText: Text,
  },
  filters: {
    filterText(val) {
      if (!val || val.length < 30) return val;
      return `${val.substr(0, 30)}...`;
    },
    filterTimeText(val) {
      return new Date(val).toLocaleString();
    },
  },
  props: {
    trashedList: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },

  },
  computed: {
    articleTitle() {
      return `${this.title}`;
    },

  },
};
</script>

<style lang="postcss" scoped>
  .trashedarticle {
    &__contents {
    }
    &__title {
      font-weight: bold;
    }
    &__content {
    }
    &__updated_at {
      color: #c0c0c0;
      font-size: 10px;
    }
  }
</style>
