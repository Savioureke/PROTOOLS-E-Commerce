import React, { useState, useEffect } from 'react';
import { getStoreInfo } from '../data/dataUtils';
import { useToast } from '../context/ToastContext';
import './ContactPage.css';

export default function ContactPage() {
  const store = getStoreInfo();
  const { add: toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us | PROTOOLS';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
    <main className="page-content contact-page" aria-label="Contact page">
      <div className="container">

        {/* Header */}
        <div className="contact-hero" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', padding: 'var(--s8) var(--s12)', marginBottom: 'var(--s6)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--grad-cta)' }} />
          <h1>Contact Us</h1>
          <p style={{ color: 'var(--orange)', fontWeight: '600', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 'var(--s2)' }}>
            We're here to help you get the job done
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: 'var(--s2)', maxWidth: '600px' }}>
            Have questions about our power tools, warranties, or need recommendations for your project? Drop us a line or call our Nairobi office directly.
          </p>
        </div>

        {/* Contact info + form */}
        <div className="contact-layout" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 'var(--s6)' }}>
          <div className="contact-info">
            <div className="contact-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 'var(--s5)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: 'var(--s4)' }}>Store Information</h3>
              <ul className="contact-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s4)' }}>
                <li style={{ display: 'flex', gap: 'var(--s3)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span aria-hidden="true" style={{ fontSize: '1.2rem' }}>📞</span>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Phone Number</strong>
                    <a href={`tel:${store.phone}`} style={{ color: 'var(--orange)' }}>{store.phone}</a>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: 'var(--s3)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span aria-hidden="true" style={{ fontSize: '1.2rem' }}>💬</span>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)' }}>WhatsApp</strong>
                    <a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--success)' }}>Message on WhatsApp</a>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: 'var(--s3)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span aria-hidden="true" style={{ fontSize: '1.2rem' }}>✉</span>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Email</strong>
                    <a href={`mailto:${store.email}`} style={{ color: 'var(--orange)' }}>{store.email}</a>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: 'var(--s3)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span aria-hidden="true" style={{ fontSize: '1.2rem' }}>📍</span>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Showroom Location</strong>
                    <span>{store.location}</span>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: 'var(--s3)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span aria-hidden="true" style={{ fontSize: '1.2rem' }}>🕘</span>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Business Hours</strong>
                    <span>Mon–Sat: 8:00 AM – 7:00 PM</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 'var(--s6)', display: 'flex', flexDirection: 'column', gap: 'var(--s4)' }}>
            {sent && (
              <div className="contact-success" role="alert" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid var(--success)', borderRadius: 'var(--r-md)', padding: 'var(--s3) var(--s4)', fontSize: '0.875rem', color: 'var(--success)' }}>
                ✅ Message sent! We'll reply within 24 hours.
              </div>
            )}
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
              <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s1)' }}>
                <label htmlFor="cf-name" className="form-label" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Name *</label>
                <input id="cf-name" className={`input${errors.name ? ' input-error' : ''}`} value={form.name} onChange={set('name')} placeholder="Your name" />
                {errors.name && <span className="field-error" style={{ fontSize: '0.75rem', color: 'var(--error)' }} role="alert">{errors.name}</span>}
              </div>
              <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s1)' }}>
                <label htmlFor="cf-email" className="form-label" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Email *</label>
                <input id="cf-email" type="email" className={`input${errors.email ? ' input-error' : ''}`} value={form.email} onChange={set('email')} placeholder="your@email.com" />
                {errors.email && <span className="field-error" style={{ fontSize: '0.75rem', color: 'var(--error)' }} role="alert">{errors.email}</span>}
              </div>
            </div>
            <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
              <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s1)' }}>
                <label htmlFor="cf-phone" className="form-label" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Phone</label>
                <input id="cf-phone" type="tel" className="input" value={form.phone} onChange={set('phone')} placeholder="0712 054 061" />
              </div>
              <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s1)' }}>
                <label htmlFor="cf-subject" className="form-label" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Subject</label>
                <input id="cf-subject" className="input" value={form.subject} onChange={set('subject')} placeholder="Product enquiry..." />
              </div>
            </div>
            <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s1)' }}>
              <label htmlFor="cf-message" className="form-label" style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Message *</label>
              <textarea id="cf-message" className={`input${errors.message ? ' input-error' : ''}`} rows={5} value={form.message} onChange={set('message')} placeholder="How can we help you?" style={{ resize: 'vertical', minHeight: '120px' }} />
              {errors.message && <span className="field-error" style={{ fontSize: '0.75rem', color: 'var(--error)' }} role="alert">{errors.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start' }}>Send Message</button>
          </form>
        </div>

      </div>
    </main>
  );
}
