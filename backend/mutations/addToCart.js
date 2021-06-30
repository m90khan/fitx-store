/* eslint-disable */

async function addToCart(root, { productId }, context) {
  console.log('ADDING TO CART!');
  // 1. Query the current user see if they are signed in
  const currentUser = context.authedItem;

  if (!currentUser.id) {
    throw new Error('You must be logged in to do this!');
  }
  // // 2. Query the current users cart
  const { errors, data } = await context.executeGraphQL({
    context: context.createContext({ skipAccessControl: true }),
    query: `
        query allCartItems ($id : ID! , $productId:String! ) {
        allCartItems(where : { user: { id: $id }, product: { id:  $productId } }) {
                    id
                    quantity
          } 
        }
      `,
    variables: { id: currentUser.id, productId: productId },
  });
  console.log(data.allCartItems);
  const [existingCartItem] = data.allCartItems;

  if (existingCartItem) {
    console.log(existingCartItem);
    console.log(`There are already ${existingCartItem.quantity}, increment by 1!`);
    // 3. See if the current item is in their cart
    // 4. if itis, increment by 1

    return await context.executeGraphQL({
      context: context.createContext({ skipAccessControl: true }),
      query: `
      mutation updateCartItem ($id:ID! , $quantity: Int! ){
        updateCartItem(id: $id , data: {quantity: $quantity  }){
          id
          quantity
          product{
            name
          }
        }
      }
        `,
      variables: { id: existingCartItem.id, quantity: existingCartItem.quantity * 1 + 1 },
    });
  }
  // // 5. if it isnt, create a new cart item!
  return await context.executeGraphQL({
    // context: context.sudo(),
    context: context.createContext({ skipAccessControl: true }),
    query: `
    mutation createCartItem($productId:String! , $id: ID!){
      createCartItem(data:{product:{connect:{id: $productId }}, user:{connect:{id: $id}}}){
       id
       quantity
       user{
         name
       }
       product{
         name
       }
     }
   }
      `,
    variables: { productId: productId, id: currentUser.id },
  });
}

module.exports = addToCart;
