import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getServices, getPricingPlans, getCategories, getAllProducts, getNewsArticles, resolveImg, fmt, formatDate } from '../../data/dataUtils';
import { useToast } from '../../context/ToastContext';
import './Sidebar.css';

/* ── Service Card ── */
export function ServiceCard() {
  const services = getServices();
  const ICONS = { truck: '🚚', shield: '🛡️', headset: '📞', refresh: '🔄' };
  return (
    <aside className="sidebar-widget service-card" aria-label="Our services">
      <h3 className="widget-title">Why Choose Us</h3>
      <ul className="service-list">
        {services.map(s => (
          <li key={s.icon} className="service-item">
            <span className="service-icon" aria-hidden="true">{ICONS[s.icon] || '⭐'}</span>
            <div>
              <div className="service-name">{s.title}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ── Pricing Tiers ── */
export function PricingTiers() {
  const plans = getPricingPlans();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { add: toast } = useToast();

  const handleSelect = (plan) => {
    setSelectedPlan(plan);
    toast(`"${plan.name}" plan selected! We'll be in touch.`, 'success');
  };

  return (
    <aside className="sidebar-widget pricing-widget" aria-label="Pricing plans">
      <h3 className="widget-title">Choose Your Plan</h3>
      <div className="pricing-list">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`pricing-item${selectedPlan?.id === plan.id ? ' selected' : ''}${plan.badge ? ' featured' : ''}`}
          >
            {plan.badge && <span className="plan-badge">{plan.badge}</span>}
            <div className="plan-header">
              <div>
                <div className="plan-name">{plan.name}</div>
                <div className="plan-tagline">{plan.tagline}</div>
              </div>
              <div className="plan-price">
                {typeof plan.price === 'number' && plan.price > 0
                  ? <><span className="plan-amount">{fmt(plan.price)}</span><span className="plan-period">{plan.period}</span></>
                  : <span className="plan-amount">{plan.period}</span>
                }
              </div>
            </div>
            <ul className="plan-features">
              {plan.features.map(f => <li key={f}><span aria-hidden="true">✓</span>{f}</li>)}
            </ul>
            <button
              className={`btn${plan.price > 0 ? ' btn-primary' : ' btn-ghost'} btn-sm`}
              style={{ width: '100%' }}
              onClick={() => handleSelect(plan)}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ── Category Widget ── */
export function CategoryWidget() {
  const categories = getCategories().filter(c => c.slug !== 'all');
  const all        = getAllProducts();
  const navigate   = useNavigate();
  return (
    <aside className="sidebar-widget" aria-label="Product categories">
      <h3 className="widget-title">Categories</h3>
      <ul className="cat-list">
        {categories.map(cat => {
          const count = all.filter(p => p.category.toLowerCase() === cat.slug).length;
          return (
            <li key={cat.id}>
              <button
                className="cat-list-item"
                onClick={() => navigate(`/shop?category=${cat.slug}`)}
                aria-label={`Browse ${cat.name} (${count} products)`}
              >
                <span>{cat.name}</span>
                <span className="cat-count">{count}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

/* ── Top Picks ── */
export function TopPicks() {
  const products = getAllProducts().filter(p => p.isTopRated).slice(0, 4);
  const navigate = useNavigate();
  return (
    <aside className="sidebar-widget" aria-label="Top picks">
      <h3 className="widget-title">Top Picks</h3>
      <ul className="top-picks-list">
        {products.map(p => (
          <li key={p.id}>
            <button className="top-pick-item" onClick={() => navigate(`/product/${p.id}`)} aria-label={`View ${p.name}`}>
              <img src={resolveImg(p.image)} alt={p.name} className="top-pick-img" loading="lazy" />
              <div className="top-pick-info">
                <div className="top-pick-name">{p.name}</div>
                <div className="stars" aria-label={`${p.rating} stars`}>{'★'.repeat(Math.floor(p.rating))}</div>
                <div className="top-pick-price">{fmt(p.price)}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ── Latest News ── */
export function LatestNews() {
  const articles = getNewsArticles();
  return (
    <aside className="sidebar-widget" aria-label="Latest news">
      <h3 className="widget-title">Latest News</h3>
      <ul className="news-list">
        {articles.map(a => (
          <li key={a.id} className="news-item">
            <img src={resolveImg(a.image)} alt={a.title} className="news-img" loading="lazy" />
            <div className="news-info">
              <div className="news-meta">{formatDate(a.date)} · {a.readTime}</div>
              <div className="news-title">{a.title}</div>
              <div className="news-excerpt">{a.excerpt}</div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/* ── Consultation Card ── */
export function ConsultationCard() {
  const { add: toast } = useToast();
  return (
    <aside className="sidebar-widget" aria-label="Tool repair and consultation">
      <h3 className="widget-title">Tool Repair & Consultation</h3>
      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 'var(--s2) 0 var(--s3)' }}>
        Need help repairing your tool or choosing the right one? Contact our experts for free advice!
      </p>
      <button 
        className="btn btn-primary btn-sm" 
        style={{ width: '100%' }}
        onClick={() => toast("Consultation booking request received! We'll call you shortly.", "success")}
      >
        BOOK NOW
      </button>
    </aside>
  );
}

