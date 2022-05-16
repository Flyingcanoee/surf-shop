<template>
  <div v-if="isShown" class="breadcrumbs page-container">
    <v-breadcrumbs :items="breadCrumbs">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="item.to" exact>
          <span class="breadcrumbs__text">{{ item.text }}</span>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Breadcrumbs',

  computed: {
    ...mapGetters('ProductDetailsPageModule', ['productInfo']),

    breadCrumbs() {
      if (typeof this.$route.meta.breadCrumb === 'function') {
        let result = this.$route.meta.breadCrumb.call(this, this.$route);

        return result.map((res) => {
          if (res.params) {
            res.text = this.productInfo.name;

            return res;
          }

          return res;
        });
      }

      return this.$route.meta.breadCrumb;
    },

    isShown() {
      return this.$route.name !== 'Home';
    }
  },

  async mounted() {
    if (this.$route.params.id) {
      await this.getProductInfo(this.$route.params.id);
    }
  },

  methods: {
    ...mapActions('ProductDetailsPageModule', ['getProductInfo'])
  }
};
</script>

<style lang="scss" scoped>
@import '@/scss/CustomVariables.scss';

.breadcrumbs {
  text-decoration: none;
  ul {
    padding-left: 0;
  }
  &::v-deep a:hover {
    text-decoration: none;
  }
  &__text {
    color: $font-color-text;
  }
}
</style>
