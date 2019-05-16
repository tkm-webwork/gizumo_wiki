import { storiesOf } from '@storybook/vue';
import note from './README.md';

storiesOf('ATOMS|Text', module)
  .add('default', () => {
    return {
      template: `<app-text :class="classes">
                  テキストが入ります。
                </app-text>`,
      computed: {
        classes() {
          return {
            text: true,
          }
        }
      }
    }
  }, {notes: note});

storiesOf('ATOMS|Text', module)
.add('error', () => {
  return {
    template: `<app-text :class="classes">
                テキストが入ります。
              </app-text>`,
    props: {
      error: {
        type: Boolean,
        default: true,
      }
    },
    computed: {
      classes() {
        return {
          text: true,
          'text--error': this.error,
        }
      }
    }
  }
}, {notes: note});