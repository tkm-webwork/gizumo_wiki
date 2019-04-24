import { storiesOf } from '@storybook/vue';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import storyRouter from 'storybook-vue-router';

import note from './README.md';

const targetArray = [
  {
    id: 1,
    name: 'HOME',
    path: '/',
  },
  {
    id: 2,
    name: '記事',
    path: '/all/articles',
  },
  {
    id: 3,
    name: 'カテゴリー',
    path: '/category',
  },
  {
    id: 4,
    name: 'ユーザー',
    path: '/users',
  },
]

const classNameDefaultValue = 'none';

const classNameOptions = {
  'none': '',
};

storiesOf('MOLECULES|ListSidebar', module)
  .addDecorator(storyRouter())
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      render: h => h('list-sidebar', {
        props: {
          targetArray: targetArray,
          className: select('className', classNameOptions, classNameDefaultValue),
        }
      }),
    }
  }, { notes: note });