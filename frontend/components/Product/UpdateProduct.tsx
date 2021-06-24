import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../../utils/useForm';
import Alert from '../lib/Alert';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. We need to get the existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  console.log(data);
  const { inputs, handleChange, clearForm, resetForm } = useForm(
    data?.Product || {
      name: '',
      description: '',
      price: '',
    }
  );
  // 2. We need to get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
      name: inputs.name,
      description: inputs.description,
      price: inputs.price,
    },
  });
  // 2.5 Create some state for the form inputs:

  if (loading) return <p>loading...</p>;
  // 3. We need the form to handle the updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateProduct();
    console.log(res);
    // Submit the inputfields to the backend:
    // TODO: Handle Submit!!!
    // const res = await createProduct();
    // clearForm();
    // // Go to that product's page!
    // Router.push({
    //   pathname: `/product/${res.data.createProduct.id}`,
    // });
  };
  return (
    <form onSubmit={handleSubmit}>
      {updateError && <Alert text={updateError.message} />}
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            id='price'
            name='price'
            placeholder='price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='description'>
          Description
          <textarea
            id='description'
            name='description'
            placeholder='Description'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>

        <button type='submit'>Update Product</button>
      </fieldset>
    </form>
  );
}

/*

http://localhost:3000/update?id=60c6fdccebe15c2534be8072
*/
