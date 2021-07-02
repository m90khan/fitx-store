import formatCurrency from '../../utils/formatCurrency';
const OrderItem = ({ item, removeBtn = true }) => {
  return (
    <tr>
      <td className='hidden pb-4 md:table-cell'>
        <a href='#'>
          <img
            src={item.photo?.image.publicUrlTransformed}
            className='w-20 rounded'
            alt={item?.name}
          />
        </a>
      </td>
      <td>
        <div className='flex flex-col  '>
          <p className='mb-2 md:ml-4'>{item?.name}</p>
        </div>
      </td>
      <td className='justify-center md:justify-end md:flex mt-6'>
        <div className='w-20 h-10'>
          <div className='relative flex flex-row w-full h-8'>
            <input
              type='number'
              readOnly
              value={item.quantity}
              className='w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black'
            />
          </div>
        </div>
      </td>
      <td className='hidden text-right md:table-cell'>
        <span className='text-sm lg:text-base font-medium'>
          {formatCurrency(item.price)}
        </span>
      </td>
      <td className='text-right'>
        <span className='text-sm lg:text-base font-medium'>
          {formatCurrency(item.price * item.quantity)}
        </span>
      </td>
    </tr>
  );
};

export default OrderItem;
