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
                  v-validate="'required|name'"
                  :name="name"
                  :type="type"
                  :placeholder="placeholder"
                  :value="value"
                  :data-vv-as="dataVvAs"
                  :error-messages="errors.collect('name')"
                />`,
      props: {
        name: {
          type: String,
          default: text('name', 'inputName'),
        },
        type: {
          type: String,
          default: select('type', inputTypeOptions, inputTypeDefaultValue),
        },
        placeholder: {
          type: String,
          default: text('placeholder', '入力してください')
        },
        value: {
          type: String,
          default: text('value', ''),
        },
        dataVvAs: {
          type: String,
          default: text('dataVvAs', ''),
        }
      },
    }
  },{ notes: note })
  .add('whiteBg', () => {
    return {
      template: `<app-input
                  :whiteBg="whiteBg"
                  v-validate="'required|name'"
                  :name="name"
                  :type="type"
                  :placeholder="placeholder"
                  :value="value"
                  :data-vv-as="dataVvAs"
                  :error-messages="errors.collect('name')"
                />`,
      props: {
        whiteBg: {
          type: Boolean,
          default: true,
        },
        name: {
          type: String,
          default: text('name', 'inputName'),
        },
        type: {
          type: String,
          default: select('type', inputTypeOptions, inputTypeDefaultValue),
        },
        placeholder: {
          type: String,
          default: text('placeholder', '入力してください')
        },
        value: {
          type: String,
          default: text('value', ''),
        },
        dataVvAs: {
          type: String,
          default: text('dataVvAs', ''),
        }
      },
    }
  },{ notes: note });