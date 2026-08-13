import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/CartDrawer/CartDrawer';
import ToastContainer from './components/Toast/Toast';
import ProductModal from './components/ProductModal/ProductModal';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const handleQuickView = (e) => {
      setQuickViewProduct(e.detail);
    };
    window.addEventListener('open-quickview', handleQuickView);
    return () => window.removeEventListener('open-quickview', handleQuickView);
  }, []);

  return (
    <Router>
      <ToastProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: 'var(--header-h)' }}>
              
              {/* Sticky Header */}
              <Header onCartOpen={() => setCartOpen(true)} />

              {/* Page Content wrapper with route transitions */}
              <div className="main-content-flow" style={{ flex: '1 0 auto' }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>

              {/* Footer */}
              <Footer />

              {/* Side drawer cart */}
              <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

              {/* Toast notifier container */}
              <ToastContainer />

              {/* Quick View Product Modal */}
              {quickViewProduct && (
                <ProductModal 
                  product={quickViewProduct} 
                  onClose={() => setQuickViewProduct(null)} 
                />
              )}

              {/* Floating WhatsApp Button */}
              <a
                href="https://wa.me/254712054061"
                className="whatsapp-float"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact us on WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.58-.003 10.118-4.542 10.12-10.125.002-2.707-1.047-5.251-2.953-7.161C16.628 1.408 14.099.358 11.392.358c-5.582 0-10.119 4.539-10.122 10.12-.001 1.83.488 3.619 1.417 5.178L1.67 21.93l6.236-1.636c-.4-.25-.802-.55-1.259-.14zm11.444-7.531c-.307-.154-1.817-.897-2.098-.999-.281-.102-.486-.154-.69.154-.204.307-.791.999-.97 1.203-.178.204-.357.229-.664.077-.306-.154-1.294-.477-2.464-1.521-.91-.81-1.523-1.812-1.702-2.118-.179-.307-.019-.473.134-.626.138-.138.307-.357.46-.536.153-.179.204-.307.307-.512.102-.204.051-.383-.026-.537-.077-.154-.69-1.662-.946-2.277-.25-.6-.525-.518-.72-.528-.189-.01-.406-.011-.622-.011-.217 0-.57.081-.869.408-.3.307-1.144 1.119-1.144 2.729 0 1.61 1.17 3.167 1.33 3.372.16.204 2.298 3.51 5.568 4.92.777.336 1.384.538 1.859.689.78.248 1.49.213 2.052.129.626-.094 1.817-.743 2.073-1.462.256-.72.256-1.336.179-1.464-.076-.128-.281-.204-.588-.358z" />
                </svg>
              </a>
              
            </div>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </Router>
  );
}
