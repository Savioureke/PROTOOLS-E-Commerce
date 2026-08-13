import productsData from '../data/products.json';

// ─── Data accessors ──────────────────────────────────────────
export const getAllProducts    = () => productsData.products;
export const getCategories     = () => productsData.categories;
export const getBrands         = () => productsData.brands;
export const getPricingPlans   = () => productsData.pricingPlans;
export const getHeroSlides     = () => productsData.heroSlides;
export const getPromoBanners   = () => productsData.promoBanners;
export const getNewsArticles   = () => productsData.newsArticles;
export const getServices       = () => productsData.services;
export const getStoreInfo      = () => productsData.storeInfo;

export const getProductById   = (id)   => productsData.products.find(p => p.id === id);
export const getProductBySlug = (slug) => productsData.products.find(p => p.slug === slug);

// ─── Filter ──────────────────────────────────────────────────
export function filterProducts(products, { query = '', category = 'all', brand = '', minPrice = 0, maxPrice = Infinity, tab = '' } = {}) {
  return products.filter(p => {
    if (query) {
      const target = [p.name, p.brand, p.category, p.subcategory, ...(p.tags || [])].join(' ').toLowerCase();
      const tokens = query.toLowerCase().trim().split(/\s+/);
      if (!tokens.every(t => target.includes(t))) return false;
    }
    if (category && category !== 'all' && p.category.toLowerCase() !== category.toLowerCase()) return false;
    if (brand && p.brand.toLowerCase() !== brand.toLowerCase()) return false;
    if (p.price < minPrice || p.price > maxPrice) return false;
    if (tab === 'top-rated'    && !p.isTopRated) return false;
    if (tab === 'popular'      && !p.isPopular)  return false;
    if (tab === 'new-arrivals' && !p.isNew)      return false;
    return true;
  });
}

// ─── Sort ────────────────────────────────────────────────────
export function sortProducts(products, sortBy = 'default') {
  const arr = [...products];
  switch (sortBy) {
    case 'price-asc':  return arr.sort((a, b) => a.price - b.price);
    case 'price-desc': return arr.sort((a, b) => b.price - a.price);
    case 'rating':     return arr.sort((a, b) => b.rating - a.rating);
    case 'name':       return arr.sort((a, b) => a.name.localeCompare(b.name));
    case 'discount':   return arr.sort((a, b) => b.discount - a.discount);
    default:           return arr;
  }
}

// ─── Format ──────────────────────────────────────────────────
export const fmt  = (n) => `KSh ${Number(n).toLocaleString('en-KE')}`;
export const pct  = (n) => `${n}%`;
export const stars = (r) => '★'.repeat(Math.floor(r)) + (r % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(r));

export function formatDate(str) {
  return new Date(str).toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ─── Image path resolver ─────────────────────────────────────
// Products use relative paths like "../assets/products/..."
// In Vite, we put images in /public/assets/products/ so they resolve at /assets/products/
export function resolveImg(path) {
  if (!path) return '/assets/placeholder.jpg';
  // convert ../assets/... → /assets/...
  return path.replace(/^\.\.\//, '/');
}

// ─── Debounce ────────────────────────────────────────────────
export function debounce(fn, ms = 300) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}
