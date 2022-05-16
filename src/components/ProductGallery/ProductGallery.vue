<template>
  <div class="product-gallery">
    <slider :images="images" :discount="discount" />
    <add-to-cart-block :rating="rating" />
  </div>
</template>

<script>
import Slider from '@/components/Slider/Slider';
import AddToCartBlock from '@/components/Slider/AddToCartBlock/AddToCartBlock';

export default {
  name: 'ProductGallery',

  components: { AddToCartBlock, Slider },

  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    },

    rating: {
      type: Number,
      default: 0,
      required: true
    },

    discount: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.product-gallery {
  display: flex;
  @media screen and (max-width: $tablet-size) {
    flex-direction: column;
  }
}
</style>
