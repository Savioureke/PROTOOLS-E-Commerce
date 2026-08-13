import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { resolveImg, fmt } from '../../data/dataUtils';
import './CartDrawer.css';

export default function CartDrawer({ open, onClose }) {
  const { items, itemCount, subtotal, shipping, total, increment, decrement, removeFromCart } = useCart();
  const drawerRef = useRef(null);

  // Trap focus
  useEffect(() => {
    if (!open) return;
    const el = drawerRef.current;
    const focusable = el?.querySelectorAll('a[href],button,input,[tabindex]:not([tabindex="-1"])');
    const first = focusable?.[0]; const last = focusable?.[focusable.length - 1];
    const trap = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
      else { if (document.activeElement === last) { e.preventDefault(); first?.focus(); } }
    };
    el?.addEventListener('keydown', trap);
    first?.focus();
    return () => el?.removeEventListener('keydown', trap);
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [open, onClose]);

  // Lock scroll
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);

  return (
    <>
      {/* Backdrop */}
      {open && <div className="overlay" style={{ zIndex: 'calc(var(--z-drawer) - 1)' }} onClick={onClose} aria-hidden="true" />}

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={`cart-drawer${open ? ' open' : ''}`}
        aria-label="Shopping cart"
        aria-modal="true"
        role="dialog"
      >
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Cart ({itemCount})
          </h2>
          <button className="cart-close icon-btn" onClick={onClose} aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="cart-items" role="list">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon" aria-hidden="true">🛒</div>
              <p>Your cart is empty</p>
              <Link to="/shop" className="btn btn-primary btn-sm" onClick={onClose}>Browse Products</Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item" role="listitem">
                <img src={resolveImg(item.image)} alt={item.name} className="cart-item-img" loading="lazy" />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-brand">{item.brand}</div>
                  <div className="cart-item-price">{fmt(item.price)}</div>
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => decrement(item.id)}
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="qty-val" aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => increment(item.id)}
                      aria-label="Increase quantity"
                      disabled={item.quantity >= item.stock}
                    >+</button>
                    <span className="cart-item-subtotal">{fmt(item.price * item.quantity)}</span>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer totals */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Subtotal</span><span>{fmt(subtotal)}</span>
              </div>
              <div className="cart-total-row">
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? 'var(--success)' : 'inherit' }}>
                  {shipping === 0 ? 'FREE' : fmt(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <div className="cart-free-ship">Add {fmt(5000 - subtotal)} more for free delivery</div>
              )}
              <div className="divider" />
              <div className="cart-total-row cart-grand-total">
                <span>Total</span><span>{fmt(total)}</span>
              </div>
            </div>
            <div className="cart-actions">
              <Link to="/cart" className="btn btn-ghost" onClick={onClose}>View Cart</Link>
              <Link to="/checkout" className="btn btn-primary" onClick={onClose}>Checkout</Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
