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
    <app-button
      class="article-sort__button"
      round
      @click="$emit('handleSubmit', $event)"
    >
      検索
    </app-button>
    <div class="article-sort__box">
      <app-text
        v-if="errorMessage"
        bg-error
      >
        {{ errorMessage }}
      </app-text>
      <transition
        name="fade"
        mode="out-in"
      >
        <component
          :is="componentName"
          :filter-article-list="filterArticleList"
          :year="year"
          :user="user"
        />
      </transition>
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
import both from './both';
import year from './year';
import user from './user';

export default {
  components: {
    appHeading: Heading,
    appSelect: Select,
    appButton: Button,
    appListItem: ListItem,
    appText: Text,
    both,
    year,
    user,
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
    componentName: {
      type: String,
      default: '',
    },
    errorMessage: {
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
