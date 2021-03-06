import axios from '@/api/setup.js';
import mutationTypes from './mutationTypes';
import { START_NUMBER_OF_PAGE } from '@/pages/ProductsPage/helper';
import { CATEGORIES_URL, ADDITIONAL_CATEGORY_NAME } from '@/constants';

const actions = {
  async getProductsList({ commit }, params) {
    commit(mutationTypes.SET_PRODUCTS_LOADING);

    if (params['category.name'] === ADDITIONAL_CATEGORY_NAME) {
      delete params['category.name'];
    }

    if (params.q === '') {
      delete params.q;
    }

    try {
      const { data, headers } = await axios.get(`/products`, { params });

      commit(mutationTypes.SET_PRODUCTS_SUCCESS, data);
      commit(mutationTypes.SET_QUANTITY, Number(headers['x-total-count']));
    } catch ({ message }) {
      commit(mutationTypes.SET_PRODUCTS_FAIL, message);
    }
  },

  async getCategories({ commit }) {
    commit(mutationTypes.GET_CATEGORIES_LOADING);

    try {
      const { data } = await axios.get(CATEGORIES_URL);

      commit(mutationTypes.GET_CATEGORIES_SUCCESS, data);
    } catch (error) {
      commit(mutationTypes.GET_CATEGORIES_FAIL);
      console.error(error);
    }
  },

  setCurrentCategory({ commit }, currentCategory) {
    commit(mutationTypes.SET_CURRENT_CATEGORY, currentCategory);
    commit(mutationTypes.SET_NUMBER_OF_PAGE, START_NUMBER_OF_PAGE);
  },

  setNumberOfPage({ commit }, numberOfPage) {
    commit(mutationTypes.SET_NUMBER_OF_PAGE, numberOfPage);
  }
};

export default actions;
