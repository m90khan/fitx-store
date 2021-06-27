const CartItem = require('../schemas/CartItem');
const addToCart = require('./addToCart');
 
// make a fake graphql tagged template literal
const graphql = String.raw;
exports.customCartSchema = {
  
    mutations: [
        {
         schema: ' addToCart(productId: ID!): CartItem',
         resolver: addToCart
        }
    ]
//   typeDefs: graphql`
//     type Mutation {
//       addToCart(productId: ID): CartItem
//      }
//   `,
//   resolvers: {
//     Mutation: {
//       addToCart: function(){
//           console.log('add to cart')
//       }
//      },
//   },
}
