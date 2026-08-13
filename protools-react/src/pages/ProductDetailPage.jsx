import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, getAllProducts, resolveImg, fmt } from '../data/dataUtils';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard/ProductCard';
import './ProductDetailPage.css';

function renderStars(r) {
  return '★'.repeat(Math.floor(r)) + (r % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(r));
}

export default function ProductDetailPage() {
  const { id }                      = useParams();
  const navigate                    = useNavigate();
  const product                     = getProductById(id);
  const { addToCart, isInCart }     = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { add: toast }              = useToast();

  const [qty, setQty]               = useState(1);
  const [activeImg, setActiveImg]   = useState(0);

  // Related products (same category, not the same product)
  const related = getAllProducts()
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);

  useEffect(() => {
    if (product) document.title = `${product.name} | PROTOOLS`;
    else document.title = 'Product Not Found | PROTOOLS';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, product]);

  if (!product) {
    return (
      <main className="page-content">
        <div className="container" style={{ textAlign: 'center', padding: 'var(--s16)' }}>
          <h1>Product Not Found</h1>
          <p style={{ color: 'var(--text-muted)', margin: 'var(--s4) 0' }}>The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="btn btn-primary">Browse All Products</Link>
        </div>
      </main>
    );
  }

  const inCart     = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const images     = product.images?.length ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast(`${product.name} ×${qty} added to cart!`, 'success');
  };

  const handleWishlist = () => {
    const added = !inWishlist;
    toggleWishlist(product);
    toast(added ? `${product.name} added to wishlist` : 'Removed from wishlist', 'info');
  };

  const badgeMap = { sale: 'badge-sale', new: 'badge-new', hot: 'badge-hot', featured: 'badge-featured' };

  return (
    <main className="page-content product-detail-page" aria-label={`Product detail: ${product.name}`}>
      <div className="container">

        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/shop">Shop</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/shop?category=${product.category.toLowerCase()}`}>{product.category}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        {/* Main detail */}
        <div className="pd-layout">

          {/* Gallery */}
          <div className="pd-gallery">
            <div className="pd-main-img-wrap">
              {product.badge && (
                <span className={`badge ${badgeMap[product.badge]} pd-badge`}>
                  {product.badge === 'sale' ? `-${product.discount}%` : product.badge.toUpperCase()}
                </span>
              )}
              <img
                src={resolveImg(images[activeImg])}
                alt={product.name}
                className="pd-main-img"
                key={activeImg}
              />
            </div>
            {images.length > 1 && (
              <div className="pd-thumbs" role="list" aria-label="Product images">
                {images.map((img, i) => (
                  <button
                    key={i}
                    role="listitem"
                    className={`pd-thumb${i === activeImg ? ' active' : ''}`}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={i === activeImg}
                  >
                    <img src={resolveImg(img)} alt={`${product.name} view ${i + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <div className="pd-brand">{product.brand}</div>
            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-rating">
              <span className="stars" aria-label={`${product.rating} out of 5 stars`}>{renderStars(product.rating)}</span>
              <span className="pd-reviews">({product.reviews} reviews)</span>
              {product.stock <= 5 && product.stock > 0 && (
                <span className="pd-low-stock">Only {product.stock} left!</span>
              )}
              {product.stock === 0 && <span className="pd-out">Out of Stock</span>}
            </div>

            <div className="pd-pricing">
              <span className="price-current pd-price">{fmt(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="price-old">{fmt(product.originalPrice)}</span>
                  <span className="pd-savings">Save {product.discount}%</span>
                </>
              )}
            </div>

            <p className="pd-desc">{product.description}</p>

            {/* Features */}
            {product.features?.length > 0 && (
              <ul className="pd-features" aria-label="Product features">
                {product.features.map(f => <li key={f}><span aria-hidden="true">✓</span>{f}</li>)}
              </ul>
            )}

            {/* Qty + Actions */}
            <div className="pd-actions">
              <div className="qty-control" aria-label="Quantity">
                <button className="qty-btn" onClick={() => setQty(v => Math.max(1, v - 1))} aria-label="Decrease quantity" disabled={qty <= 1}>−</button>
                <span className="qty-val" aria-live="polite">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(v => Math.min(product.stock, v + 1))} aria-label="Increase quantity" disabled={qty >= product.stock}>+</button>
              </div>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : inCart ? '✓ In Cart' : 'Add to Cart'}
              </button>
              <button
                className={`btn btn-ghost pd-wish${inWishlist ? ' wished' : ''}`}
                onClick={handleWishlist}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={inWishlist ? 'var(--red)' : 'none'} stroke={inWishlist ? 'var(--red)' : 'currentColor'} strokeWidth="2" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Quick contact */}
            <div className="pd-contact">
              <a href="tel:0712054061" className="btn btn-ghost btn-sm">📞 0712 054061</a>
              <a href="https://wa.me/+254712054061" className="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="pd-related section" aria-labelledby="related-heading">
            <h2 className="section-title" id="related-heading">You May Also Like</h2>
            <div className="pd-related-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
