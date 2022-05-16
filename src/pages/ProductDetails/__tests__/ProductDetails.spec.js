import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ProductDetails from '../ProductDetails.vue';
import ProductDetailsModule from '@/store/modules/ProductDetails';

let wrapper;
let state;
let store;
let actions;
let getters;
const localVue = createLocalVue();

localVue.use(Vuex);

const mockProductInfo = {
  id: '6f40cf0f-9841-4994-ae04-2203145592a5',
  name: 'Fantastic Soft Sausages',
  description:
    'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
  price: 852,
  images: [
    'http://placeimg.com/640/480',
    'http://placeimg.com/640/480',
    'http://placeimg.com/640/480'
  ],
  createdAt: '2022-01-31T09:22:07.577Z',
  updatedAt: '',
  feedbacks: []
};
const mockRoute = {
  params: {
    id: 1
  }
};

beforeEach(() => {
  getters = {
    productInfo: () => {}
  };

  actions = {
    getProductInfo: jest.fn((getters.productInfo = () => mockProductInfo))
  };

  store = new Vuex.Store({
    modules: {
      ProductDetailsPageModule: {
        namespaced: true,
        state,
        actions,
        getters,
        mutations: ProductDetailsModule.mutations
      }
    }
  });

  wrapper = shallowMount(ProductDetails, {
    store,
    localVue,
    mocks: {
      $route: mockRoute
    }
  });
});

afterEach(() => {
  if (wrapper) {
    wrapper.destroy();
  }
});
describe('ProductDetails.vue', () => {
  it('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should contain product-details content', () => {
    expect(wrapper.find('.product-details__content').exists()).toBe(true);
  });
});
