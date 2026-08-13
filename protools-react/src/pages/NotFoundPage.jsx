import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <main className="page-content not-found-page" aria-label="Page not found">
      <div className="container not-found-container">
        <div className="not-found-icon" aria-hidden="true">🔧⚠️</div>
        <h1 className="not-found-title">404 — Page Not Found</h1>
        <p className="not-found-text">
          Oops! The page you are looking for has been misplaced or doesn't exist. Let's get you back on track with the right tools.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
          <Link to="/shop" className="btn btn-secondary">Browse Shop</Link>
        </div>
      </div>
    </main>
  );
}
