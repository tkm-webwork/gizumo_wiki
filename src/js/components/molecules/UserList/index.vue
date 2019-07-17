<template>
  <div class="users-list">
    <app-heading :level="1">ユーザー一覧</app-heading>

    <div v-if="access.create" class="users-list__create">
      <app-router-link
        to="/users/create"
        hover-opacity
        small
        white
        round
        bg-lightgreen
      >
        新規ユーザーの作成
      </app-router-link>
    </div>

    <div v-if="errorMessage" class="users-list__notice">
      <app-text bg-error>{{ errorMessage }}</app-text>
    </div>

    <div v-if="doneMessage" class="users-list__notice">
      <app-text bg-success>{{ doneMessage }}</app-text>
    </div>

    <div class="users-list__number">
      <app-text tag="span">登録者数：  </app-text>
      <app-text tag="span">{{ userListLength }} 人</app-text>
    </div>
  </div>
</template>

<script>
import { RouterLink, Heading, Text } from '@Components/atoms';

export default {
  components: {
    appRouterLink: RouterLink,
    appHeading: Heading,
    appText: Text,
  },
  props: {
    errorMessage: {
      type: String,
      default: '',
    },
    doneMessage: {
      type: String,
      default: '',
    },
    userListLength: {
      type: Number,
      default: 0,
    },
    access: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="postcss" scoped>
.users-list {
  &__create {
    margin-top: 20px;
  }
  &__notice {
    margin-top: 20px;
  }
  &__number {
    margin-top: 20px;
  }
}
</style>
