import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { getAllProducts, resolveImg, debounce } from '../../data/dataUtils';
import './Header.css';

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/shop',     label: 'Shop' },
  { to: '/about',    label: 'About' },
  { to: '/contact',  label: 'Contact' },
];

export default function Header({ onCartOpen }) {
  const { itemCount } = useCart();
  const { count: wishCount } = useWishlist();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen]       = useState(false);
  const [query, setQuery]             = useState('');
  const [results, setResults]         = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const allProducts = getAllProducts();

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [navigate]);

  // Close search results on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Lock body scroll when mobile nav open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const doSearch = useCallback(debounce((q) => {
    if (!q.trim()) { setResults([]); setShowResults(false); return; }
    const lower = q.toLowerCase();
    const res = allProducts.filter(p =>
      [p.name, p.brand, p.category, ...(p.tags || [])].join(' ').toLowerCase().includes(lower)
    ).slice(0, 6);
    setResults(res);
    setShowResults(res.length > 0);
  }, 250), []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    doSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setShowResults(false);
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const goToProduct = (p) => {
    setShowResults(false);
    setQuery('');
    navigate(`/product/${p.id}`);
  };

  return (
    <>
      <header className="header" role="banner">
        <div className="container">
          <div className="header-inner">

            {/* Logo */}
            <Link to="/" className="logo" aria-label="PROTOOLS - Home">
              <div className="logo-icon" aria-hidden="true">⚡</div>
              <span>PRO<span className="logo-accent">TOOLS</span></span>
            </Link>

            {/* Desktop Nav */}
            <nav className="nav" aria-label="Main navigation">
              {NAV_LINKS.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            {/* Search */}
            <div className="search-wrap" ref={searchRef} style={{ position: 'relative' }}>
              <form onSubmit={handleSearchSubmit} role="search" style={{ width: '100%' }}>
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search tools, brands…"
                  value={query}
                  onChange={handleSearchChange}
                  onFocus={() => results.length && setShowResults(true)}
                  aria-label="Search products"
                  aria-autocomplete="list"
                  aria-expanded={showResults}
                />
              </form>
              {showResults && (
                <div className="search-results" role="listbox" aria-label="Search suggestions">
                  {results.map(p => (
                    <div
                      key={p.id}
                      className="search-result-item"
                      role="option"
                      tabIndex={0}
                      onClick={() => goToProduct(p)}
                      onKeyDown={e => e.key === 'Enter' && goToProduct(p)}
                      aria-label={`${p.name} – KSh ${p.price.toLocaleString()}`}
                    >
                      <img
                        className="search-result-img"
                        src={resolveImg(p.image)}
                        alt={p.name}
                        loading="lazy"
                      />
                      <div>
                        <div className="search-result-name">{p.name}</div>
                        <div className="search-result-price">KSh {p.price.toLocaleString('en-KE')}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="header-actions">
              <Link to="/wishlist" className="icon-btn" aria-label={`Wishlist (${wishCount} items)`}>
                {wishCount > 0 && <span className="badge-count" aria-hidden="true">{wishCount}</span>}
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wishCount > 0 ? 'var(--red)' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </Link>
              <button
                className="icon-btn"
                onClick={onCartOpen}
                aria-label={`Shopping cart (${itemCount} items)`}
              >
                {itemCount > 0 && <span className="badge-count" aria-hidden="true">{itemCount}</span>}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </button>
              {/* Hamburger */}
              <button
                className={`hamburger${menuOpen ? ' open' : ''}`}
                onClick={() => setMenuOpen(v => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
              >
                <span /><span /><span />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <nav
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </NavLink>
        ))}
        {/* Mobile search */}
        <form onSubmit={(e) => { e.preventDefault(); setMenuOpen(false); navigate(`/shop?q=${encodeURIComponent(query)}`); }}>
          <input className="search-input" style={{ marginTop: 'var(--s4)' }} type="search" placeholder="Search tools…" value={query} onChange={e => setQuery(e.target.value)} />
        </form>
      </nav>

      {/* Backdrop for mobile menu */}
      {menuOpen && (
        <div
          className="overlay"
          style={{ zIndex: 'calc(var(--z-drawer) - 1)' }}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
