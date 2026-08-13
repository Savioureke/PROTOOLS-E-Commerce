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
              
            </div>
          </WishlistProvider>
        </CartProvider>
      </ToastProvider>
    </Router>
  );
}
