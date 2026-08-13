import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { resolveImg, fmt } from '../data/dataUtils';
import './CartPage.css';

export default function CartPage() {
  const { items, itemCount, subtotal, shipping, total, increment, decrement, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="page-content cart-page" aria-label="Cart page">
        <div className="container cart-empty-page">
          <div style={{ fontSize: '4rem' }} aria-hidden="true">🛒</div>
          <h1>Your Cart is Empty</h1>
          <p>Add some professional tools to get started!</p>
          <Link to="/shop" className="btn btn-primary btn-lg">Browse Products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content cart-page" aria-label="Cart page">
      <div className="container">
        <div className="cart-page-header">
          <h1 className="section-title">Shopping Cart</h1>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{itemCount} item{itemCount !== 1 ? 's' : ''}</span>
        </div>

        <div className="cart-page-layout">
          {/* Items table */}
          <div className="cart-table" role="table" aria-label="Cart items">
            <div className="cart-table-head" role="row">
              <span role="columnheader">Product</span>
              <span role="columnheader">Price</span>
              <span role="columnheader">Qty</span>
              <span role="columnheader">Total</span>
              <span role="columnheader"><span className="sr-only">Remove</span></span>
            </div>

            {items.map(item => (
              <div key={item.id} className="cart-table-row" role="row">
                <div className="ctr-product" role="cell">
                  <img src={resolveImg(item.image)} alt={item.name} className="ctr-img" loading="lazy" />
                  <div>
                    <div className="ctr-name">
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </div>
                    <div className="ctr-brand">{item.brand}</div>
                  </div>
                </div>
                <div className="ctr-price" role="cell">{fmt(item.price)}</div>
                <div className="ctr-qty" role="cell">
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => decrement(item.id)} aria-label="Decrease quantity">−</button>
                    <span className="qty-val">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => increment(item.id)} disabled={item.quantity >= item.stock} aria-label="Increase quantity">+</button>
                  </div>
                </div>
                <div className="ctr-total" role="cell">{fmt(item.price * item.quantity)}</div>
                <div role="cell">
                  <button className="ctr-remove" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="cart-summary">
            <h2 className="widget-title" style={{ marginBottom: 'var(--s4)' }}>Order Summary</h2>
            <div className="cart-summary-rows">
              <div className="summary-row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              <div className="summary-row">
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? 'var(--success)' : 'inherit' }}>
                  {shipping === 0 ? 'FREE' : fmt(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>
                  Add {fmt(5000 - subtotal)} more for free delivery!
                </div>
              )}
              <div className="divider" />
              <div className="summary-row summary-total">
                <span>Total</span><span>{fmt(total)}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)', marginTop: 'var(--s5)' }}>
              <Link to="/checkout" className="btn btn-primary btn-lg">Proceed to Checkout</Link>
              <Link to="/shop" className="btn btn-ghost">Continue Shopping</Link>
              <button className="btn btn-ghost" style={{ color: 'var(--error)', borderColor: 'var(--error)' }} onClick={clearCart}>Clear Cart</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
