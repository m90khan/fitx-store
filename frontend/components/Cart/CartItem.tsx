import formatCurrency from '../../utils/formatCurrency';
import RemoveCartBtn from '../Buttons/RemoveCartBtn';
const CartItem = ({ cartItem, removeBtn = true }) => {
  return (
    <tr>
      <td className='hidden pb-4 md:table-cell'>
        <a href='#'>
          <img
            src={cartItem?.product?.photo?.image.publicUrlTransformed}
            className='w-20 rounded'
            alt={cartItem.product?.name}
          />
        </a>
      </td>
      <td>
        <div className='flex flex-col  '>
          <p className='mb-2 md:ml-4'>{cartItem.product?.name}</p>

          {removeBtn && <RemoveCartBtn id={cartItem.id} text={true} />}
        </div>
      </td>
      <td className='justify-center md:justify-end md:flex mt-6'>
        <div className='w-20 h-10'>
          <div className='relative flex flex-row w-full h-8'>
            <input
              type='number'
              readOnly
              value={cartItem.quantity}
              className='w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black'
            />
          </div>
        </div>
      </td>
      <td className='hidden text-right md:table-cell'>
        <span className='text-sm lg:text-base font-medium'>
          {formatCurrency(cartItem.product.price)}
        </span>
      </td>
      <td className='text-right'>
        <span className='text-sm lg:text-base font-medium'>
          {formatCurrency(cartItem.product.price * cartItem.quantity)}
        </span>
      </td>
    </tr>
  );
};

export default CartItem;
