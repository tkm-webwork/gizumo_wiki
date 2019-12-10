import uuid from 'uuid';

export default {
  methods: {
    toggleModal() {
      this.$root.$emit('toggleModal');
    },
    createUniqueKey(key) {
      return `${key}${uuid.v4()}`;
    },
  },
};
