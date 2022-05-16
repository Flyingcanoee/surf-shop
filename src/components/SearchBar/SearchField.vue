<template>
  <div class="search-field">
    <lottie-animation
      class="search-field__animation"
      path="./animations/input-animation-lottie.json"
    />
    <input
      v-model="inputValue"
      class="search-field__input"
      :placeholder="placeHolder"
      @keypress.enter="onClickSearch"
    />
    <BaseButton class="search-field__btn" @click="onClickSearch">
      <BaseCustomIcon :icon="searchIcon" :width="searchIconWidth" />
    </BaseButton>
  </div>
</template>

<script>
import { BaseButton, BaseCustomIcon } from '@/base_components';
import image from '@/assets/photos/surf-btn.png';

export default {
  name: 'SearchField',

  components: {
    BaseButton,
    BaseCustomIcon
  },

  props: {
    placeHolder: {
      type: String,
      default: '',
      required: true
    }
  },

  data() {
    return {
      searchIcon: 'search_icon',
      searchIconWidth: '50%',
      inputValue: '',
      image: image
    };
  },

  methods: {
    onClickSearch() {
      this.$emit('search', this.inputValue.trim());
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.search-field {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  height: 10vh;
  border: 1px solid black;
  border-radius: 5px;
  position: relative;
  position: relative;
  overflow: hidden;
  @media screen and (min-width: 1600px) {
    height: 7vh;
  }

  &__image {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: absolute;
  }
  &__btn {
    width: 7vw;
    min-width: 50px;
    height: 100%;
    border: none;
    background-color: #c3d1eb;
    cursor: pointer;
    z-index: 3;
    border-radius: 0px 5px 5px 0px;
  }

  &__animation {
    width: fit-content !important;
    position: absolute;
    overflow: hidden;
    top: -46px !important;
    left: -210px !important;
    height: fit-content !important;
    @media screen and (max-width: $mobile-size) {
      top: -10px !important;
      left: -200px !important;
    }
    &::v-deep svg {
      width: 90% !important;
    }
  }
  &__input {
    width: 100%;
    z-index: 3;
    display: flex;
    justify-content: flex-end;
    padding-left: 20px;
    border-right: 1px solid;
    background-color: rgb(248, 248, 248, 0);
    transition: background-color 1s ease;
    font-size: 17px;

    &:focus {
      background-color: rgba(255, 251, 251, 0.6);
      outline: none;
      border-radius: 5px 0px 0px 5px;
    }
  }
}
</style>
