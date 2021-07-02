import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import useForm from '../../utils/useForm';
import Alert from '../lib/Alert';
import FormHeader from '../lib/FormHeader';
import { ALL_PRODUCTS_QUERY } from '../Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $price: Int!
    $description: String
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: AVAILABLE
        # photo is relationship with createProductImage
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      price
      description
    }
  }
`;

const CreateProduct = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'Product Name',
    price: 200,
    description: 'Product Description',
    image: '',
  });
  const [createProduct, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createProduct();
    clearForm(e);
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    });
  };

  useEffect(() => {
    if (inputs.image) {
      const reader = new FileReader();

      reader.onload = (r) => {
        setImagePreview(r.target.result);
      };
      reader.readAsDataURL(inputs.image);
    }
  }, [inputs.image]);
  return (
    <form className='flex   items-center justify-center  ' onSubmit={handleSubmit}>
      <div className='grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2'>
        <FormHeader text='Create Product' />
        {error && <Alert text={error.message} />}
        {loading && <Alert text='Loading ...' status='Creating Product' />}
        {data && <Alert text='Product uploaded successfully...' status='Success' />}
        <fieldset disabled={loading}>
          <div className='grid grid-cols-1 mt-5 mx-7'>
            <label
              className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'
              htmlFor='name'
            >
              Name
            </label>
            <input
              className='py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent'
              type='text'
              placeholder='Product Name'
              id='name'
              name='name'
              required
              value={inputs.name}
              onChange={handleChange}
            />
          </div>
          <div className='grid grid-cols-1 mt-5 mx-7'>
            <label
              className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'
              htmlFor='price'
            >
              Price
            </label>
            <input
              className='py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent'
              type='number'
              placeholder='Price'
              id='price'
              name='price'
              required
              value={inputs.price}
              onChange={handleChange}
            />
          </div>
          {/*      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7'>
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
          <div className='grid grid-cols-1'>
              <label className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'>
                Input 3
              </label>
              <input
                className='py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
                type='text'
                placeholder='Input 3'
              />
            </div> 
          </div>
*/}
          {/* <div className='grid grid-cols-1 mt-5 mx-7'>
            <label className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'>
              Selection
            </label>
            <select className='py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div> */}

          <div className='grid grid-cols-1 mt-5 mx-7'>
            <label
              className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold'
              htmlFor='description'
            >
              Description
            </label>
            <textarea
              className='py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent'
              placeholder='Product Description'
              id='description'
              name='description'
              required
              value={inputs.description}
              onChange={handleChange}
            />
          </div>

          <div className='grid grid-cols-1 mt-5 mx-7'>
            <label
              className='uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1'
              htmlFor='image'
            >
              Upload Product Photo
            </label>
            <div className='flex items-center justify-center w-full'>
              <label className='flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-gray-500 group'>
                <div className='flex flex-col items-center justify-center pt-7'>
                  <svg
                    className='w-10 h-10 text-gray-400 group-hover:text-gray-600'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                    ></path>
                  </svg>
                  <p className='uppercase text-sm text-gray-400 group-hover:text-gray-600 pt-1 tracking-wider'>
                    Select a photo
                  </p>
                </div>
                <input
                  type='file'
                  id='image'
                  name='image'
                  required
                  className='hidden'
                  onChange={handleChange}
                />
              </label>
            </div>
            {imagePreview && (
              <div className=' flex justify-center'>
                <img
                  className=' object-cover h-60 w-auto'
                  src={inputs.image && imagePreview}
                  alt='image Preview'
                />
              </div>
            )}
          </div>

          <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
            <button
              className='w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'
              onClick={resetForm}
              type='button'
            >
              Reset Form
            </button>
            <button
              className='w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'
              onClick={clearForm}
              type='button'
            >
              Clear Form
            </button>
            <button className='w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>
              Cancel
            </button>
            <button
              className='w-auto bg-gray-900 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'
              type='submit'
            >
              Create
            </button>
          </div>
        </fieldset>
      </div>
    </form>
  );
};

export default CreateProduct;
