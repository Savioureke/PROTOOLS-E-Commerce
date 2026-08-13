import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { getAllProducts } from '../../data/dataUtils';
import './FlashSale.css';

function useCountdown(durationMs) {
  const [end] = useState(() => Date.now() + durationMs);
  const [rem, setRem] = useState(durationMs);

  useEffect(() => {
    const tick = () => setRem(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);

  const h = Math.floor(rem / 3600000);
  const m = Math.floor((rem % 3600000) / 60000);
  const s = Math.floor((rem % 60000) / 1000);
  const pad = (n) => String(n).padStart(2, '0');
  return { h: pad(h), m: pad(m), s: pad(s), expired: rem === 0 };
}

export default function FlashSale() {
  const { h, m, s, expired } = useCountdown(24 * 60 * 60 * 1000);
  const flashProducts = getAllProducts().filter(p => p.isFlashSale).slice(0, 4);

  return (
    <section className="flash-sale section" aria-labelledby="flash-heading">
      <div className="flash-header">
        <div>
          <h2 className="section-title" id="flash-heading">Flash Sale</h2>
          <p className="flash-subtitle">Grab it before time runs out!</p>
        </div>
        {!expired ? (
          <div className="countdown" aria-label={`Ends in ${h} hours ${m} minutes ${s} seconds`} aria-live="polite">
            <div className="countdown-unit">
              <span className="countdown-digit" key={h}>{h}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <span className="countdown-sep" aria-hidden="true">:</span>
            <div className="countdown-unit">
              <span className="countdown-digit" key={m}>{m}</span>
              <span className="countdown-label">Mins</span>
            </div>
            <span className="countdown-sep" aria-hidden="true">:</span>
            <div className="countdown-unit">
              <span className="countdown-digit" key={s}>{s}</span>
              <span className="countdown-label">Secs</span>
            </div>
          </div>
        ) : (
          <div className="countdown-expired">Sale Ended</div>
        )}
      </div>

      <div className="flash-grid">
        {flashProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
