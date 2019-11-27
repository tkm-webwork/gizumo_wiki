<template lang="html">
  <div class="article-accordion">
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <table class="article-accordion-table">
      <thead class="article-accordion-table__head">
        <tr>
          <th v-for="(thead, index) in theads" :key="index">
            <app-text tag="span" theme-color bold>
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <transition-group name="fade" tag="tbody" class="article-accordion-table__body">
        <tr
          v-for="user in targetArray"
          :key="user.id"
        >
          <td
            class="userName"
            @click="$emit('handleClick', user)"
          >
            <app-text tag="span" small>
              {{ user.name }}
              <a class="arrowMark">▼</a>
            </app-text>
          </td>
          <div v-if="actives.includes(user.id)">
            <td
              v-for="article in user.articles"
              :key="article.title"
              class="userTitle"
            >
              <app-text tag="span" small>{{ article.title }}</app-text>
            </td>
          </div>
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
    actives: {
      type: Array,
      required: true,
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
.article-accordion-table {
  width: 100%;
  text-align: left;
  background-color: #fff;
  tr {
    border-bottom: 5px solid var(--separatorColor);
    display: block;
    .userName {
      cursor: pointer;
    }
    .arrowMark{
      float: right;
    }
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
      display: block;
      border-bottom: 1px solid var(--separatorColor);
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
