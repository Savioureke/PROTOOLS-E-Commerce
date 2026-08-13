import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoreInfo } from '../../data/dataUtils';
import { useToast } from '../../context/ToastContext';
import './Footer.css';

export default function Footer() {
  const store = getStoreInfo();
  const [email, setEmail] = useState('');
  const [err, setErr]     = useState('');
  const { add: toast }    = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr('Please enter a valid email address');
      return;
    }
    setErr('');
    setEmail('');
    toast('Thank you! You\'ve been subscribed to our newsletter.', 'success');
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo" aria-label="PROTOOLS Home">
                <span className="footer-logo-icon" aria-hidden="true">⚡</span>
                PRO<span>TOOLS</span>
              </Link>
              <div className="footer-tagline">{store.tagline}</div>
              <p className="footer-about">
                Your trusted source for professional power tools and equipment in Kenya.
                We stock DeWalt, Makita, Bosch, and more — all with warranty and support.
              </p>
              <div className="footer-social" aria-label="Social media links">
                {[['Facebook','f',store.socialMedia.facebook],['Instagram','📷',store.socialMedia.instagram],['WhatsApp','💬',store.socialMedia.whatsapp],['YouTube','▶',store.socialMedia.youtube]].map(([name, icon, href]) => (
                  <a key={name} href={href} className="social-link" aria-label={name} target="_blank" rel="noopener noreferrer">
                    <span aria-hidden="true">{icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <nav aria-label="Quick links">
              <div className="footer-col-title">Quick Links</div>
              <ul className="footer-links">
                {[['Home','/'],['Shop','/shop'],['About','/about'],['Contact','/contact'],['Cart','/cart']].map(([l,to]) => (
                  <li key={l}><Link to={to} className="footer-link">{l}</Link></li>
                ))}
              </ul>
            </nav>

            {/* Products */}
            <nav aria-label="Product categories">
              <div className="footer-col-title">Products</div>
              <ul className="footer-links">
                {[['Power Drills','drills'],['Circular Saws','cutting'],['Welding Machines','welding'],['Tool Kits','kits'],['Laser Levels','measuring'],['Pressure Washers','cleaning']].map(([l,cat]) => (
                  <li key={l}><Link to={`/shop?category=${cat}`} className="footer-link">{l}</Link></li>
                ))}
              </ul>
            </nav>

            {/* Contact */}
            <div>
              <div className="footer-col-title">Contact</div>
              <ul className="footer-links">
                <li>
                  <a href={`tel:${store.phone}`} className="footer-link footer-contact-item">
                    <span aria-hidden="true">📞</span>{store.phone}
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${store.whatsapp}`} className="footer-link footer-contact-item" target="_blank" rel="noopener noreferrer">
                    <span aria-hidden="true">💬</span>WhatsApp Us
                  </a>
                </li>
                <li>
                  <a href={`mailto:${store.email}`} className="footer-link footer-contact-item">
                    <span aria-hidden="true">✉</span>{store.email}
                  </a>
                </li>
                <li className="footer-contact-item" style={{ color: 'var(--text-muted)' }}>
                  <span aria-hidden="true">📍</span>{store.location}
                </li>
              </ul>

              {/* Newsletter */}
              <div className="newsletter" aria-label="Newsletter signup">
                <div className="footer-col-title" style={{ marginTop: 'var(--s5)' }}>Newsletter</div>
                <form onSubmit={handleSubscribe} noValidate>
                  <div className="newsletter-row">
                    <input
                      className="input newsletter-input"
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setErr(''); }}
                      aria-label="Email address for newsletter"
                      aria-describedby={err ? 'newsletter-err' : undefined}
                    />
                    <button className="btn btn-primary btn-sm" type="submit">Subscribe</button>
                  </div>
                  {err && <p id="newsletter-err" className="footer-err" role="alert">{err}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <span>© 2026 PROTOOLS. All rights reserved.</span>
            <span className="footer-made">Made in Kenya 🇰🇪</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
