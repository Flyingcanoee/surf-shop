<template>
  <div class="pagination__wrapper">
    <v-pagination
      v-model="page"
      class="pagination"
      :length="paginationLength"
      circle
      :total-visible="totalVisible"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      @input="setNumberOfPage(page)"
    ></v-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { DEFAULT_ITEMS_PER_PAGE } from '@/constants';
import { START_NUMBER_OF_PAGE } from '@/pages/ProductsPage/helper';

export default {
  name: 'Pagination',

  props: {
    paginationLength: {
      type: Number,
      default: 0
    }
  },

  data: () => ({
    page: 1,
    totalVisible: DEFAULT_ITEMS_PER_PAGE
  }),

  computed: {
    ...mapGetters('ProductsPageModule', ['productsQuantity', 'numberOfPage']),

    getPaginationLength() {
      return Math.ceil(this.productsQuantity / this.totalVisible);
    }
  },

  watch: {
    numberOfPage() {
      if (this.numberOfPage === START_NUMBER_OF_PAGE) {
        this.page = START_NUMBER_OF_PAGE;
      }
    }
  },

  mounted() {
    this.setNumberOfPage(this.page);
  },

  methods: {
    ...mapActions('ProductsPageModule', ['setNumberOfPage'])
  }
};
</script>

<style scoped>
.pagination__wrapper {
  padding-bottom: 20px;
  width: 500px;
  margin: 0 auto;
  position: relative;
}
</style>

<style lang="scss">
.v-pagination--circle .v-pagination__item {
  border: none;
  box-shadow: none;
}
ul.v-pagination {
  width: fit-content;
  border: 0.5px solid black;
  border-radius: 30px;
}
.v-pagination li:first-child {
  position: absolute;
  left: -10px;
  .v-icon {
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid black;
    margin-right: 3px;
  }
}
.v-pagination li:last-child {
  position: absolute;
  right: -10px;
  .v-icon.v-icon {
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid black;
    margin-left: 1px;
  }
}
.v-pagination__navigation {
  border: 0.5px solid black;
  box-shadow: none;
}
.v-pagination .v-pagination__item--active.primary {
  background-color: black !important;
}
</style>
