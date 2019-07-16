<template lang="html">
  <section class="user-list">
    <app-user-list
      :error-message="errorMessage"
      :done-message="doneMessage"
      :user-list-length="userListLength"
      :access="access"
    />
    <div class="user-list__table">
      <app-user-table
        :target-array="userList"
        :theads="theads"
        :access="access"
        @deleteModal="openDeleteModal"
      />
    </div>

    <app-delete-modal
      :access="access"
      @closeModal="toggleModal"
      @deleteUser="deleteUser"
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
  data() {
    return {
      theads: ['名前', 'アカウント名', 'メールアドレス', '権限', '', ''],
    };
  },
  computed: {
    access() {
      return this.$store.getters['auth/access'];
    },
    errorMessage() {
      return this.$store.state.users.errorMessage;
    },
    doneMessage() {
      return this.$store.state.users.doneMessage;
    },
    userList() {
      return this.$store.state.users.userList;
    },
    userListLength() {
      return this.$store.getters['users/userListLength'];
    },
    deleteUserId() {
      return this.$store.state.users.deleteUserId;
    },
  },
  created() {
    this.$store.dispatch('users/getAllUsers');
  },
  methods: {
    openDeleteModal(id) {
      this.toggleModal();
      this.$store.dispatch('users/clearMessage');
      this.$store.dispatch('users/openDeleteModal', { id });
    },
    deleteUser() {
      this.$store.dispatch('users/deleteUser', { id: this.deleteUserId })
        .then(() => {
          this.$store.dispatch('users/getAllUsers');
        });
      this.toggleModal();
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
