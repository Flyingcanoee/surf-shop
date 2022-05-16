import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../pages/HomePage/HomePage.vue';
import ProductsPage from '../pages/ProductsPage/ProductsPage.vue';
import ProductDetails from '@/pages/ProductDetails/ProductDetails';
import ShoppingCartPage from '@/pages/ShoppingCartPage/ShoppingCartPage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      breadCrumb: [{ text: 'Home' }]
    }
  },
  {
    path: '/products',
    name: 'ProductsPage',
    component: ProductsPage,
    meta: {
      breadCrumb: [{ text: 'Home', to: { name: 'Home' } }, { text: 'Products' }]
    }
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    meta: {
      breadCrumb({ params }) {
        return [
          { text: 'Home', to: { name: 'Home' } },
          { text: 'Products', to: { name: 'ProductsPage' } },
          {
            params: {
              paramToProductDetails: params.id
            }
          }
        ];
      }
    }
  },
  {
    path: '/cart',
    name: 'ShoppingCartPage',
    component: ShoppingCartPage,
    meta: {
      breadCrumb: [{ text: 'Home', to: { name: 'Home' } }, { text: 'Cart' }]
    },
    scrollBehavior() {
      return { top: 0 };
    }
  }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

export default router;
