import React, { useEffect } from 'react';
import { getStoreInfo } from '../data/dataUtils';
import './AboutPage.css';

export default function AboutPage() {
  const store = getStoreInfo();

  useEffect(() => {
    document.title = 'About Us | PROTOOLS';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="page-content about-page" aria-label="About page">
      <div className="container">

        {/* Hero banner */}
        <div className="about-hero">
          <div className="about-hero-content">
            <h1>About PROTOOLS</h1>
            <p className="about-tagline">Kenya's Premier Power Tool Store</p>
            <p>
              Founded in Nairobi, PROTOOLS has grown from a local supplier to Kenya's leading online store for professional-grade power tools. 
              We specialize in stocking high-performance, original equipment from world-class brands. 
              Whether you are an industrial contractor managing a major construction site, a skilled craftsman, or a DIY home builder, 
              we provide the tools, warranties, and technical support you need to get the job done right.
            </p>
          </div>
        </div>

        {/* Our Mission & Vision */}
        <section className="about-vision section" aria-labelledby="vision-heading">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s6)', marginTop: 'var(--s5)' }}>
            <div className="card" style={{ padding: 'var(--s5)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: 'var(--s2)' }}>Our Mission</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                To empower Kenyan builders, contractors, and artisans by delivering original, durable, and highly efficient power tools at competitive prices. 
                We aim to eliminate the frustration of counterfeit tools by guaranteeing 100% authenticity on every product we sell.
              </p>
            </div>
            <div className="card" style={{ padding: 'var(--s5)' }}>
              <h3 style={{ color: 'var(--orange)', marginBottom: 'var(--s2)' }}>Our Promise</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                We don't just sell tools; we partner with you on your projects. 
                Every purchase at PROTOOLS comes backed by our comprehensive 1-year warranty, fast county-wide delivery, 
                and lifetime technical advice from our dedicated team of tool specialists.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="about-values section" aria-labelledby="values-heading">
          <h2 className="section-title" id="values-heading">Why Choose PROTOOLS</h2>
          <div className="values-grid" style={{ marginTop: 'var(--s5)' }}>
            {[
              { icon: '🛡️', title: 'Quality Guaranteed', desc: 'All products come with manufacturer warranty and our satisfaction guarantee.' },
              { icon: '🚚', title: 'Fast Delivery',  desc: 'Same-day dispatch in Nairobi. Countrywide delivery within 2-3 business days.' },
              { icon: '📞', title: 'Expert Support', desc: 'Our team of tool experts is available 7 days a week to help you choose the right product.' },
              { icon: '💰', title: 'Best Prices',    desc: 'We work directly with manufacturers to bring you the most competitive prices in Kenya.' },
            ].map(v => (
              <div key={v.title} className="value-card">
                <div className="value-icon" aria-hidden="true">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partner Brands */}
        <section className="about-partners section" aria-labelledby="partners-heading" style={{ textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 'var(--s6)' }}>
          <h2 className="section-title" id="partners-heading" style={{ display: 'inline-block' }}>Our Brand Partners</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', maxWidth: '600px', margin: 'var(--s3) auto var(--s5)' }}>
            We work closely with the world's most trusted manufacturers to ensure you receive authorized, top-tier tools.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s6)', justifyContent: 'center', alignItems: 'center' }}>
            {['DeWalt', 'Makita', 'Bosch', 'DERA', 'YDS'].map(brand => (
              <div key={brand} style={{ fontSize: '1.5rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                {brand}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
