import React from 'react';
import { getCategories } from '../../data/dataUtils';
import './CategoryIcons.css';

const ICON_MAP = {
  all:       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  drills:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M14 2L4 12l4 4 10-10-4-4z"/><path d="M4 16l-2 4 4-2"/></svg>,
  cutting:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>,
  welding:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  kits:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
  measuring: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21.3 8.7l-6-6a1 1 0 0 0-1.4 0l-10.6 10.6a1 1 0 0 0 0 1.4l6 6a1 1 0 0 0 1.4 0l10.6-10.6a1 1 0 0 0 0-1.4z"/><path d="M7.5 7.5L16 16"/><path d="M10 10L8 12"/><path d="M13 7l-2 2"/><path d="M16 10l-2 2"/></svg>,
  cleaning:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>,
};

export default function CategoryIcons({ activeCategory, onChange }) {
  const categories = getCategories();

  return (
    <section className="cat-icons section" aria-label="Filter by category">
      <div className="cat-icons-row" role="group" aria-label="Product categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`cat-icon-item${activeCategory === cat.slug ? ' active' : ''}`}
            onClick={() => onChange(cat.slug)}
            aria-pressed={activeCategory === cat.slug}
            aria-label={`Filter by ${cat.name}`}
          >
            <div className="cat-icon-circle" aria-hidden="true">
              {ICON_MAP[cat.slug] || ICON_MAP.kits}
            </div>
            <span className="cat-icon-label">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
