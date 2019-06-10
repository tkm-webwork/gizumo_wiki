<template lang="html">
  <app-user-create
    :loading="loading"
    :error-message="errorMessage"
    :name="name"
    :email="email"
    :password="password"
    @back="back"
    @updateValue="updateValue"
    @createUser="createUser"
  />
</template>

<script>
import { UserCreate } from '@Components/molecules';

export default {
  components: {
    appUserCreate: UserCreate,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
    };
  },
  computed: {
    loading() {
      return this.$store.state.users.loading;
    },
    errorMessage() {
      return this.$store.state.users.errorMessage;
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    updateValue(target) {
      this[target.name] = target.value;
    },
    createUser() {
      this.$store.dispatch('createUser', {
        name: this.name,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
