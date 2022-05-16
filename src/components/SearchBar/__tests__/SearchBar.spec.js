import { createLocalVue, shallowMount } from '@vue/test-utils';
import SearchBar from '../SearchBar.vue';
import Vuex from 'vuex';

const categoriesExample = ['a', 'b', 'c'];
let wrapper;
let getters;
let store;
const inputValue = 'my input';
const localVue = createLocalVue();

localVue.use(Vuex);

beforeEach(() => {
  getters = {
    categories: () => [categoriesExample]
  };

  store = new Vuex.Store({
    modules: {
      ProductsPageModule: {
        namespaced: true,
        getters
      }
    }
  });

  wrapper = shallowMount(SearchBar, {
    store,
    localVue
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe('SearchBar', () => {
  it('should emit search event', () => {
    wrapper.vm.onSearch(inputValue);
    expect(wrapper.emitted().search).toEqual([['my input']]);
  });

  it('should render correctly and match valid snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
