import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
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
    // Submit the inputfields to the backend:
    // TODO: Handle Submit!!!
    // const res = await createProduct();
    // // Go to that product's page!
    Router.push({
      pathname: `/product/${res.data.updateProduct.id}`,
    });
  };
  return (
    <form className='flex   items-center justify-center  ' onSubmit={handleSubmit}>
      <div className='grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2'>
        <div className='flex justify-center py-4'>
          <div className='flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300'>
            <svg
              className='w-8 h-8 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
              ></path>
            </svg>
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='flex'>
            <h1 className='text-gray-600 font-bold md:text-2xl text-xl'>
              Create Product
            </h1>
          </div>
        </div>
        {updateError && <Alert text={updateError.message} />}
        {updateLoading && <Alert text='Loading ...' status='Updating Product' />}
        {updateData && <Alert text='Product updated successfully...' status='Success' />}
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>
          <div className='grid grid-cols-1 mt-5 mx-7'>
            <label
              className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'
              htmlFor='name'
            >
              Name
            </label>
            <input
              className='py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
              type='text'
              placeholder='Product Name'
              id='name'
              name='name'
              required
              value={inputs.name}
              onChange={handleChange}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7'>
            <div className='grid grid-cols-1'>
              <label
                className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'
                htmlFor='price'
              >
                Price
              </label>
              <input
                className='py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                type='number'
                placeholder='Price'
                id='price'
                name='price'
                required
                value={inputs.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='grid grid-cols-1 mt-5 mx-7'>
            <label
              className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'
              htmlFor='description'
            >
              Description
            </label>
            <textarea
              className='py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
              placeholder='Product Description'
              id='description'
              name='description'
              required
              value={inputs.description}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
            <button
              className='w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'
              type='submit'
            >
              Update Product
            </button>{' '}
          </div>
        </fieldset>
      </div>
    </form>
  );
}

/*

http://localhost:3000/update?id=60c6fdccebe15c2534be8072
*/
