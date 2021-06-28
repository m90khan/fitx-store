import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [{ name_contains_i: $searchTerm }, { description_contains_i: $searchTerm }]
      }
    ) {
      id
      name
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
    },
    //@ts-ignore
    itemToString: (item) => item?.name || '',
  });
  return (
    <div>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : null,
          })}
        />
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <li
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
            </li>
          ))}
        {isOpen && !items.length && !loading && (
          <li>Sorry, No items found for {inputValue}</li>
        )}
      </ul>
    </div>
  );
}
