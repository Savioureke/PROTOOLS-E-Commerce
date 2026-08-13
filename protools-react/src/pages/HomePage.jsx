import React, { useState } from 'react';
import Hero from '../components/Hero/Hero';
import PromoBanners from '../components/PromoBanners/PromoBanners';
import CategoryIcons from '../components/CategoryIcons/CategoryIcons';
import BestSellers from '../components/BestSellers/BestSellers';
import FlashSale from '../components/FlashSale/FlashSale';
import { ServiceCard, PricingTiers, CategoryWidget, TopPicks, LatestNews, ConsultationCard } from '../components/Sidebar/Sidebar';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <main className="page-content" aria-label="Home page">
      {/* Full-width Hero above the columns */}
      <section className="home-hero-wrap" style={{ marginBottom: 'var(--s6)' }}>
        <div className="container">
          <Hero />
        </div>
      </section>

      <div className="container">
        <div className="layout-cols">
          {/* ── LEFT COLUMN (70%) ── */}
          <div className="layout-main">
            <PromoBanners />
            <CategoryIcons activeCategory={activeCategory} onChange={setActiveCategory} />
            <BestSellers activeCategory={activeCategory} />
            <FlashSale />
          </div>

          {/* ── RIGHT SIDEBAR (30%) ── */}
          <aside className="layout-aside" aria-label="Sidebar">
            <PricingTiers />
            <ConsultationCard />
            <CategoryWidget />
            <TopPicks />
            <LatestNews />
            <ServiceCard />
          </aside>
        </div>
      </div>
    </main>
  );
}
