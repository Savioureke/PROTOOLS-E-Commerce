import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard/ProductCard';
import './WishlistPage.css';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <main className="page-content wishlist-page" aria-label="Wishlist page">
        <div className="container wishlist-empty">
          <div className="wishlist-empty-icon" aria-hidden="true">♥</div>
          <h1>Your Wishlist is Empty</h1>
          <p>Tap the heart icon on any power tool to save it for later.</p>
          <Link to="/shop" className="btn btn-primary btn-lg">Browse Products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-content wishlist-page" aria-label="Wishlist page">
      <div className="container">
        <div className="wishlist-header">
          <div>
            <h1 className="section-title">My Wishlist</h1>
            <p className="wishlist-subtitle">You have {items.length} item{items.length !== 1 ? 's' : ''} saved</p>
          </div>
          <button 
            className="btn btn-ghost btn-sm" 
            style={{ color: 'var(--red)', borderColor: 'var(--red)' }}
            onClick={clearWishlist}
            aria-label="Clear all items from wishlist"
          >
            Clear Wishlist
          </button>
        </div>

        <div className="wishlist-grid">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
