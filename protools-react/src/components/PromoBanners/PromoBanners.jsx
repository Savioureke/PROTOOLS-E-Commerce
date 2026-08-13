import React from 'react';
import { Link } from 'react-router-dom';
import { getPromoBanners, resolveImg } from '../../data/dataUtils';
import './PromoBanners.css';

export default function PromoBanners() {
  const banners = getPromoBanners();
  return (
    <section className="promo-banners section" aria-label="Promotional banners">
      <div className="promo-grid">
        {banners.map((banner, i) => (
          <div key={banner.id} className={`promo-banner promo-${banner.theme}`}>
            <img src={resolveImg(banner.image)} alt={banner.title} className="promo-img" loading="lazy" />
            <div className="promo-overlay" aria-hidden="true" />
            <div className="promo-content">
              <h3 className="promo-title">{banner.title}</h3>
              <p className="promo-sub">{banner.subtitle}</p>
              <Link to={banner.link} className="btn btn-primary btn-sm">
                {banner.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
