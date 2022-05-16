<template>
  <div class="page-container">
    <search-bar @search="onSearchHandler" />
    <div class="products-page__sorting">
      <select-field
        :categories="categories"
        class="products-page__select"
        category-name="Category"
        @change-category="setCurrentCategory"
      />
      <products-filter
        :is-horizontal="isHorizontal"
        @switch-view="onClickSwitchView"
        @onClickSelectOption="onClickSelectOptionHandler"
      />
    </div>
    <div v-if="getNothingFoundMessage" class="search-message">
      There is no such products.
    </div>
    <products-list
      v-else
      :is-horizontal="isHorizontal"
      :products="products"
      :items-per-page="DEFAULT_ITEMS_PER_PAGE"
    />
    <pagination
      v-show="isPaginationShown"
      :pagination-length="paginationLength"
    />
  </div>
</template>

<script>
import ProductsFilter from '@/components/ProductsFilter/ProductsFilter.vue';
import ProductsList from '@/components/ProductsList/ProductsList.vue';
import Pagination from '@/components/Pagination/Pagination.vue';
import { mapGetters, mapActions } from 'vuex';
import { SELECTED_OPTIONS_KEYS } from '@/components/ProductsFilter/helper';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import SelectField from '@/components/SelectField/SelectField.vue';
import {
  DEFAULT_ITEMS_PER_PAGE,
  ITEMS_PER_PAGE,
  ASCENDING,
  DESCENDING,
  CREATING_DATE
} from '@/constants';
import { PRICE, START_NUMBER_OF_PAGE } from './helper';

export default {
  name: 'ProductsPage',

  components: {
    Pagination,
    ProductsFilter,
    ProductsList,
    SearchBar,
    SelectField
  },

  data() {
    return {
      isHorizontal: false,
      itemsPerPage: ITEMS_PER_PAGE,
      sortField: CREATING_DATE,
      sortOrder: ASCENDING,
      DEFAULT_ITEMS_PER_PAGE,
      inputValue: ''
    };
  },

  computed: {
    ...mapGetters(
      'ProductsPageModule',
      [
        'products',
        'productsQuantity',
        'categories',
        'currentCategory',
        'numberOfPage'
      ],
      ['categories']
    ),

    paginationLength() {
      return Math.ceil(this.productsQuantity / DEFAULT_ITEMS_PER_PAGE);
    },

    isPaginationShown() {
      return this.productsQuantity > DEFAULT_ITEMS_PER_PAGE;
    },

    getNothingFoundMessage() {
      return this.productsQuantity === 0 || !this.productsQuantity;
    }
  },

  watch: {
    async currentCategory() {
      await this.sendRequestForProductsList();
    },

    async numberOfPage() {
      await this.sendRequestForProductsList();
    },

    async sortField() {
      await this.sendRequestForProductsList();
    },

    async sortOrder() {
      await this.sendRequestForProductsList();
    },

    async inputValue() {
      await this.sendRequestForProductsList();
    }
  },

  async mounted() {
    await this.getCategories();
    await this.sendRequestForProductsList();
  },

  methods: {
    ...mapActions('ProductsPageModule', [
      'getProductsList',
      'getCategories',
      'setNumberOfPage',
      'setCurrentCategory'
    ]),

    onClickSwitchView(isHorizontal) {
      this.isHorizontal = isHorizontal;
    },

    async onClickSelectOptionHandler(sortValue) {
      this.changeSortField(sortValue);
      this.changeSortOrder(sortValue);
    },

    changeSortField(sortValue) {
      if (
        sortValue === SELECTED_OPTIONS_KEYS.OLD_TO_NEW ||
        sortValue === SELECTED_OPTIONS_KEYS.NEW_TO_OLD
      ) {
        this.sortField = CREATING_DATE;

        return;
      }
      this.sortField = PRICE;
    },

    changeSortOrder(sortValue) {
      if (
        sortValue === SELECTED_OPTIONS_KEYS.OLD_TO_NEW ||
        sortValue === SELECTED_OPTIONS_KEYS.CHEAP_TO_EXPENSIVE
      ) {
        this.sortOrder = ASCENDING;

        return;
      }
      this.sortOrder = DESCENDING;
    },

    async sendRequestForProductsList() {
      await this.getProductsList({
        _page: this.numberOfPage,
        _limit: DEFAULT_ITEMS_PER_PAGE,
        _sort: this.sortField,
        _order: this.sortOrder,
        q: this.inputValue,
        'category.name': this.currentCategory
      });
    },

    onSearchHandler(inputValue) {
      this.inputValue = inputValue;
      this.setNumberOfPage(START_NUMBER_OF_PAGE);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.products-page {
  &__sorting {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 750px;
    margin: 70px auto 100px;
  }
  &__select {
    max-height: 100px;
  }
}

.search-message {
  padding-top: 50px;
  font-size: 24px;
}
</style>
