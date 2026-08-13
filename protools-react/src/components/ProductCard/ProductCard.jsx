import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { resolveImg, fmt } from '../../data/dataUtils';
import './ProductCard.css';

const STAR_MAP = { 5:'★★★★★', 4.8:'★★★★★', 4.7:'★★★★★', 4.6:'★★★★☆', 4.5:'★★★★☆', 4.3:'★★★★☆', 4.2:'★★★★☆' };
function renderStars(r) {
  const full  = Math.floor(r);
  const half  = r % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

export default function ProductCard({ product, compact = false }) {
  const { addToCart, isInCart }       = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { add: toast }                = useToast();
  const navigate                      = useNavigate();
  const [adding, setAdding]           = useState(false);

  const inCart     = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAdding(true);
    addToCart(product);
    toast(`${product.name} added to cart!`, 'success');
    setTimeout(() => setAdding(false), 600);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    const added = !inWishlist;
    toggleWishlist(product);
    toast(added ? `${product.name} added to wishlist` : `Removed from wishlist`, 'info');
  };

  const badgeColors = { sale: 'badge-sale', new: 'badge-new', hot: 'badge-hot', featured: 'badge-featured' };

  return (
    <article
      className={`product-card${compact ? ' compact' : ''}`}
      onClick={() => navigate(`/product/${product.id}`)}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/product/${product.id}`)}
      role="button"
      aria-label={`View ${product.name}`}
    >
      {/* Image */}
      <div className="card-img-wrap">
        <img
          src={resolveImg(product.image)}
          alt={product.name}
          className="card-img"
          loading="lazy"
        />
        {product.badge && (
          <span className={`badge ${badgeColors[product.badge] || 'badge-sale'} card-badge`}>
            {product.badge === 'sale' ? `-${product.discount}%` : product.badge.toUpperCase()}
          </span>
        )}
        <button
          className={`wish-btn${inWishlist ? ' wished' : ''}`}
          onClick={handleWishlist}
          aria-label={inWishlist ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={inWishlist}
          style={{ top: 'var(--s2)', right: 'var(--s2)' }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24"
            fill={inWishlist ? 'var(--red)' : 'none'}
            stroke={inWishlist ? 'var(--red)' : 'currentColor'}
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button
          className="quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent('open-quickview', { detail: product }));
          }}
          aria-label={`Quick view ${product.name}`}
          style={{
            position: 'absolute',
            top: 'calc(var(--s2) + 40px)',
            right: 'var(--s2)',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(17,17,17,0.75)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--r-full)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all var(--t-base)',
            backdropFilter: 'blur(4px)',
            zIndex: 1
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="card-body">
        <div className="card-brand">{product.brand}</div>
        <h3 className="card-name">{product.name}</h3>
        {!compact && (
          <div className="card-rating" aria-label={`Rating: ${product.rating} out of 5`}>
            <span className="stars">{renderStars(product.rating)}</span>
            <span className="card-reviews">({product.reviews})</span>
          </div>
        )}
        <div className="card-pricing">
          <span className="price-current">{fmt(product.price)}</span>
          {product.originalPrice && (
            <span className="price-old">{fmt(product.originalPrice)}</span>
          )}
        </div>
        <button
          className={`btn btn-primary card-atc${adding ? ' adding' : ''}${inCart ? ' in-cart' : ''}`}
          onClick={handleAddToCart}
          aria-label={inCart ? `${product.name} is in cart` : `Add ${product.name} to cart`}
        >
          {adding ? '✓ Added!' : inCart ? '✓ In Cart' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}
