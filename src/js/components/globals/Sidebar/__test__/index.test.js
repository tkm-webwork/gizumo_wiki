import assert from 'assert';
import { mount, shallowMount } from '@vue/test-utils';
import { Sidebar } from '@Components/globals';
import { SidebarList } from '@Components/molecules';
import routeLinksArray from '@Helpers/routeLinksArray';

describe('Sidebar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Sidebar);
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a aside tag', () => {
    assert.equal(wrapper.is('aside'), true);
  });

  it('has a SidebarList component', () => {
    assert.equal(wrapper.contains(SidebarList), true);
  });

  it('return routeLinksArray in routeLinksArray of computed', () => {
    assert.equal(wrapper.vm.routeLinksArray, routeLinksArray);
  });
});
