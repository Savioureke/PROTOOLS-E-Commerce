import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fmt } from '../data/dataUtils';
import './CheckoutPage.css';

const INITIAL = { name:'', email:'', phone:'', address:'', city:'', county:'', cardName:'', cardNum:'', expiry:'', cvv:'' };

function validate(f) {
  const e = {};
  if (!f.name.trim())    e.name    = 'Full name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Valid email required';
  if (!f.phone.trim())   e.phone   = 'Phone number is required';
  if (!f.address.trim()) e.address = 'Delivery address is required';
  if (!f.city.trim())    e.city    = 'City is required';
  if (!f.cardName.trim()) e.cardName = 'Name on card is required';
  if (!/^\d{16}$/.test(f.cardNum.replace(/\s/g,''))) e.cardNum = 'Valid 16-digit card number required';
  if (!/^\d{2}\/\d{2}$/.test(f.expiry)) e.expiry = 'Format: MM/YY';
  if (!/^\d{3,4}$/.test(f.cvv)) e.cvv = '3-4 digit CVV required';
  return e;
}

export default function CheckoutPage() {
  const { items, total, subtotal, shipping, clearCart } = useCart();
  const navigate = useNavigate();
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [placed,  setPlaced]  = useState(false);
  const [orderNum] = useState(() => `PT-${Date.now().toString().slice(-8)}`);

  const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(fields);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (placed) {
    return (
      <main className="page-content checkout-page" aria-label="Order placed">
        <div className="container">
          <div className="order-success" role="alert" aria-live="polite">
            <div className="success-icon" aria-hidden="true">✅</div>
            <h1>Order Placed!</h1>
            <p>Thank you, <strong>{fields.name}</strong>! Your order <strong>{orderNum}</strong> has been received.</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              A confirmation will be sent to {fields.email}.<br />
              We'll call you on {fields.phone} to confirm delivery.
            </p>
            <div style={{ display: 'flex', gap: 'var(--s3)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--s6)' }}>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/')}>Continue Shopping</button>
              <a href={`https://wa.me/+254712054061?text=Hi, I placed order ${orderNum}`} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const F = ({ id, label, type='text', placeholder, value, onChange, error, hint }) => (
    <div className="form-field">
      <label htmlFor={id} className="form-label">{label}</label>
      <input id={id} type={type} className={`input${error ? ' input-error' : ''}`} placeholder={placeholder} value={value} onChange={onChange} aria-describedby={error ? `${id}-err` : undefined} />
      {error && <span id={`${id}-err`} className="field-error" role="alert">{error}</span>}
      {hint && !error && <span className="field-hint">{hint}</span>}
    </div>
  );

  return (
    <main className="page-content checkout-page" aria-label="Checkout page">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: 'var(--s6)' }}>Checkout</h1>
        <div className="checkout-layout">
          <form onSubmit={handleSubmit} noValidate className="checkout-form" aria-label="Checkout form">

            <section className="checkout-section">
              <h2 className="checkout-section-title">Delivery Information</h2>
              <div className="form-row">
                <F id="co-name"    label="Full Name *"    placeholder="John Doe"          value={fields.name}    onChange={set('name')}    error={errors.name} />
                <F id="co-email"   label="Email *"        type="email" placeholder="john@email.com" value={fields.email}   onChange={set('email')}   error={errors.email} />
              </div>
              <div className="form-row">
                <F id="co-phone"   label="Phone *"        type="tel"  placeholder="0712 054 061"   value={fields.phone}   onChange={set('phone')}   error={errors.phone} />
                <F id="co-city"    label="City *"         placeholder="Nairobi"           value={fields.city}    onChange={set('city')}    error={errors.city} />
              </div>
              <F id="co-address"   label="Delivery Address *" placeholder="Street, Building, Area" value={fields.address} onChange={set('address')} error={errors.address} />
              <F id="co-county"    label="County"         placeholder="Nairobi County"    value={fields.county}  onChange={set('county')} />
            </section>

            <section className="checkout-section">
              <h2 className="checkout-section-title">
                Payment
                <span className="checkout-mock-note">(Mock — no real charge)</span>
              </h2>
              <F id="co-cardname" label="Name on Card *" placeholder="JOHN DOE"          value={fields.cardName} onChange={set('cardName')} error={errors.cardName} />
              <div className="form-row">
                <F id="co-cardnum" label="Card Number *" placeholder="1234 5678 9012 3456" value={fields.cardNum} onChange={set('cardNum')} error={errors.cardNum} hint="16 digits" />
              </div>
              <div className="form-row">
                <F id="co-expiry" label="Expiry *" placeholder="MM/YY"  value={fields.expiry} onChange={set('expiry')} error={errors.expiry} />
                <F id="co-cvv"    label="CVV *"    type="password" placeholder="123" value={fields.cvv} onChange={set('cvv')} error={errors.cvv} />
              </div>
            </section>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Place Order — {fmt(total)}
            </button>
          </form>

          {/* Order Summary */}
          <aside className="checkout-summary" aria-label="Order summary">
            <h2 className="widget-title" style={{ marginBottom: 'var(--s4)' }}>Order Summary</h2>
            {items.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Cart is empty</p>
            ) : (
              <>
                {items.map(i => (
                  <div key={i.id} className="co-item">
                    <span className="co-item-name">{i.name} ×{i.quantity}</span>
                    <span>{fmt(i.price * i.quantity)}</span>
                  </div>
                ))}
                <div className="divider" style={{ margin: 'var(--s3) 0' }} />
                <div className="co-item"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                <div className="co-item"><span>Shipping</span><span style={{ color: shipping === 0 ? 'var(--success)' : 'inherit' }}>{shipping === 0 ? 'FREE' : fmt(shipping)}</span></div>
                <div className="divider" style={{ margin: 'var(--s3) 0' }} />
                <div className="co-item co-total"><span>Total</span><span>{fmt(total)}</span></div>
              </>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
