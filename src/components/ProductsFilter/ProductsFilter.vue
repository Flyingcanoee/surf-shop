<template>
  <div class="filter-wrapper">
    <div class="filter-block">
      <div
        v-for="(iconPath, i) in iconsPath"
        :key="i"
        :class="['filter-block__item', viewButtonClass(iconPath)]"
        @click="onClickSwitchView(iconPath)"
      >
        <BaseCustomIcon :icon="iconPath" :width="iconWidth" />
      </div>
    </div>

    <div class="custom-select-block">
      <div class="custom-select">
        <div
          class="custom-select__selected"
          @click.stop="onClickChangeOptionsVisibility"
        >
          {{ activeOption }}
          <img
            class="custom-select__arrow-icon"
            :src="arrowIcon"
            alt="arrow-icon"
            :class="{ reverse: isOptionsVisible }"
          />
        </div>

        <div v-if="isOptionsVisible" class="custom-select__options">
          <p
            v-for="(option, i) in options"
            :key="i"
            class="custom-select__option"
            @click="onClickSelectOption(option.value)"
          >
            {{ option.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseCustomIcon } from '@/base_components';
import { ICON_WIDTH, SELECTED_OPTIONS_KEYS } from './helper';
import arrowIcon from '@/assets/Icons/arrow.svg';

const GRID_ICON_PATH = 'menu_filter_grid';
const COLUMN_ICON_PATH = 'menu_filter_column';
const ACTIVE_CLASS = 'active';

export default {
  name: 'ProductsFilter',

  components: {
    BaseCustomIcon
  },

  props: {
    isHorizontal: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isOptionsVisible: false,
      iconsPath: [COLUMN_ICON_PATH, GRID_ICON_PATH],
      iconWidth: ICON_WIDTH,
      options: [
        {
          value: SELECTED_OPTIONS_KEYS.NEW_TO_OLD,
          name: 'From new to old'
        },
        {
          value: SELECTED_OPTIONS_KEYS.OLD_TO_NEW,
          name: 'From old to new'
        },
        {
          value: SELECTED_OPTIONS_KEYS.CHEAP_TO_EXPENSIVE,
          name: 'From cheap to expensive'
        },
        {
          value: SELECTED_OPTIONS_KEYS.EXPENSIVE_TO_CHEAP,
          name: 'From expensive to cheap'
        }
      ],
      selectedOption: SELECTED_OPTIONS_KEYS.NEW_TO_OLD,
      arrowIcon: arrowIcon
    };
  },

  computed: {
    activeOption() {
      return this.options.find(({ value }) => value === this.selectedOption)
        ?.name;
    }
  },

  mounted() {
    document.addEventListener('click', this.onHideSelect);
  },

  beforeDestroy() {
    document.removeEventListener('click', this.onHideSelect);
  },

  methods: {
    onClickSwitchView(iconPath) {
      this.$emit('switch-view', iconPath === COLUMN_ICON_PATH);
    },

    onClickSelectOption(value) {
      this.$emit('onClickSelectOption', value);
      this.selectedOption = value;
      this.isOptionsVisible = false;
    },

    onClickChangeOptionsVisibility() {
      this.isOptionsVisible = !this.isOptionsVisible;
    },

    onHideSelect() {
      this.isOptionsVisible = false;
    },

    viewButtonClass(iconsPath) {
      if (this.isHorizontal) {
        return iconsPath === COLUMN_ICON_PATH ? ACTIVE_CLASS : '';
      }

      return iconsPath === GRID_ICON_PATH ? ACTIVE_CLASS : '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.filter-wrapper {
  display: flex;
  color: $font-color-title;
  justify-content: flex-end;
  gap: 20px;
  flex-basis: 50%;

  .filter-block {
    display: flex;
    border: 1px solid black;
    border-radius: 10px;
    height: 7vh;
    @media screen and (max-width: $mobile-size) {
      display: none;
    }
    &__item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      border-radius: 10px;
      cursor: pointer;
    }
    &__icon {
      width: 50%;
      height: auto;
    }
  }
}

.active {
  background-color: #f4c468;
  border-radius: 8px;
}

.custom-select-block {
  width: 100%;
}

.custom-select {
  position: relative;
  min-width: 150px;
  border: 1px solid $light-border-color;
  border-radius: 4px;
  text-align: left;
  cursor: pointer;
  font-size: 11px;
  color: rgb(151, 150, 150);
  border: 1px solid black;
  border-radius: 15px;
  &__selected {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    width: 100%;
    height: 7vh;
    & p {
      position: absolute;
      right: 10px;
    }
  }
  &__options {
    position: absolute;
    margin-top: 4px;
    padding: 4px 10px 0px;
    width: 100%;
    border: 1px solid $light-border-color;
    border-radius: 4px;
    background-color: $white;
    z-index: 10;
  }
  &__option {
    line-height: 27px;
    padding-left: 10px;
    border-radius: 4px;
    margin-bottom: 5px;
  }
  &__option:hover {
    background-color: $light-border-color;
    transition: $transition;
  }
  &__arrow-icon {
    width: 10px;
    justify-self: right;
  }
  .reverse {
    transform: rotateX(180deg);
  }
}
</style>
