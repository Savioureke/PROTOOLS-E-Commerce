import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { getAllProducts, filterProducts } from '../../data/dataUtils';
import './BestSellers.css';

const TABS = [
  { key: 'top-rated',    label: 'Top Rated' },
  { key: 'popular',      label: 'Popular' },
  { key: 'new-arrivals', label: 'New Arrivals' },
];

export default function BestSellers({ activeCategory = 'all' }) {
  const [tab, setTab] = useState('top-rated');
  const [page, setPage] = useState(0);
  const PER_PAGE = 8;
  const all = getAllProducts();

  const filtered = filterProducts(all, { category: activeCategory, tab });
  const shown    = filtered.slice(0, PER_PAGE * (page + 1));
  const hasMore  = shown.length < filtered.length;

  // Reset page when filters change
  useEffect(() => { setPage(0); }, [tab, activeCategory]);

  return (
    <section className="best-sellers section" aria-labelledby="bs-heading">
      <div className="section-header">
        <h2 className="section-title" id="bs-heading">Best Sellers</h2>
        <div className="bs-tabs" role="tablist" aria-label="Product filter">
          {TABS.map(t => (
            <button
              key={t.key}
              role="tab"
              className={`bs-tab${tab === t.key ? ' active' : ''}`}
              onClick={() => setTab(t.key)}
              aria-selected={tab === t.key}
              aria-controls="bs-grid"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="bs-empty">No products found in this category & filter combination.</div>
      ) : (
        <div id="bs-grid" className="bs-grid" role="tabpanel">
          {shown.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      {hasMore && (
        <div className="bs-load-more">
          <button className="btn btn-secondary" onClick={() => setPage(v => v + 1)}>
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
