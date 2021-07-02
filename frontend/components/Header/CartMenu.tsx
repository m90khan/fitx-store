import router from 'next/router';
import React from 'react';
import calculateCartTotal from '../../utils/calculateCartTotal';
import formatCurrency from '../../utils/formatCurrency';
import getUser from '../GetUser';
import CartMenuItem from './CartMenuItem';
const CartMenu = () => {
  const user = getUser();
  const cart = user && user.cart;

  const HandleClick = () => {
    router.push('/cart');
  };

  return (
    <div className='  fixed w-auto  rounded-b border-t-0 z-50 top-20 right-0  bg-gray-100 	'>
      <div className=' shadow-xl w-96'>
        <div className='p-2 flex flex-col h-auto bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100 '>
          {cart &&
            cart.map((cartItem) => (
              <CartMenuItem cartItem={cartItem} key={cartItem.id} />
            ))}
          {!cart || (cart.length === 0 && <h1>Your cart is empty</h1>)}
        </div>
        <div className='p-4 justify-center flex'>
          <button
            className='text-base     hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
hover:bg-gray-700 hover:text-white 
bg-gray-900 
text-white 
border duration-200 ease-in-out 
border-teal-600 transition'
            onClick={HandleClick}
          >
            Checkout: {formatCurrency(calculateCartTotal(cart))}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
