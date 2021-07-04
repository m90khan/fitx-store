import Link from 'next/link';
import React from 'react';
import formatCurrency from '../utils/formatCurrency';
import AddToCartBtn from './Buttons/AddToCartBtn';
import getUser from './GetUser';

const Product = ({ product }) => {
  const user = getUser();
  const photo = product.photo;
  return (
    <div className='max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800'>
      <Link href={'/product/' + product.id}>
        <img
          className='object-cover object-center w-full h-60'
          src={product?.photo?.image?.publicUrlTransformed}
          alt='avatar'
        />
      </Link>

      <div className='flex items-center px-6 py-2 bg-gray-900'>
        <Link href={'/product/' + product.id}>
          <h1 className='text-lg font-semibold cursor-pointer text-white dark:text-white'>
            {product.name}
          </h1>
        </Link>
      </div>

      <div className='px-6 py-4'>
        <p className='py-2 text-gray-700 dark:text-gray-400 text-sm'>
          {product.description.replace(/(<([^>]+)>)/gi, '').slice(0, 70)}...
        </p>

        <div className='flex items-center  text-gray-700 dark:text-gray-200 justify-between'>
          <h1 className='  text-lg font-semibold text-gray-900'>
            {formatCurrency(product.price)}
          </h1>
          <span className='flex items-center'>
            <svg
              fill='currentColor'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              className='w-4 h-4 text-gray-500'
              viewBox='0 0 24 24'
            >
              <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'></path>
            </svg>
            (82 | 4.7)
          </span>
        </div>
        {user && (
          <div className='flex items-center  text-gray-700 dark:text-gray-200'>
            <AddToCartBtn id={product.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;

// <div className=' p-6 flex flex-col shadow-lg sm:min-w-full' key={product.id}>
//   <Link href={'/product/' + product.id}>
//     <div className=' flex justify-center cursor-pointer'>
//       <img
//         className=' object-cover h-60 w-auto'
//         src={product.photo && product.photo.image.publicUrlTransformed}
//       />
//     </div>
//   </Link>
//   <div className='pt-3 flex items-center justify-between'>
//     <Link href={'/product/' + product.id}>
//       <p className='cursor-pointer'>{product.name}</p>
//     </Link>
//   </div>
//   <div className='pt-3 flex items-center justify-between'>
//     <p className='pt-1 text-xl text-gray-900'>{formatCurrency(product.price)}</p>
//     <AddToCartBtn id={product.id} />
//   </div>
// </div>
