<template>
  <div class="product-details__wrapper page-container">
    <div class="product-details__content">
      <product-info
        :name="productInfo.name"
        :date="productInfo.createdAt"
        :price="productInfo.price"
        :discount-percentage="productInfo.discountPercentage"
        :price-with-discount="productInfo.priceWithDiscount"
      />

      <product-gallery
        :images="getImages()"
        :rating="productInfo.averageRating"
        :discount="productInfo.discountPercentage"
      />
    </div>
  </div>
</template>

<script>
import ProductInfo from '@/components/ProductInfo/ProductInfo';
import ProductGallery from '@/components/ProductGallery/ProductGallery';
import { mapGetters, mapActions } from 'vuex';
import getProductImage from '@/utils/getProductImage.js';

export default {
  name: 'ProductDetails',

  components: {
    ProductInfo,
    ProductGallery
  },

  data() {
    return {
      isDialogActive: false
    };
  },

  computed: {
    ...mapGetters('ProductDetailsPageModule', ['productInfo']),

    isFeedbacksFieldEmpty() {
      return this.productInfo.feedbacks.length === 0;
    }
  },

  async mounted() {
    this.getProductInfo(this.$route.params.id);
  },

  methods: {
    ...mapActions('ProductDetailsPageModule', ['getProductInfo']),

    onClickOpenForm() {
      this.isDialogActive = true;
    },

    closeDialog() {
      this.isDialogActive = false;
    },

    getImages() {
      if (this.productInfo.images.length === 0) {
        this.productInfo.images.push(getProductImage());
        this.productInfo.images.push(getProductImage());
        this.productInfo.images.push(getProductImage());
      }

      return this.productInfo.images;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.product-details__wrapper {
  display: flex;
  align-items: center;
  padding: 40px 20px;
  flex-direction: column;
}

.product-details__content {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  background: $white;
  border: none;
  padding: 10px 40px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
</style>
