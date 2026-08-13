import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import { getAllProducts, getCategories, getBrands, filterProducts, sortProducts, fmt } from '../data/dataUtils';
import './ShopPage.css';

const SORT_OPTIONS = [
  { value: 'default',    label: 'Default' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Highest Rated' },
  { value: 'discount',   label: 'Biggest Discount' },
  { value: 'name',       label: 'Name A–Z' },
];

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const [sortBy,    setSort]    = useState('default');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Read URL params as filters
  const query    = params.get('q')        || '';
  const category = params.get('category') || 'all';
  const brand    = params.get('brand')    || '';
  const minPrice = Number(params.get('min')) || 0;
  const maxPrice = Number(params.get('max')) || Infinity;

  const allProducts  = getAllProducts();
  const categories   = getCategories();
  const brands       = getBrands();
  const maxPriceAll  = Math.max(...allProducts.map(p => p.price));

  const [localMin, setLocalMin] = useState(0);
  const [localMax, setLocalMax] = useState(maxPriceAll);

  const setParam = (k, v) => {
    const p = new URLSearchParams(params);
    if (v && v !== 'all' && v !== '') p.set(k, v); else p.delete(k);
    setParams(p);
  };

  const filtered = useMemo(() =>
    sortProducts(filterProducts(allProducts, { query, category, brand, minPrice: localMin, maxPrice: localMax }), sortBy),
    [query, category, brand, localMin, localMax, sortBy]
  );

  // Update page title
  useEffect(() => { document.title = `Shop${query ? ` — "${query}"` : ''} | PROTOOLS`; }, [query]);

  return (
    <main className="shop-page page-content" aria-label="Shop page">
      <div className="container">
        {/* Shop Header */}
        <div className="shop-header">
          <div>
            <h1 className="section-title" style={{ marginBottom: 'var(--s1)' }}>
              {query ? `Search: "${query}"` : 'Shop All Products'}
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="shop-controls">
            <select
              className="input sort-select"
              value={sortBy}
              onChange={e => setSort(e.target.value)}
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <button
              className="btn btn-ghost btn-sm filter-toggle"
              onClick={() => setFiltersOpen(v => !v)}
              aria-expanded={filtersOpen}
              aria-controls="shop-filters"
            >
              Filters {filtersOpen ? '▲' : '▼'}
            </button>
          </div>
        </div>

        <div className="shop-layout">
          {/* Filters Sidebar */}
          <aside id="shop-filters" className={`shop-filters${filtersOpen ? ' open' : ''}`} aria-label="Product filters">

            <div className="filter-group">
              <div className="filter-label">Category</div>
              {categories.map(cat => (
                <label key={cat.id} className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value={cat.slug}
                    checked={category === cat.slug}
                    onChange={() => setParam('category', cat.slug)}
                  />
                  {cat.name}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <div className="filter-label">Brand</div>
              <label className="filter-option">
                <input type="radio" name="brand" value="" checked={brand === ''} onChange={() => setParam('brand', '')} />
                All Brands
              </label>
              {brands.map(b => (
                <label key={b} className="filter-option">
                  <input type="radio" name="brand" value={b} checked={brand === b} onChange={() => setParam('brand', b)} />
                  {b}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <div className="filter-label">Price Range</div>
              <div className="price-range-values">
                <span>{fmt(localMin)}</span>
                <span>{localMax >= maxPriceAll ? 'Any' : fmt(localMax)}</span>
              </div>
              <input type="range" min={0} max={maxPriceAll} step={500}
                value={localMin} onChange={e => setLocalMin(Number(e.target.value))}
                className="price-slider" aria-label="Minimum price" />
              <input type="range" min={0} max={maxPriceAll} step={500}
                value={localMax === Infinity ? maxPriceAll : localMax}
                onChange={e => setLocalMax(Number(e.target.value))}
                className="price-slider" aria-label="Maximum price" />
            </div>

            <button className="btn btn-ghost btn-sm" style={{ width: '100%' }}
              onClick={() => { setParam('category', 'all'); setParam('brand', ''); setLocalMin(0); setLocalMax(maxPriceAll); }}>
              Clear Filters
            </button>
          </aside>

          {/* Product Grid */}
          <div className="shop-grid-wrap">
            {filtered.length === 0 ? (
              <div className="shop-empty">
                <div style={{ fontSize: '3rem' }} aria-hidden="true">🔍</div>
                <h2>No products found</h2>
                <p>Try adjusting your filters or search term</p>
              </div>
            ) : (
              <div className="shop-grid">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
