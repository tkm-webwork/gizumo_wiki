import { storiesOf } from '@storybook/vue';
import { withKnobs, text } from '@storybook/addon-knobs';
import note from './README.md';

storiesOf('ATOMS|Textarea', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      template: `<app-textarea
                  name="content"
                  placeholder="記事の本文をマークダウン記法で入力してください。"
                  required
                  rows="8"
                  white-bg
                  :value="content"
                  @updateValue="updateValue"
                >
                </app-textarea>`,
      data() {
        return {
          title: '',
          content: '',
        }
      },
      props: {
        name: {
          type: String,
          default: 'inputName',
        },
        value: {
          type: String,
          default: text('value', ''),
        },
        whiteBg: {
          type: Boolean,
          default: true,
        },
        placeholder: {
          type: String,
          default: '入力してください'
        },
        required: {
          type: Boolean,
          default: true,
        },
      },
      computed: {
        classes() {
          return {
            text: true,
          }
        }
      },
      methods: {
        updateValue($event) {
          this[$event.target.name] = $event.target.value;
        }
      }
    }
  }, {notes: note});