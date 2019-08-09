import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import note from './README.md';

storiesOf('ATOMS|ListItem', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      template: `<ul>
                  <app-list-item
                    :flex="flex"
                    :beetween="beetween"
                    :alignItems="alignItems"
                    :large="large"
                  >
                    テキストが入ります
                  </app-list-item>
                </ul>
                `,
      props: {
        flex: {
          type: Boolean,
          default: boolean('flex', false),
        },
        beetween: {
          type: Boolean,
          default: boolean('beetween', false),
        },
        alignItems: {
          type: Boolean,
          default: boolean('alignItems', false),
        },
        large: {
          type: Boolean,
          default: boolean('large', false),
        },
      },
    }
  }, {notes: note})
  .add('bgWhite', () => {
    return {
      template: `<ul>
                  <app-list-item
                    :bgWhite="bgWhite"
                    :flex="flex"
                    :beetween="beetween"
                    :alignItems="alignItems"
                    :large="large"
                  >
                    テキストが入ります
                  </app-list-item>
                </ul>
                `,
      props: {
        bgWhite: {
          type: Boolean,
          default: true,
        },
        flex: {
          type: Boolean,
          default: boolean('flex', false),
        },
        beetween: {
          type: Boolean,
          default: boolean('beetween', false),
        },
        alignItems: {
          type: Boolean,
          default: boolean('alignItems', false),
        },
        large: {
          type: Boolean,
          default: boolean('large', false),
        },
      },
    }
  }, {notes: note});