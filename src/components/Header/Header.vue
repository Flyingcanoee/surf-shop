<template>
  <div class="header-wrapper">
    <div class="container">
      <div class="header">
        <mobile-menu-button @show="onClickShowMobileMenu" />
        <mobile-menu-panel
          :is-visible="isMobileMenuPanelVisible"
          @close="onClickCloseMobileMenu"
        />
        <base-custom-icon
          class="header__logo-icon"
          :icon="iconsPathLogo"
          :width="iconWidth"
        />
        <base-button-router class="header__buttonRouter" path="/"
          >HOME</base-button-router
        >
        <base-button-router class="header__buttonRouter" path="/products"
          >PRODUCTS</base-button-router
        >
      </div>
      <div class="header">
        <shopping-cart-icon :width="iconWidth" class="header__cart-icon" />
        <div @click="onClickOpenForm">
          <base-text-filled-button>Sign in </base-text-filled-button>
        </div>
        <sign-in-form
          v-if="signIn"
          :class="{ active: isFormOpen }"
          @sign-in="onClickChangeForm()"
          @close-form="closeForm()"
        />
        <sign-up-form
          v-else
          :class="{ active: isFormOpen }"
          @sign-in="onClickChangeForm()"
          @close-form="closeForm()"
        ></sign-up-form>
        <div :class="{ shadow: isFormOpen }" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  BaseButtonRouter,
  BaseCustomIcon,
  BaseTextFilledButton
} from '@/base_components/';
import Vue from 'vue';
import VueMaterial from 'vue-material';
import ShoppingCartIcon from '@/components/ShoppingCartIcon/ShoppingCartIcon';
import SignInForm from '@/components/SignInForm/SignInForm.vue';
import SignUpForm from '@/components/SignUpForm/SignUpForm.vue';
import cross from '@/assets/Icons/cross.png';
import { MobileMenuButton, MobileMenuPanel } from '@/components/MobileMenu';

Vue.use(VueMaterial);

export default {
  name: 'Header',

  components: {
    ShoppingCartIcon,
    BaseButtonRouter,
    BaseTextFilledButton,
    BaseCustomIcon,
    SignInForm,
    SignUpForm,
    MobileMenuButton,
    MobileMenuPanel
  },

  data() {
    return {
      isFormOpen: false,
      iconsPathShop: 'shopping_basket_white_24dp',
      iconsPathLogo: 'grade_white_24dp',
      iconWidth: '50px',
      isMenuVisible: false,
      cross: cross,
      signIn: true,
      isMobileMenuPanelVisible: false
    };
  },

  methods: {
    onClickChangeMenuVisibility() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    onHideMenu() {
      this.isMenuVisible = false;
    },
    onClickOpenForm() {
      this.isFormOpen = !this.isFormOpen;
    },
    onClickCloseForm() {
      this.isFormOpen = false;
    },

    onClickChangeForm() {
      this.signIn = !this.signIn;
    },

    onClickShowMobileMenu() {
      this.isMobileMenuPanelVisible = true;
    },

    onClickCloseMobileMenu() {
      this.isMobileMenuPanelVisible = false;
    },

    closeForm() {
      this.isFormOpen = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;

  &__buttonRouter {
    font-size: $font-size-basic;
    color: black !important;
    box-shadow: none;
    border-width: 0px;
    padding: 10px;

    @media (max-width: $tablet-size) {
      display: none;
    }
  }

  &__logo-icon {
    width: 40px;
    height: auto;
    align-self: flex-start;
  }

  &__cart-icon {
    width: 30px;
    height: auto;

    &::v-deep .cart__items__quantity {
      color: black !important;
      border: 0.5px solid black;
      font-size: 10px;
      background-color: #fdabab;
    }
  }

  &__hamburger {
    display: none;
    @media (max-width: $tablet-size) {
      display: block;
    }
  }

  &__cross {
    display: none;
    position: absolute;
    left: calc(50% - 130px);
    top: 27vh;
    width: 40px;
    padding: 9px;
    border-radius: 50%;
    border: 2px solid #63676c;
    align-self: flex-end;
    background-color: $white;
  }
}

.header-wrapper {
  position: sticky;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $white;
  width: 100%;
  max-height: 60px;
  padding: 20px;
  z-index: $z-index-header;
}

.shadow {
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  position: absolute;
  left: 0;
  z-index: 1;
  height: 2000px;
}
</style>

<style>
.header__cross.active {
  display: flex;
  z-index: 5;
}
</style>
