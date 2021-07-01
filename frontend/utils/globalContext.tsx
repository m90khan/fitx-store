import { createContext, useContext, useReducer } from 'react';

const LocalStateContext = createContext({
  cart: false,
  search: false,
});
const LocalDispatchContext = createContext(null);

const LocalStateProvider = LocalStateContext.Provider;
const LocalDispatchProvider = LocalDispatchContext.Provider;
function reducer(state, action) {
  switch (action.type) {
    case 'CART':
      return { ...state, cart: action.setCart };
    case 'SEARCH':
      return { ...state, search: action.setSearch };
    default:
      throw new Error();
  }
}

export const GlobalStateProvider = ({ children }) => {
  // This is our own custom provider! We will store data (state) and functionality (updaters)
  // in here and anyone can access it via the consumer!

  // Closed cart by default
  const [state, dispatch] = useReducer(reducer, {
    cart: false,
    search: false,
  });

  // function toggleCart() {
  //   setCartOpen(!cartOpen);
  // }

  // function closeCart() {
  //   setCartOpen(false);
  // }

  // function openCart() {
  //   setCartOpen(true);
  // }

  return (
    <LocalDispatchProvider value={dispatch}>
      <LocalStateProvider value={state}>{children}</LocalStateProvider>
    </LocalDispatchProvider>
  );
};

// make a custom hook for accessing the cart local state

export const useGlobalStateContext = () => useContext(LocalStateContext);

export const useGlobalDispatchContext = () => useContext(LocalDispatchContext);
