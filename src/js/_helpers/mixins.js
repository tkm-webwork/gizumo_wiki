const UNIQUE_KEY_PROP = '__UNIQUE_KEY_PROP__';
const isObject = obj => obj !== null && typeof obj === 'object';

export default {
  methods: {
    toggleModal() {
      this.$root.$emit('toggleModal');
    },
    genUniqueKey(item) {
      const value = this.$uuid.v4();
      if (isObject(item)) {
        if (UNIQUE_KEY_PROP in item) {
          return item[UNIQUE_KEY_PROP];
        }
        Object.defineProperty(item, UNIQUE_KEY_PROP, { value });
        return value;
      }
      return item + value;
    },
  },
};
