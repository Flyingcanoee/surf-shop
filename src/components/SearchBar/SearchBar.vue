<template>
  <div class="search-bar">
    <search-field place-holder="Type something" @search="onSearch" />
  </div>
</template>

<script>
import SearchField from './SearchField.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'SearchBar',

  components: {
    SearchField
  },

  computed: {
    ...mapGetters('PageModule', ['categories'])
  },

  methods: {
    onSearch(inputValue) {
      this.$emit('search', inputValue);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.search-bar {
  width: 100%;
  max-width: 750px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

@media screen and (max-width: $mobile-size) {
  .search-bar {
    flex-direction: column;
    align-items: center;
  }
}
</style>
