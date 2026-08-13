import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getHeroSlides, resolveImg } from '../../data/dataUtils';
import './Hero.css';

export default function Hero() {
  const slides = getHeroSlides();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animDir, setAnimDir] = useState('next');
  const touchStart = useRef(null);
  const intervalRef = useRef(null);

  const goTo = useCallback((idx, dir = 'next') => {
    setAnimDir(dir);
    setCurrent((idx + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => goTo(current + 1, 'next'), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, 'prev'), [current, goTo]);

  // Auto-rotate every 5s
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => goTo(current + 1, 'next'), 5000);
    return () => clearInterval(intervalRef.current);
  }, [current, paused, goTo]);

  // Touch/swipe
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    touchStart.current = null;
  };

  const slide = slides[current];

  return (
    <section
      className="hero"
      aria-label="Featured products carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={`hero-slide hero-slide-${animDir}`}
        key={current}
        aria-live="polite"
        aria-atomic="true"
      >
        <img
          src={resolveImg(slide.image)}
          alt={slide.title}
          className="hero-img"
          loading="eager"
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <span className="hero-badge">{slide.badge}</span>
          <h1 className="hero-title">
            {slide.title}<br />
            <span className="hero-subtitle">{slide.subtitle}</span>
          </h1>
          <p className="hero-desc">{slide.description}</p>
          <Link to="/shop" className="btn btn-primary btn-lg hero-cta">
            {slide.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button className="hero-arrow hero-arrow-prev" onClick={prev} aria-label="Previous slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <button className="hero-arrow hero-arrow-next" onClick={next} aria-label="Next slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>

      {/* Dots */}
      <div className="hero-dots" role="tablist" aria-label="Carousel navigation">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            className={`hero-dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
