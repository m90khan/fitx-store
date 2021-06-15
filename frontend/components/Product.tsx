import React from 'react';

const Product = ({ product }) => {
  return (
    <div>
      <h1 key={product.id}>{product.name}</h1>
    </div>
  );
};

export default Product;
