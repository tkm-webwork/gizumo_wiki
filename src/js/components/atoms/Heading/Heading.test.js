import assert from 'assert';
import { shallowMount } from '@vue/test-utils';
import { Heading } from '@Components/atoms';

const factory = (propsData, slotsData) => {
  return shallowMount(Heading, {
    propsData: {
      ...propsData
    },
    slots: {
      ...slotsData
    },
  });
};

describe('Heading', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory(null, {
      default: '<span>This is Heading Component</span>'
    });
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a h1 tag', () => {
    assert.equal(wrapper.contains('h1'), true);
  });

  it('has text in slot', () => {
    assert.equal(wrapper.contains('span'), true);
    assert.equal(wrapper.find('span').text(), 'This is Heading Component');
  });
});

describe('Heading with props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory({
      level: 2,
      className: 'test__heading',
    });
  });

  it('is a h2 tag', () => {
    assert.equal(wrapper.contains('h2'), true);
  });

  it('has a class of className props', () => {
    assert.equal(wrapper.classes(), 'test__heading');
  });
});

describe('Heading with level prop over 6', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory({
      level: 7,
    });
  });

  it('is a h1 tag', () => {
    assert.equal(wrapper.contains('h1'), true);
  });

  it('has a "heading--primary" class', () => {
    assert.equal(wrapper.classes(), 'heading--primary');
  });
});
