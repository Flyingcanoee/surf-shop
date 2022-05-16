module.exports = function () {
  //required modules
  var faker = require('faker');
  var _ = require('lodash');
  //constants
  // const addressTitles = ['Mr.', 'Mrs.', 'Ms', 'Miss'];
  // const orderStatuses = [
  //   'WATING_FOR_PAYMENT',
  //   'PAID',
  //   'DELIVERED',
  //   'CANCELLED'
  // ];
  // const userRoles = ['ADMIN', 'SELLER', 'CONSUMER', 'GUEST'];
  const maxDiscount = 90;
  const discountGenerationThreshold = 0.3;

  //functions
  function getRandomInt(max, min = 0) {
    const minimum = Math.ceil(min);
    const maximum = Math.floor(max);

    return Math.floor(Math.random() * (maximum - minimum)) + minimum;
  }

  function getRandomDiscount() {
    const randomDiscount = Math.floor(Math.random() * maxDiscount);
    const shouldBeADiscount = Math.random();

    return shouldBeADiscount > discountGenerationThreshold ? randomDiscount : 0;
  }

  function getRandomRating() {
    return Math.floor(Math.random() * 5) + 3;
  }

  //data
  const categories = _.times(5, function () {
    return {
      id: faker.datatype.uuid(),
      name: faker.company.catchPhraseAdjective(),
      description: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      updatedAt: ''
    };
  });
  // const categories = ['for children', 'for women', 'for men'];
  const products = _.times(100, function () {
    const discount = getRandomDiscount();
    const price = parseFloat(faker.commerce.price());
    const rating = getRandomRating();
    const name = faker.name.firstName() + ' board';
    const productInfo = {
      id: faker.datatype.uuid(),
      name: name,
      category: categories[getRandomInt(categories.length)],
      description: faker.commerce.productDescription(),
      price: price,
      discountPercentage: discount,
      priceWithDiscount: price - (price * discount) / 100,
      images: [],
      createdAt: faker.date.past(),
      updatedAt: '',
      feedbacks: [],
      averageRating: rating
    };

    return productInfo;
  });
  // const orders = _.times(20, function () {
  //   const randomProducts = _.times(getRandomInt(5, 1), function () {
  //     const randomProduct = products[getRandomInt(products.length)];
  //     const randomCategory = categories[getRandomInt(categories.length)];

  //     return {
  //       originalProductId: randomProduct.id,
  //       categoryId: randomCategory.id,
  //       price: randomProduct.price
  //     };
  //   });
  //   const totalPrice = randomProducts.reduce((accumulator, currentValue) => {
  //     return accumulator + currentValue.price;
  //   }, 0);
  //   const status = orderStatuses[getRandomInt(orderStatuses.length)];
  //   const createdAt = faker.date.past();
  //   const deliveredAt =
  //     status === 'DELIVERED' ? faker.date.between(createdAt, new Date()) : '';

  //   return {
  //     id: faker.datatype.uuid(),
  //     products: randomProducts,
  //     status,
  //     deliveryPrice: totalPrice + parseFloat(faker.commerce.price()),
  //     totalPrice,
  //     createdAt,
  //     deliveredAt,
  //     updatedAt: ''
  //   };
  // });
  // const addresses = _.times(20, function () {
  //   return {
  //     id: faker.datatype.uuid(),
  //     title: addressTitles[getRandomInt(addressTitles.length)],
  //     firstName: faker.name.firstName(),
  //     lastName: faker.name.lastName(),
  //     country: faker.address.country(),
  //     city: faker.address.city(),
  //     street: faker.address.streetName(),
  //     phoneNumber: faker.phone.phoneNumber('+79#########'),
  //     zipCode: faker.address.zipCode('######'),
  //     createdAt: faker.date.past(),
  //     updatedAt: ''
  //   };
  // });

  const cart = [];

  return {
    // users,
    products,
    categories,
    // orders,
    // addresses,
    cart
  };
};
