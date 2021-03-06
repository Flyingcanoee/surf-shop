import { shallowMount } from '@vue/test-utils';
import siteHeader from '../siteHeader.vue';
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);
let wrapper;

beforeEach(() => {
  wrapper = shallowMount(siteHeader, {});
  expect(wrapper.is(siteHeader)).toBeTruthy();
});

afterEach(() => {
  wrapper.destroy();
});

describe('Header', () => {
  test("has 'header-wrapper' class", () => {
    expect(wrapper.find('.header-wrapper').exists()).toBe(true);
  });

  test("has 'header__logo-icon' class", () => {
    expect(wrapper.find('.header__logo-icon').exists()).toBe(true);
  });

  test('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
