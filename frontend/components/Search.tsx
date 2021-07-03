import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { useGlobalDispatchContext } from '../utils/globalContext';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [{ name_contains_i: $searchTerm }, { description_contains_i: $searchTerm }]
      }
    ) {
      id
      name
      description
      price
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const dispatch = useGlobalDispatchContext();

  // useLazyQuery
  const [findProducts, { loading, data, error }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const items = data?.searchTerms || [];
  const findIProductsButRelax = debounce(findProducts, 350);
  // to get rid of server side rendering issues such as messed up list ids
  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    // 1- items from list
    items,
    // 2- Input value change
    onInputValueChange() {
      findIProductsButRelax({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    // 3- Selected item from list change
    onSelectedItemChange({ selectedItem }) {
      //@ts-ignore
      router.push({
        //@ts-ignore

        pathname: `/product/${selectedItem.id}`,
      });
      dispatch({ type: 'SEARCH', setSearch: false });
    },
    //@ts-ignore
    itemToString: (item) => item?.name || '',
  });

  const closeCart = (e) => {
    const element = e.target;
    if (element.classList.contains('close-cart')) {
      document.body.style.overflow = 'auto';
      // router.push({
      //   pathname: `${router.pathname}`,
      // });
      dispatch({ type: 'SEARCH', setSearch: false });
    }
  };
  return (
    <div
      className='w-full min-h-screen fixed   bg-gray-900 bg-opacity-30  close-cart '
      onClick={closeCart}
    >
      <div className='flex h-4/5  flex-col items-center justify-center'>
        <div
          {...getComboboxProps()}
          className=' grid   rounded-lg my-5  shadow-xl w-8/9 md:w-9/12 lg:w-1/3'
        >
          <input
            {...getInputProps({
              type: 'search',
              placeholder: 'Search for an Product',
              id: 'search',
              className:
                'py-2 px-3 rounded-lg border-2 border-gray-300 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent',
            })}
          />
        </div>
        <ul
          {...getMenuProps()}
          className='flex flex-col w-8/9 md:w-9/12 lg:w-1/3   bg-gray-300 rounded-lg'
        >
          {isOpen &&
            items.map((item, index) => (
              <>
                <div
                  className='cursor-pointer   border-gray-100 h-16 rounded-t border-b hover:bg-teal-100 '
                  {...getItemProps({ item, index })}
                  key={item.id}
                  highlighted={index === highlightedIndex}
                >
                  <div className='flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100'>
                    <div className='w-6 flex flex-col items-center'>
                      <div className='flex relative w-10 h-10 bg-orange-500 justify-center items-center m-1 mr-2 w-4 h-4 mt-1 rounded-full '>
                        <img
                          className='rounded-full'
                          alt='A'
                          src={item.photo.image.publicUrlTransformed}
                        />{' '}
                      </div>
                    </div>
                    <div className='w-full items-center flex'>
                      <div className='mx-2 -mt-1  text-gray-'>
                        {' '}
                        {item.name}
                        <div className='text-xs overflow-ellipsis overflow-hidden ... w-full normal-case font-normal -mt-1 text-gray-500'>
                          {item.description.replace(/(<([^>]+)>)/gi, '').slice(0, 100)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <li
                {...getItemProps({ item, index })}
                key={item.id}
                highlighted={index === highlightedIndex}
              >
                <img
                  src={item.photo.image.publicUrlTransformed}
                  alt={item.name}
                  width='50'
                />
                {item.name}
              </li> */}
              </>
            ))}
          {isOpen && !items.length && !loading && (
            <li>Sorry, No items found for {inputValue}</li>
          )}
        </ul>
      </div>
    </div>
  );
}
