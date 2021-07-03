import Link from 'next/link';
import React from 'react';
import formatCurrency from '../utils/formatCurrency';
import AddToCartBtn from './Buttons/AddToCartBtn';
const Product = ({ product }) => {
  return (
    <div className=' p-6 flex flex-col shadow-lg sm:min-w-full' key={product.id}>
      <Link href={'/product/' + product.id}>
        <div className=' flex justify-center cursor-pointer'>
          <img
            className=' object-cover h-60 w-auto'
            src={product.photo && product.photo.image.publicUrlTransformed}
          />
        </div>
      </Link>
      <div className='pt-3 flex items-center justify-between'>
        <Link href={'/product/' + product.id}>
          <p className='cursor-pointer'>{product.name}</p>
        </Link>
      </div>
      <div className='pt-3 flex items-center justify-between'>
        <p className='pt-1 text-xl text-gray-900'>{formatCurrency(product.price)}</p>
        <AddToCartBtn id={product.id} />
      </div>
    </div>
  );
};

export default Product;

// <ItemStyles key={product.id}>
//   <div style={{ width: 'auto', height: '15rem', position: 'relative' }}>
//     <Image
//       src={product.photo && product.photo.image.publicUrlTransformed}
//       layout='fill'
//       objectFit='contain'
//     />
//   </div>
//   <h1 key={product.id}>{product.name}</h1>
//   <p>{formatCurrency(product.price)}</p>
// </ItemStyles>
