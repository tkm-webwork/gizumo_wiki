<template lang="html">
  <div class="article-trashed">
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <table class="article-trashed-table">
      <thead class="article-trashed-table__head">
        <tr>
          <th v-for="(thead, index) in theads" :key="index">
            <app-text tag="span" theme-color bold>
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <transition-group name="fade" tag="tbody" class="article-trashed-table__body">
        <tr v-for="article in targetArray" :key="article.id">
          <td>
            <app-text tag="span" small>{{ article.title | title_content }}</app-text>
          </td>
          <td>
            <app-text tag="span" small>{{ article.content | title_content }}</app-text>
          </td>
          <td>
            <app-text tag="span" small>{{ article.created_at | dateText }}</app-text>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>
<script>
import {
  Text, Heading,
} from '@Components/atoms';

export default {
  components: {
    appText: Text,
    appHeading: Heading,
  },
  filters: {
    title_content(value) {
      let displayText = value;
      if (displayText.length > 30) {
        const shouldDisplayText = displayText.slice(0, 29);
        displayText = `${shouldDisplayText}...`;
      }
      return displayText;
    },
    dateText(value) {
      const displayDateText = value.slice(0, 10);
      return displayDateText;
    },
  },
  props: {
    targetArray: {
      type: Array,
      default: () => [],
    },
    theads: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '削除済み記事',
    },
  },
  computed: {
    articleTitle() {
      return `${this.title}の一覧`;
    },
  },
};
</script>
<style lang="postcss" scoped>
.article-trashed-table {
  width: 100%;
  text-align: left;
  background-color: #fff;
  tr {
    border-bottom: 1px solid var(--separatorColor);
  }
  &__head {
    th {
      padding: 5px 10px;
      vertical-align: middle;
    }
  }
  &__body {
    td {
      padding: 10px;
      vertical-align: middle;
      &.is-disabled {
        color: var(--disabledColor);
        font-size: 12px;
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
  }
}
</style>
