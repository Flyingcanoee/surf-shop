<template>
  <div>
    <welcome-title />
    <div class="page-container">
      <products-list
        :products="productsList"
        :items-per-page="itemsPerPage"
        :is-horizontal="false"
      />
    </div>
  </div>
</template>

<script>
import ProductsList from '@/components/ProductsList/ProductsList.vue';
import WelcomeTitle from '../../components/WelcomeTitle/WelcomeTitle.vue';
import { mapActions, mapGetters } from 'vuex';
import { ITEMS_PER_PAGE, DESCENDING, CREATING_DATE } from '@/constants';

export default {
  name: 'HomePage',

  components: {
    ProductsList,
    WelcomeTitle
  },

  data() {
    return {
      itemsPerPage: ITEMS_PER_PAGE
    };
  },

  computed: {
    ...mapGetters('ProductsModule', ['productsList'])
  },

  async mounted() {
    await this.getProductsList({
      _limit: ITEMS_PER_PAGE,
      _sort: CREATING_DATE,
      _order: DESCENDING
    });
  },

  methods: {
    ...mapActions('ProductsModule', ['getProductsList'])
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';
</style>
