import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CART_KEY = 'protools_cart';

// ─── Helpers ────────────────────────────────────────────────
const load = () => { try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; } };
const save = (items) => { try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {} };

const derive = (items) => {
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal  = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping  = subtotal >= 5000 ? 0 : 350;
  const total     = subtotal + shipping;
  return { items, itemCount, subtotal, shipping, total };
};

// ─── Reducer ─────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.product.id);
      if (existing) {
        return state.map(i =>
          i.id === action.product.id
            ? { ...i, quantity: Math.min(i.quantity + (action.qty || 1), i.stock) }
            : i
        );
      }
      return [...state, {
        id:       action.product.id,
        name:     action.product.name,
        price:    action.product.price,
        image:    action.product.image,
        brand:    action.product.brand,
        category: action.product.category,
        stock:    action.product.stock || 99,
        quantity: Math.min(action.qty || 1, action.product.stock || 99),
      }];
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    case 'SET_QTY':
      if (action.qty <= 0) return state.filter(i => i.id !== action.id);
      return state.map(i => i.id === action.id ? { ...i, quantity: Math.min(action.qty, i.stock) } : i);
    case 'INC':
      return state.map(i => i.id === action.id ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) } : i);
    case 'DEC':
      return state.map(i =>
        i.id === action.id
          ? i.quantity <= 1 ? null : { ...i, quantity: i.quantity - 1 }
          : i
      ).filter(Boolean);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], load);

  // Persist every change
  useEffect(() => { save(items); }, [items]);

  const addToCart      = (product, qty = 1) => dispatch({ type: 'ADD',     product, qty });
  const removeFromCart = (id)               => dispatch({ type: 'REMOVE',  id });
  const setQuantity    = (id, qty)          => dispatch({ type: 'SET_QTY', id, qty });
  const increment      = (id)               => dispatch({ type: 'INC',     id });
  const decrement      = (id)               => dispatch({ type: 'DEC',     id });
  const clearCart      = ()                 => dispatch({ type: 'CLEAR' });
  const isInCart       = (id)               => items.some(i => i.id === id);

  return (
    <CartContext.Provider value={{ ...derive(items), addToCart, removeFromCart, setQuantity, increment, decrement, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
