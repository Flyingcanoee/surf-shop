<template>
  <div class="add-to-cart">
    <rating-icon :rating="rating" />

    <base-text-filled-button
      v-if="isProductNotInCart"
      class="add-to-cart__button"
      @click="addToCart(productInfo)"
    >
      + ADD TO CART
    </base-text-filled-button>

    <quantity-counter
      v-else
      :quantity="productQuantity"
      @increase="increaseProductQuantity(productInfo.id)"
      @decrease="decreaseProductQuantity(productInfo.id)"
    >
    </quantity-counter>
  </div>
</template>

<script>
import { BaseTextFilledButton } from '@/base_components/';
import RatingIcon from '@/components/RatingIcon/RatingIcon';
import QuantityCounter from '@/components/ShoppingCartItem/QuantityCounter';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AddToCartBlock',

  components: {
    BaseTextFilledButton,
    RatingIcon,
    QuantityCounter
  },

  props: {
    rating: {
      type: Number,
      default: 0,
      required: true
    }
  },

  computed: {
    ...mapGetters('ProductDetailsPageModule', ['productInfo']),
    ...mapGetters('ShoppingCartModule', ['productsInCart']),
    productQuantity() {
      return this.productsInCart.find(
        (productInCart) => productInCart.id === this.productInfo.id
      )?.quantity;
    },

    isProductNotInCart() {
      let productInCart = this.productsInCart.find(
        (productInCart) => productInCart.id === this.productInfo.id
      );

      return !productInCart;
    }
  },

  methods: {
    ...mapActions('ShoppingCartModule', [
      'addToCart',
      'increaseProductQuantity',
      'decreaseProductQuantity'
    ])
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.add-to-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  padding: 30px;
  gap: 20px;
  // border-left: solid 1px $light-border-color;

  &__button {
    white-space: nowrap;
  }
}
</style>
