import { storiesOf } from '@storybook/vue';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';

import note from './README.md';

const classNameDefaultValue = 'none';

const classNameOptions = {
  'none': '',
  'login-input': 'login-input',
};

const inputTypeDefaultValue = 'text'

const inputTypeOptions = {
  text: 'text',
  checkbox: 'checkbox',
  textarea: 'textarea',
  radio: 'radio',
  password: 'password',
  file: 'file',
  hidden: 'hidden',
  submit: 'submit',
  reset: 'reset',
  button: 'button',
  image: 'image',
}

storiesOf('ATOMS|Input', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      template: `<app-input
                  :name="name"
                  :class="classes"
                  :type="type"
                  :placeholder="placeholder"
                  :required="required"
                  :value="value"
                />`,
      props: {
        name: {
          type: String,
          default: 'inputName',
        },
        type: {
          type: String,
          default: select('type', inputTypeOptions, inputTypeDefaultValue),
        },
        required: {
          type: Boolean,
          default: boolean('required', false),
        },
        placeholder: {
          type: String,
          default: text('placeholder', '入力してください')
        },
        value: {
          type: String,
          default: text('value', ''),
        },
        whiteBg: {
          type: Boolean,
          default: false,
        }
      },
      computed: {
        classes() {
          return {
            input: true,
            'input--white-bg': this.whiteBg,
          };
        }
      }
    }
  },{ notes: note })
.add('whiteBg', () => {
  return {
    template: `<app-input
                :name="name"
                :class="classes"
                :type="type"
                :placeholder="placeholder"
                :required="required"
                :value="value"
                :whiteBg="whiteBg"
              />`,
    props: {
      name: {
        type: String,
        default: 'inputName',
      },
      type: {
        type: String,
        default: select('type', inputTypeOptions, inputTypeDefaultValue),
      },
      required: {
        type: Boolean,
        default: boolean('required', false),
      },
      placeholder: {
        type: String,
        default: text('placeholder', '入力してください')
      },
      value: {
        type: String,
        default: text('value', ''),
      },
      whiteBg: {
        type: Boolean,
        default: true,
      }
    },
    computed: {
      classes() {
        return {
          input: true,
          'input--white-bg': this.whiteBg,
        };
      }
    }
  }
},{ notes: note });