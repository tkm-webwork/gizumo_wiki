<template lang="html">
  <div class="author_list">
    <app-heading :level="1">{{ articleTitle }}</app-heading>
    <table class="author_list-table">
      <thead class="author_list-table__head">
        <tr>
          <th v-for="(thead, index) in theads" :key="index">
            <app-text tag="span" theme-color bold>
              {{ thead }}
            </app-text>
          </th>
        </tr>
      </thead>
      <transition-group name="fade" tag="tbody" class="author_list-table__body">
        <tr
          v-for="user in targetArray"
          :key="user.id"
        >
          <td
            class="author_list-table__body__userName"
            @click="$emit('handleClick', user)"
          >
            <app-text tag="span" small>
              {{ user.name }}
              <a
                v-if="actives.includes(user.id)"
                class="author_list-table__body__arrowMark"
              >
                ▲
              </a>
              <a v-else class="author_list-table__body__arrowMark">▼</a>
            </app-text>
          </td>
          <div v-if="actives.includes(user.id)">
            <td
              v-for="article in user.articles"
              :key="article.id"
              class="author_list-table__body__userTitle"
            >
              <app-text tag="span" small>{{ article.title }}</app-text>
              <app-router-link
                :to="`/articles/${article.id}`"
                class="author_list-table__body__titleLink"
                theme-color
                underline
                hover-opacity
              >
                詳細
              </app-router-link>
            </td>
          </div>
        </tr>
      </transition-group>
    </table>
  </div>
</template>
<script>
import {
  Text, Heading, RouterLink,
} from '@Components/atoms';

export default {
  components: {
    appText: Text,
    appHeading: Heading,
    appRouterLink: RouterLink,
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
.author_list-table {
  width: 100%;
  text-align: left;
  background-color: #fff;
  tr {
    border-bottom: 5px solid var(--separatorColor);
    display: block;
  }
  &__head {
    th {
      padding: 5px 10px;
      vertical-align: middle;
    }
  }
  &__body {
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    td {
      padding: 10px;
      vertical-align: middle;
      display: block;
      border-bottom: 1px solid var(--separatorColor);
    }
    &__userName {
      cursor: pointer;
    }
    &__arrowMark {
      float: right;
    }
    &__titleLink {
      float: right;
    }
  }
}
</style>
