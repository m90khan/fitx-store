const CartItem = require('../schemas/CartItem');
const addToCart = require('./addToCart');
const changePassword = require('./changePassword');
const checkout = require('./checkout');
const passRecovery = require('./passRecovery');

// make a fake graphql tagged template literal
const graphql = String.raw;
exports.customSchemasMutations = {
  mutations: [
    {
      schema: ' addToCart(productId: ID!): CartItem',
      resolver: addToCart,
    },
    {
      schema: ' checkout(token: String!): Order',
      resolver: checkout,
    },
    {
      schema: 'startPasswordRecovery(email: String!): ForgottenPasswordToken',
      resolver: passRecovery
    },
    {
      schema: 'changePasswordWithToken(token: String!, password: String!): User',
      resolver: changePassword
    }
  ],
};
