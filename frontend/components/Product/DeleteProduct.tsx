import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  console.log(payload);
  console.log('running the update function after delete');
  cache.evict(cache.identify(payload.data.deleteProduct)); // delete the item from cache and rerender
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this item?')) {
      // go ahead and delete it
      console.log('DELTEe');
      await deleteProduct().catch((err) => alert(err.message));
    }
  };
  return (
    <button type='button' disabled={loading} onClick={handleDelete}>
      {children}
    </button>
  );
}
