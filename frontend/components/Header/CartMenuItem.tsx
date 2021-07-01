import formatCurrency from '../../utils/formatCurrency';
import RemoveCartBtn from '../Buttons/RemoveCartBtn';

const CartMenuItem = ({ cartItem }) => {
  return (
    <div className='p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100'>
      <div className='p-2 w-20'>
        <img src={cartItem.product.photo.image.publicUrlTransformed} alt='img product' />
      </div>
      <div className='flex-auto text-sm w-32'>
        <div className='font-bold'>{cartItem.product.name}</div>
        <div className='truncate'>
          {cartItem.product.description.replace(/(<([^>]+)>)/gi, '')}
        </div>
        <div className='text-gray-400'>Qt: {cartItem.quantity}</div>
      </div>
      <div className='flex flex-col w-18 font-medium items-end'>
        <RemoveCartBtn id={cartItem.id} />
        {formatCurrency(cartItem.product.price * cartItem.quantity)}
      </div>
    </div>
  );
};

export default CartMenuItem;
