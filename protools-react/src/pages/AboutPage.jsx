import React, { useState } from 'react';
import { getStoreInfo } from '../data/dataUtils';
import { useToast } from '../context/ToastContext';
import './AboutPage.css';

export default function AboutPage() {
  const store = getStoreInfo();
  const { add: toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim())    errs.name    = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Valid email required';
    if (!form.message.trim()) errs.message = 'Message is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSent(true);
    toast('Message sent! We\'ll get back to you within 24 hours.', 'success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <main className="page-content about-page" aria-label="About page">
      <div className="container">

        {/* Hero banner */}
        <div className="about-hero">
          <div className="about-hero-content">
            <h1>About PROTOOLS</h1>
            <p className="about-tagline">Kenya's Premier Power Tool Store</p>
            <p>We're passionate about providing professional-grade tools to craftsmen, contractors, and DIY enthusiasts across Kenya. Every tool we stock meets our strict quality standards.</p>
          </div>
        </div>

        {/* Values */}
        <section className="about-values section" aria-labelledby="values-heading">
          <h2 className="section-title" id="values-heading">Why Choose PROTOOLS</h2>
          <div className="values-grid">
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

        {/* Contact */}
        <section className="about-contact section" aria-labelledby="contact-heading">
          <h2 className="section-title" id="contact-heading">Get in Touch</h2>
          <div className="contact-layout">
            <div className="contact-info">
              <div className="contact-card">
                <h3>Contact Details</h3>
                <ul className="contact-list">
                  <li><span aria-hidden="true">📞</span><a href={`tel:${store.phone}`}>{store.phone}</a></li>
                  <li><span aria-hidden="true">✉</span><a href={`mailto:${store.email}`}>{store.email}</a></li>
                  <li><span aria-hidden="true">💬</span><a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></li>
                  <li><span aria-hidden="true">📍</span><span>{store.location}</span></li>
                  <li><span aria-hidden="true">🕘</span><span>Mon–Sat: 8am – 7pm</span></li>
                </ul>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
              {sent && (
                <div className="contact-success" role="alert">✅ Message sent! We'll reply within 24 hours.</div>
              )}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="cf-name" className="form-label">Name *</label>
                  <input id="cf-name" className={`input${errors.name ? ' input-error' : ''}`} value={form.name} onChange={set('name')} placeholder="Your name" />
                  {errors.name && <span className="field-error" role="alert">{errors.name}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="cf-email" className="form-label">Email *</label>
                  <input id="cf-email" type="email" className={`input${errors.email ? ' input-error' : ''}`} value={form.email} onChange={set('email')} placeholder="your@email.com" />
                  {errors.email && <span className="field-error" role="alert">{errors.email}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="cf-phone" className="form-label">Phone</label>
                  <input id="cf-phone" type="tel" className="input" value={form.phone} onChange={set('phone')} placeholder="0712 054 061" />
                </div>
                <div className="form-field">
                  <label htmlFor="cf-subject" className="form-label">Subject</label>
                  <input id="cf-subject" className="input" value={form.subject} onChange={set('subject')} placeholder="Product enquiry..." />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="cf-message" className="form-label">Message *</label>
                <textarea id="cf-message" className={`input textarea${errors.message ? ' input-error' : ''}`} rows={5} value={form.message} onChange={set('message')} placeholder="How can we help you?" />
                {errors.message && <span className="field-error" role="alert">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-lg">Send Message</button>
            </form>
          </div>
        </section>

      </div>
    </main>
  );
}
