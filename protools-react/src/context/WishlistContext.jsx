import React, { createContext, useContext, useReducer, useEffect } from 'react';

const WL_KEY = 'protools_wishlist';
const load = () => { try { return JSON.parse(localStorage.getItem(WL_KEY) || '[]'); } catch { return []; } };
const save = (items) => { try { localStorage.setItem(WL_KEY, JSON.stringify(items)); } catch {} };

function wlReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      if (state.find(i => i.id === action.product.id)) return state;
      return [...state, { id: action.product.id, name: action.product.name, price: action.product.price, image: action.product.image, brand: action.product.brand, rating: action.product.rating }];
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    case 'TOGGLE':
      return state.find(i => i.id === action.product.id)
        ? state.filter(i => i.id !== action.product.id)
        : [...state, { id: action.product.id, name: action.product.name, price: action.product.price, image: action.product.image, brand: action.product.brand, rating: action.product.rating }];
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, dispatch] = useReducer(wlReducer, [], load);
  useEffect(() => { save(items); }, [items]);

  const addToWishlist      = (product) => dispatch({ type: 'ADD',    product });
  const removeFromWishlist = (id)      => dispatch({ type: 'REMOVE', id });
  const toggleWishlist     = (product) => dispatch({ type: 'TOGGLE', product });
  const isInWishlist       = (id)      => items.some(i => i.id === id);
  const clearWishlist      = ()        => dispatch({ type: 'CLEAR' });

  return (
    <WishlistContext.Provider value={{ items, count: items.length, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
