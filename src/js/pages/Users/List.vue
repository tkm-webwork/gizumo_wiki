<template lang="html">
  <section class="user-list">
    <app-user-list
      :error-message="errorMessage"
      :user-list-length="userListLength"
    />
    <div class="user-list__table">
      <app-user-table
        :target-array="userList"
        :theads="theads"
        @deleteModal="toggleModal"
      />
    </div>

    <app-delete-modal
      @closeModal="toggleModal"
      @excuteDelete="deleteUser"
    />
  </section>
</template>

<script>
import { UserList, UserTable, DeleteModal } from '@Components/molecules';
import Mixins from '@Helpers/mixins';

export default {
  components: {
    appUserList: UserList,
    appUserTable: UserTable,
    appDeleteModal: DeleteModal,
  },
  mixins: [Mixins],
  computed: {
    errorMessage() {
      return this.$store.state.users.errorMessage;
    },
    userList() {
      return this.$store.state.users.userList;
    },
    userListLength() {
      return this.$store.getters.userListLength;
    },
    theads() {
      return ['名前', 'アカウント名', 'メールアドレス', '権限', '', ''];
    },
  },
  created() {
    this.$store.dispatch('getAllUsers');
  },
  methods: {
    deleteUser() {
      const { id } = this.$route.params;

      this.$store.dispatch('deleteUser', { id });
    },
  },
};
</script>

<style lang="postcss" scoped>
.user-list {
  &__table {
    margin-top: 20px;
  }
}
</style>
