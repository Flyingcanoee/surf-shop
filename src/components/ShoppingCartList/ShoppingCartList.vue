<template>
  <div class="cart-list">
    <div class="cart-list__product-list">
      <shopping-cart-item
        v-for="cartItem in productsInCart"
        :id="cartItem.id"
        :key="cartItem.id"
        :name="cartItem.name"
        :quantity="cartItem.quantity"
        :price="cartItem.price"
        :discount-percentage="cartItem.discountPercentage"
        :price-with-discount="cartItem.priceWithDiscount"
        :images="cartItem.images"
      />
    </div>
    <div>
      <empty-cart-popup
        v-if="isPopupVisible"
        @close="onClickTogglePopup"
        @clear-cart="onClickClearShoppingCart"
      />
    </div>
    <empty-cart-button
      class="cart-list__empty-cart-button"
      :disabled="isDisabled"
      @show-popup="onClickTogglePopup"
    />
  </div>
</template>

<script>
import ShoppingCartItem from '@/components/ShoppingCartItem/ShoppingCartItem';
import EmptyCartPopup from '@/components/EmptyCartPopup/EmptyCartPopup';
import EmptyCartButton from '@/components/EmptyCartButton/EmptyCartButton';

import { mapActions } from 'vuex';

export default {
  name: 'ShoppingCartList',

  components: { ShoppingCartItem, EmptyCartPopup, EmptyCartButton },

  props: {
    productsInCart: {
      type: Array,
      default: () => [],
      required: true
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0
    },

    checkedProductsInCart: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      isPopupVisible: false,
      isDisabled: false
    };
  },

  methods: {
    ...mapActions('ShoppingCartModule', ['clearCart']),

    onClickTogglePopup() {
      this.isPopupVisible = !this.isPopupVisible;
    },

    onClickClearShoppingCart() {
      this.clearCart();
      this.isPopupVisible = false;
      this.isDisabled = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.cart-list {
  display: flex;
  flex-direction: column;
  @media screen and (max-width: $tablet-size) {
    display: flex;
    flex-direction: column;
  }

  &__empty-cart-button {
    width: fit-content;
    margin-top: 50px;
  }

  &__product-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media screen and (max-width: $tablet-size) {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  }
}
</style>
