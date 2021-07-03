import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from '../GetUser';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      quantity
    }
  }
`;

export default function AddToCartBtn({ id }: { id: any }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const handleClick = async () => {
    await addToCart();
  };
  return (
    <button
      onClick={handleClick}
      className='flex   items-center mt-4 px-2 py-2 bg-gray-900 text-white text-sm uppercase font-medium rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-500'
    >
      <span>ADD TO CART</span>
    </button>
  );
}

{
  /* <a disabled={loading} type='button' onClick={addToCart}>
Add{loading && 'ing'} To Cart 🛒
</a> */
}
