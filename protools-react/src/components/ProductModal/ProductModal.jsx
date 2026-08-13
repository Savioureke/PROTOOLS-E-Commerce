import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { resolveImg, fmt } from '../../data/dataUtils';
import './ProductModal.css';

export default function ProductModal({ product, onClose }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { add: toast } = useToast();

  const [qty, setQty] = useState(1);
  const modalRef = useRef(null);

  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  // Trap focus
  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };

    el.addEventListener('keydown', handleTab);
    first?.focus();
    return () => el.removeEventListener('keydown', handleTab);
  }, []);

  // Escape to close
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast(`${product.name} (x${qty}) added to cart!`, 'success');
    onClose();
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast(inWishlist ? 'Removed from wishlist' : `${product.name} added to wishlist`, 'info');
  };

  return (
    <>
      <div className="overlay" onClick={onClose} aria-hidden="true" />
      <div 
        ref={modalRef} 
        className="product-modal" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
      >
        <button className="modal-close icon-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-content">
          <div className="modal-gallery">
            <img src={resolveImg(product.image)} alt={product.name} className="modal-img" />
          </div>

          <div className="modal-info">
            <span className="modal-brand">{product.brand}</span>
            <h2 id="modal-title" className="modal-title-text">{product.name}</h2>
            
            <div className="modal-rating">
              <span className="stars">{'★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(product.rating))}</span>
              <span className="modal-reviews">({product.reviews} reviews)</span>
            </div>

            <div className="modal-price-wrap">
              <span className="price-current">{fmt(product.price)}</span>
              {product.originalPrice && (
                <span className="price-old">{fmt(product.originalPrice)}</span>
              )}
            </div>

            <p className="modal-desc">{product.description}</p>

            <div className="modal-actions">
              <div className="qty-control">
                <button className="qty-btn" onClick={() => setQty(v => Math.max(1, v - 1))} disabled={qty <= 1}>−</button>
                <span className="qty-val">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(v => Math.min(product.stock || 10, v + 1))} disabled={qty >= (product.stock || 10)}>+</button>
              </div>

              <button className="btn btn-primary" onClick={handleAddToCart}>
                {inCart ? '✓ Add More' : 'Add to Cart'}
              </button>

              <button 
                className={`icon-btn modal-wish-btn${inWishlist ? ' active' : ''}`} 
                onClick={handleWishlist} 
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={inWishlist ? 'var(--red)' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
