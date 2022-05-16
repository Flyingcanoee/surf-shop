<template>
  <div class="shopping-cart-page__wrapper page-container">
    <div class="shopping-cart-page__price-container">
      <h1 class="shopping-cart-page__title">
        Your cart <span v-if="isCartEmpty">is empty</span>
      </h1>
      <div class="shopping-cart-page__total-price">
        <span class="shopping-cart-page__total">total:</span>
        {{ totalPrice | currency }}
      </div>
    </div>

    <div v-if="isCartEmpty" class="cart-empty">
      <p class="cart-empty__message">
        <base-button-router path="/products">
          Start searching
        </base-button-router>
      </p>
      <lottie-animation
        class="cart-empty__animation"
        path="./animations/empty-cart-lottie.json"
      />
    </div>

    <div v-else>
      <shopping-cart-list
        class="shopping-cart-page__product-list-container"
        :products-in-cart="productsInCart"
        :total-price="totalPrice"
        :checked-products="checkedProductsInCart"
      />
    </div>
  </div>
</template>

<script>
import ShoppingCartList from '@/components/ShoppingCartList/ShoppingCartList';
import { mapGetters } from 'vuex';
import { BaseButtonRouter } from '@/base_components';

export default {
  name: 'ShoppingCartPage',

  components: {
    BaseButtonRouter,
    ShoppingCartList
  },

  computed: {
    ...mapGetters('ShoppingCartModule', [
      'productsInCart',
      'totalPrice',
      'checkedProductsInCart'
    ]),

    isCartEmpty() {
      return this.productsInCart.length === 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.shopping-cart-page {
  &__wrapper {
    position: relative;
    width: 80%;
    @media screen and (max-width: 810px) {
      width: 100%;
    }
  }

  &__price-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__title {
    color: $font-color-subtitle;
    font-weight: normal;
    align-self: flex-start;
  }

  &__total-price {
    font-weight: 700;
    font-size: 24px;
    .shopping-cart-page__total {
      font-weight: 400;
      font-size: 17px;
    }
  }
}

.cart-empty {
  display: flex;
  flex-direction: column;

  &__message {
    font-size: 20px;
    color: $font-color-subtitle;
    text-align: left;
    border: 1px solid black;
    border-radius: 10px;
    margin-top: 15px;
    padding: 10px;
    width: fit-content;

    .base-button-router {
      color: $primary;

      &:hover {
        color: $primary-hover;
        text-decoration: none;
      }
    }
  }
  &__animation {
    max-height: 400px;
  }
}
</style>
