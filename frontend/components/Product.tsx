import React from 'react';
import Image from 'next/image';
import ItemStyles from './../styles/ItemStyles';
import formatCurrency from './../lib/formatCurrency';
const Product = ({ product }) => {
  return (
    <ItemStyles key={product.id}>
      <div style={{ width: 'auto', height: '15rem', position: 'relative' }}>
        <Image
          src={product.photo && product.photo.image.publicUrlTransformed}
          layout='fill'
          objectFit='contain'
        />
      </div>
      <h1 key={product.id}>{product.name}</h1>
      <p>{formatCurrency(product.price)}</p>
    </ItemStyles>
  );
};

export default Product;
