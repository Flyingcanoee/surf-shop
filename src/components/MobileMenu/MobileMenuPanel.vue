<template>
  <v-navigation-drawer
    :value="isVisible"
    absolute
    app
    width="200"
    temporary
    @input="onInputCloseMobileMenuPanel"
  >
    <v-list nav dense>
      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>fas fa-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-item to="/products">
        <v-list-item-icon>
          <v-icon>fas fa-th</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Products</v-list-item-title>
      </v-list-item>

      <v-list-item to="/cart">
        <v-list-item-icon>
          <v-icon>shopping_basket</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Cart</v-list-item-title>
      </v-list-item>

      <!-- <v-list-item v-if="currentUserInfo" to="/profile">
        <v-list-item-icon>
          <v-icon>fas fa-user-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MobileMenuPanel',

  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    // ...mapGetters('AuthenticationModule', ['currentUserInfo'])
  },

  methods: {
    onInputCloseMobileMenuPanel(value) {
      if (!value) {
        this.$emit('close');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.v-list-item {
  &:hover {
    text-decoration: none;
  }

  &__icon {
    color: $font-color-subtitle;
  }

  &__title {
    text-align: left;
    color: $font-color-subtitle;
    font-size: 14px;
    text-transform: uppercase;
  }
}

.v-list--nav {
  padding: 16px;
}
</style>

<style lang="scss">
.v-overlay {
  height: 100vh;
}
</style>
