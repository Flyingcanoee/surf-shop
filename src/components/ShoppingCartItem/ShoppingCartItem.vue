<template>
  <div class="cart-item">
    <div class="cart-item__wrapper">
      <div class="cart-item__image-wrapper">
        <img :src="getImage" class="cart-item__img" />
        <div :class="{ 'cart-item__discount': discountPercentage }">
          {{ getDiscountPercentage }}
        </div>
      </div>
      <div class="cart-item__content-wrapper">
        <div class="cart-item__name">
          {{ name }} <br /><span class="cart-item__category">Category</span>
        </div>
        <div class="cart-item__price-container">
          <div v-if="discountPercentage" class="cart-item__price">
            {{ priceWithDiscount | currency }}
          </div>
          <div
            class="cart-item__price"
            :class="{ 'cart-item__crossed': discountPercentage }"
          >
            {{ price | currency }}
          </div>
        </div>

        <quantity-counter
          :quantity="quantity"
          @increase="increaseProductQuantity(id)"
          @decrease="decreaseProductQuantity(id)"
        />
      </div>
      <shopping-cart-trash-icon
        class="trash-icon"
        @delete-item="deleteFromCart(id)"
      />
      <input
        type="checkbox"
        class="cart-item__checkbox"
        checked
        @change="onChangeToggleCartItemSelection($event.target.checked)"
      />
    </div>
  </div>
</template>

<script>
import QuantityCounter from '@/components/ShoppingCartItem/QuantityCounter';
import ShoppingCartTrashIcon from '@/components/ShoppingCartTrashIcon/ShoppingCartTrashIcon.vue';
import { mapActions } from 'vuex';
import getProductImage from '@/utils/getProductImage.js';

export default {
  name: 'ShoppingCartItem',

  components: { QuantityCounter, ShoppingCartTrashIcon },

  props: {
    images: {
      type: Array,
      default: () => []
    },

    id: {
      type: String,
      required: true,
      default: ''
    },

    name: {
      type: String,
      required: true,
      default: ''
    },

    quantity: {
      type: Number,
      required: true,
      default: 1
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
    }
  },

  computed: {
    getImage() {
      if (this.images && this.images.length) {
        return this.images[0];
      }

      return getProductImage();
    },

    getDiscountPercentage() {
      return this.discountPercentage > 0 ? `${this.discountPercentage}%` : '';
    }
  },

  methods: {
    ...mapActions('ShoppingCartModule', [
      'increaseProductQuantity',
      'decreaseProductQuantity',
      'deleteFromCart',
      'checkCartItem',
      'uncheckCartItem'
    ]),

    onChangeToggleCartItemSelection(checked) {
      if (checked) {
        return this.checkCartItem(this.id);
      }

      return this.uncheckCartItem(this.id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.cart-item {
  display: flex;
  width: 100%;
  &:first-child {
    border-top: 1px solid #e4e4e4ff;
    .cart-item__wrapper::before {
      width: 0px;
      content: '';
    }
  }
  &__checkbox {
    position: absolute;
    margin-top: 0px;
    top: 10px;
    left: 200px;
  }

  &__wrapper {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    min-width: 260px;
    padding: 10px;
    color: $font-color-text;
    border-radius: 4px;
    width: 100%;

    &::before {
      position: absolute;
      top: 0;
      right: 0;
      width: calc(100% - 250px);
      border-top: 1px solid #e4e4e4ff;
      content: '';
    }
  }
  &__name {
    font-weight: 400;
    font-size: 22px;
    line-height: 29px;
    text-align: start;
    color: rgb(58, 58, 58);
    .cart-item__category {
      font-weight: 400;
      font-size: 13px;
      color: $font-color-text;
      margin-top: 20px;
    }
  }

  &__price-container {
    min-width: 100px;
  }

  &__content-wrapper {
    display: flex;
    gap: 30px;
    justify-content: flex-start;
    width: 90%;
    padding-top: 40px;
  }

  &__img {
    align-content: flex-start;
    max-width: 230px;
  }

  &__price {
    text-align: start;
    font-size: 1.5rem;
    color: $font-color-subtitle;
  }

  &__crossed {
    text-decoration: line-through;
    color: $font-color-subtitle;
    font-size: 14px;
    text-align: start;
    margin-top: 10px;
  }

  &__discount {
    color: $white;
    background-color: #eebaba;
    padding: 4px 14px;
    border-radius: 20px;
    width: fit-content;
    font-size: 12px;
    position: absolute;
    top: 10px;
  }
  .trash-icon {
    margin-top: 40px;
    min-width: 30px;
  }
}

@media screen and (max-width: 810px) {
  .cart-item {
    &__wrapper {
      width: calc(100% - 40px);
      padding: 20px;
      flex-direction: column;
      position: relative;
    }

    &__price {
      margin-top: 0px;
      font-size: 1rem;
      width: 100px;
    }

    &__img {
      max-width: 200px;
    }

    &__crossed {
      font-size: 12px;
    }

    &__name {
      margin-top: 0px;
      font-size: 18px;
    }

    &__content-wrapper {
      gap: 0px;
      flex-direction: column;
    }

    .trash-icon {
      position: absolute;
      bottom: 25px;
      left: 200px;
    }
  }
}
</style>

<style lang="scss">
.cart-item .quantity__wrapper {
  @media screen and (max-width: 810px) {
    margin-top: 10px;
  }
}
</style>
