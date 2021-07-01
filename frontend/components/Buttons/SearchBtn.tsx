import {
  useGlobalDispatchContext,
  useGlobalStateContext,
} from '../../utils/globalContext';

const SearchBtn = () => {
  const { search } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();
  const handleSearch = () => {
    if (!search) {
      dispatch({ type: 'SEARCH', setSearch: true });
    } else {
      dispatch({ type: 'SEARCH', setSearch: false });
    }
  };
  return (
    <div
      className='pl-3 inline-block no-underline hover:text-black cursor-pointer'
      onClick={handleSearch}
    >
      <svg
        className='fill-current hover:text-black'
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
      >
        <path d='M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z' />
      </svg>
    </div>
  );
};

export default SearchBtn;
