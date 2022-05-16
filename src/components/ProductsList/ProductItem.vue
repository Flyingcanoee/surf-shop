<template>
  <li :class="['product-item', { 'product-item_horizontal': isHorizontal }]">
    <base-button-router class="product-item__link" :path="path">
      <img class="product-item__image" :src="getImage" alt="product image" />
      <div :class="{ 'product-item__discount': discountPercentage }">
        {{ getDiscountPercentage }}
      </div>
      <product-description
        :title="title"
        :category="category"
        :rating="rating"
        :is-horizontal="isHorizontal"
        :date="getDate"
      />
      <div
        :class="[
          { 'product-item__price-container_revert': isHorizontal },
          'product-item__price-container'
        ]"
      >
        <product-price>
          <span v-if="discountPercentage">
            {{ priceWithDiscount | currency }}
          </span>
          <span :class="{ 'product-item__crossed': discountPercentage }">
            {{ price | currency }}
          </span>
        </product-price>

        <div class="product-item__add-container">
          <base-button-router path="/cart">
            <div class="product-item__add-to-cart" @click="addToCart(product)">
              <img :src="cartImage" alt="" />
            </div>
          </base-button-router>
          <base-text-filled-button
            v-if="isProductNotInCart"
            class="product-item__add-btn"
            @click="addToCart(product)"
          >
            BUY
          </base-text-filled-button>

          <quantity-counter
            v-else
            :quantity="productQuantity"
            @increase="increaseProductQuantity(id)"
            @decrease="decreaseProductQuantity(id)"
          >
          </quantity-counter>
        </div>
      </div>
    </base-button-router>
  </li>
</template>

<script>
import ProductDescription from './ProductDescription.vue';
import ProductPrice from './ProductPrice.vue';
import QuantityCounter from '@/components/ShoppingCartItem/QuantityCounter';
import { BaseButtonRouter, BaseTextFilledButton } from '@/base_components/';
import { mapActions, mapGetters } from 'vuex';
import cartImage from '@/assets/Icons/shopping_basket_white_24dp.svg';
import getProductImage from '@/utils/getProductImage.js';
import { format } from 'date-fns';

export default {
  name: 'ProductItem',

  components: {
    ProductDescription,
    ProductPrice,
    BaseButtonRouter,
    BaseTextFilledButton,
    QuantityCounter
  },

  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    },

    id: {
      type: String,
      required: true,
      default: ''
    },

    image: {
      type: String,
      default: ''
    },

    price: {
      type: Number,
      required: true,
      default: 0
    },

    discountPercentage: {
      type: Number,
      required: true,
      default: 0
    },

    priceWithDiscount: {
      type: Number,
      required: true,
      default: 0
    },

    title: {
      type: String,
      required: false,
      default: ''
    },

    category: {
      type: String,
      required: false,
      default: ''
    },

    rating: {
      type: Number,
      required: true,
      default: 0
    },

    isHorizontal: {
      type: Boolean,
      required: true,
      default: false
    },

    date: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      cartImage: cartImage
    };
  },

  computed: {
    ...mapGetters('ShoppingCartModule', ['productsInCart']),

    getImage() {
      return this.image ? this.image : getProductImage();
    },

    path() {
      return `/products/${this.id}`;
    },

    productQuantity() {
      return this.productsInCart.find(
        (productInCart) => productInCart.id === this.product.id
      )?.quantity;
    },

    isProductNotInCart() {
      let productInCart = this.productsInCart.find(
        (productInCart) => productInCart.id === this.product.id
      );

      return !productInCart;
    },

    getDiscountPercentage() {
      return this.discountPercentage > 0 ? `${this.discountPercentage}%` : '';
    },

    getDate() {
      return format(new Date(this.date), 'DD.MM.YYYY');
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

.product-item {
  min-width: 250px;
  max-width: 300px;
  border-radius: 10px;
  list-style: none;
  position: relative;

  &__crossed {
    text-decoration: line-through;
    color: $font-color-subtitle;
    font-size: 14px;
    margin-left: 10px;
  }

  &__discount {
    color: $white;
    border-radius: 20px;
    position: absolute;
    top: 30px;
    left: 20px;
    background-color: #eebaba;
    padding: 6px 16px;
    width: fit-content;
    font-size: 12px;
  }

  &__add-btn {
    position: relative;
    padding: 3px 20px;
    font-size: 0.8rem;
    margin: 0px;
    background-color: black;
  }

  &__link {
    width: 100%;
    min-width: 310px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;

    &:hover {
      text-decoration: none;
    }
  }

  &__add-container {
    display: flex;
    flex-direction: row-reverse;
    gap: 10px;
  }

  &__image {
    min-width: 150px;
    max-width: 320px;
    width: 100%;
    object-fit: cover;
  }

  &_horizontal {
    width: 100%;
    max-width: none;

    .product-item__link {
      display: flex;
      flex-direction: row;

      @media screen and (max-width: $tablet-size) {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
    }

    .product-item__image {
      max-width: 200px;
    }
  }

  &__add-to-cart {
    border: 1px solid black;
    border-radius: 5px;
    padding: 0 2px;
    height: 28px;
    justify-self: flex-end;
    img {
      min-width: 24px;
    }
  }

  &__price-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &_revert {
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
      width: fit-content;
      min-width: 120px;

      @media screen and (max-width: $tablet-size) {
        flex-direction: row;
        width: 100%;
      }
    }
  }
}
</style>
