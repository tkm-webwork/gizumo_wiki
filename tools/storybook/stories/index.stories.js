import { storiesOf } from '@storybook/vue';
import StoryRouter from 'storybook-vue-router';
import { action } from '@storybook/addon-actions';

//atoms
import AppButton from '@Components/atoms/Button';

//molecules
import ListSidebar from '@Components/molecules/ListSidebar';

//globals
import Header from '@Components/globals/Header';
import Sidebar from '@Components/globals/Sidebar';

storiesOf('ATOMS|Button', module)
  .add('Button', () => ({
    components: { AppButton },
    template: '<app-button></app-button>',
  }));

storiesOf('MOLECULES|ListSidebar', module)
  .addDecorator(StoryRouter())
  .add('defalut', () => ({
    render: h => h(ListSidebar, {
      props: {
        targetArray: [
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
    }
  }),
  }));

storiesOf('GLOBALS|Header', module)
.addDecorator(StoryRouter())
.add('defalut', () => ({
  render: h => h(Header),
}))

storiesOf('GLOBALS|Sidebar', module)
  .addDecorator(StoryRouter())
  .add('defalut', () => ({
    render: h => h(Sidebar),
  }))