<template>
  <v-app id="app">
    <Header />
    <breadcrumbs />
    <router-view />
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/Header/Header.vue';
import Footer from './components/Footer/Footer.vue';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    Breadcrumbs
  }
};
</script>

<style lang="scss">
@import '@/scss/CustomVariables.scss';
</style>
