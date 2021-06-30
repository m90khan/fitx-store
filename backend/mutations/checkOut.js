/* eslint-disable */
const stripeConfig = require('../utils/stripe');
require('dotenv').config();
const { createItem } = require('@keystonejs/server-side-graphql-client');

async function checkout(root, { token }, context) {
  // 1. Make sure they are signed in
  const currentUser = context.authedItem;
  if (!currentUser.id) {
    throw new Error('You must be logged in to do this!');
  }
  // 1.5 Query the current user
  const { data } = await context.executeGraphQL({
    context: context.createContext({ skipAccessControl: false }),
    query: `
        query User ($id : ID!){
          User(where:{id: $id}){
            id
            name
            email
            cart {
              id
              quantity
              product {
                name
                price
                description
                id
                photo {
                  id
                  image {
                    id
                    publicUrlTransformed
                  }
                }
              }
            }
          }
        }
     `,
    variables: { id: currentUser.id },
  });

  const jData = JSON.parse(JSON.stringify(data));

  // 2. calc the total price for their order
  const cartItems = jData.User.cart.filter((cartItem) => cartItem.product);
  const amount = cartItems?.reduce(function (tally, cartItem) {
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
  // 3. create the charge with the stripe library
  const charge = await stripeConfig.paymentIntents
    .create({
      amount, // deals in cents as well
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  // 4. Convert the cartItems to OrderItems
  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: cartItem.product.name,
      description: cartItem.product.description,
      price: cartItem.product.price,
      quantity: cartItem.quantity,
      photo: { connect: { id: cartItem.product.photo.id } },
    };
    return orderItem;
  });
   console.log('gonna create the order');

  // 5. Create the order and return it
  const order = await createItem({
    context,
    listKey: 'Order',
    item: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: currentUser.id } },
    },
    returnFields: `id`,
  });

  /*const { errors, data: order } = await context.executeGraphQL({
    context: context.createContext({ skipAccessControl: true }),
    query: `
    mutation createOrder ($amount: Int, $charge: String, $orderItems: [OrderItem], $userId: ID! ){
        createOrder(data:{total: $amount , charge: $charge , items: {create: $orderItems}, user:{connect:{id: $userId }}}){
          user{
            name
          }
        }
      }
     `,
    variables: {
      amount: charge.amount,
      charge: charge.id,
      orderItems: orderItems,
      userId: currentUser.id,
    },
  });*/

  console.log(order);
  // 6. Clean up any old cart item
  const cartItemIds = jData.User.cart.map((cartItem) => cartItem.id);
  console.log(cartItemIds);
  console.log('gonna create delete cartItems');
  await context.executeGraphQL({
    context: context.createContext({ skipAccessControl: true }),
    query: `
    mutation ($cartItemIds : [ID]){
        deleteCartItems(ids: $cartItemIds){
          product{
            name
          }
        }
      }
     `,
    variables: {
      cartItemIds: cartItemIds,
    },
  });

  return order;
}

module.exports = checkout;
