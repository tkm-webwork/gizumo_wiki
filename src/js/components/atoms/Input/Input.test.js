import assert from 'assert';
import { shallowMount } from '@vue/test-utils';
import { Input } from '@Components/atoms';

const factory = (propsData) => {
  return shallowMount(Input, {
    propsData: {
      ...propsData
    },
  });
};

describe('Input', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory();
  });

  it('is a Vue instance', () => {
    assert.equal(wrapper.isVueInstance(), true);
  });

  it('is a input tag', () => {
    assert.equal(wrapper.is('input'), true);
  });

  it('has a default value', () => {
    assert.equal(wrapper.element.value, '');
  });

  it('has default attributes', () => {
    assert.equal(wrapper.attributes('type'), 'text');
    assert.equal(wrapper.attributes('name'), 'inputName');
    assert.equal(wrapper.attributes('placeholder'), '入力してください');
    assert.equal(wrapper.attributes('required'), null);
  });

  it('has only "input" class', () => {
    assert.equal(wrapper.classes(), 'input');
  });
});

describe('Input with props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = factory({
      name: 'testInput',
      type: 'email',
      placeholder: 'テスト',
      required: true,
      value: 'テスト',
      whiteBg: true,
    });
  });

  it('has a props value', () => {
    assert.equal(wrapper.element.value, 'テスト');
  });

  it('has props attributes', () => {
    assert.equal(wrapper.attributes('type'), 'email');
    assert.equal(wrapper.attributes('name'), 'testInput');
    assert.equal(wrapper.attributes('placeholder'), 'テスト');
    assert.equal(wrapper.attributes('required'), 'required');
  });

  it('has props classes', () => {
    assert.deepEqual(wrapper.classes(), [
      'input',
      'input--white-bg',
    ]);
  });

  it('has emitted "input" event when input value was changed', () => {
    wrapper.trigger('input');
    assert.ok(wrapper.emitted().updateValue);
  });
});
