## About the project


![Image alt](https://github.com/Flyingcanoee/surf-shop/raw/main/surf-shop1.gif)

Surf-shop is an online board-store implemented on Vue.js. There were used such technologies as:

- vue, vuex, vue-router, axios for application structure and data receiving and transferring between components
- vue-material, vuetify, vuelidate for adding components
- webpack for bundling
- lottie-vuejs for svg animations
- eslint, prettier, scss for organizing and formatting code during development
- jest for components unit testing, test-coverage is 50%.

### Surf-shop pages

- Home page with some products and greeting images
- Products page shows all available products, where user can add the needed amount of the product into the cart. Also it has the search by product-name or description and sorting by price and date.
- Product-description page has three images of the board, information about it and add-to-cart button
- Cart page displays products which were added to cart, and it calculates the price with discounts. Also user has the ability to include and exclude the product from the order, or change it quantity.

## Project setup

```js
npm install
npm run serve
npm run backend
```

## Future scope

- Provide checkout logic in the cart
- Add authentication and personal page
