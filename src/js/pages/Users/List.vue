<template lang="html">
  <section class="user-list">
    <app-user-list
      :error-message="errorMessage"
      :done-message="doneMessage"
      :user-list-length="userListLength"
    />
    <div class="user-list__table">
      <app-user-table
        :target-array="userList"
        :theads="theads"
        @deleteModal="openDeleteModal"
      />
    </div>

    <app-delete-modal
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
  computed: {
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
      return this.$store.getters.userListLength;
    },
    deleteUserId() {
      return this.$store.state.users.deleteUserId;
    },
    theads() {
      return ['名前', 'アカウント名', 'メールアドレス', '権限', '', ''];
    },
  },
  created() {
    this.$store.dispatch('getAllUsers');
  },
  methods: {
    openDeleteModal(id) {
      this.toggleModal();
      this.$store.dispatch('clearMessage');
      this.$store.dispatch('openDeleteModal', { id });
    },
    deleteUser() {
      this.$store.dispatch('deleteUser', { id: this.deleteUserId }).then(() => {
        this.toggleModal();
        this.$store.dispatch('getAllUsers');
      });
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
