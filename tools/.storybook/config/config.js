import { configure } from '@storybook/vue'

import Vue from 'vue';
import Vuex from 'vuex';
import { addParameters } from '@storybook/vue/dist/client/preview';

//atoms
import AppButton from '@Components/atoms/Button';
import InputText from '@Components/atoms/InputText';

//molecules
import ListSidebar from '@Components/molecules/ListSidebar';


//globals
import Header from '@Components/globals/Header';
import Sidebar from '@Components/globals/Sidebar';

Vue.use(Vuex);

//atoms
Vue.component('app-button', AppButton);
Vue.component('input-text', InputText);

//molecules
Vue.component('list-sidebar', ListSidebar);

//globals
Vue.component('app-header', Header);
Vue.component('app-sidebar', Sidebar);

addParameters({
  backgrounds: [
    {
      name: 'appBackground',
      value: '#efefef',
      default: true,
    },
    {
      name: 'dakerColor',
      value: '#2c4f54',
    },
    {
      name: 'keyColor',
      value: '#0a9dd5',
    },
    {
      name: 'white',
      value: '#fff',
    },
  ],
})

function loadStories() {
  require('../../../src/js/stories/index.stories.js');
}

configure(loadStories, module)