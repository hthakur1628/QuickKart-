import { useState, useMemo } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import CategoryList from './components/products/CategoryList.jsx';
import ProductGrid from './components/products/ProductGrid.jsx';
import { CATEGORIES, SAMPLE_PRODUCTS } from './data/sampleProducts.js';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState({}); // { [productId]: quantity }

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.categoryId === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart helper functions
  const handleAddToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
  };

  const handleIncrement = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setCart((prev) => {
      const currentQty = prev[productId] || 0;
      if (currentQty <= 1) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return {
        ...prev,
        [productId]: currentQty - 1,
      };
    });
  };

  // Compute total items and subtotal
  const totalCartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return Object.entries(cart).reduce((sum, [productId, qty]) => {
      const prod = SAMPLE_PRODUCTS.find((p) => p.id === productId);
      return sum + (prod ? prod.price * qty : 0);
    }, 0);
  }, [cart]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);
  const activeCategoryName = activeCategoryObj ? activeCategoryObj.name : 'All Products';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        onCartClick={() => {
          if (totalCartCount > 0) {
            alert(`🛒 QuickKart Cart: ${totalCartCount} items, Subtotal: ₹${cartSubtotal}`);
          } else {
            alert('Your cart is empty! Add items from the store.');
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Promotional Hero Banner */}
        <section className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  <span>⚡</span> Quick-Commerce Academic Demonstration
                </span>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                  Groceries &amp; Daily Essentials in <span className="text-amber-300 underline decoration-amber-400">10 Minutes</span>
                </h1>
                <p className="mt-2 text-sm sm:text-base text-emerald-100">
                  Fresh milk, farm vegetables, crisp snacks, and chilled beverages delivered instantly from your local dark-store.
                </p>
              </div>

              {/* Quick Feature Badges */}
              <div className="grid grid-cols-2 gap-3 shrink-0">
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
                  <span className="text-xl block">🥦</span>
                  <span className="text-xs font-bold block mt-1">Farm Fresh</span>
                  <span className="text-[10px] text-emerald-200">Guaranteed quality</span>
                </div>
                <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/10">
                  <span className="text-xl block">⚡</span>
                  <span className="text-xs font-bold block mt-1">10-Min Flash</span>
                  <span className="text-[10px] text-emerald-200">Express delivery</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter Bar */}
        <CategoryList
          categories={CATEGORIES}
          activeCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            setSearchQuery(''); // Reset search when switching categories
          }}
        />

        {/* Products Grid */}
        <ProductGrid
          products={filteredProducts}
          cartItems={cart}
          onAddToCart={handleAddToCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          categoryTitle={activeCategoryName}
          searchQuery={searchQuery}
        />

      </main>

      {/* Floating Bottom Cart Bar (Appears when user adds items) */}
      {totalCartCount > 0 && (
        <aside
          aria-label="Shopping Cart Bar"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-xl bg-slate-900 text-white rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-slate-700 flex items-center justify-between animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-base text-white">
              🛒
            </div>
            <div>
              <p className="text-xs font-medium text-slate-300">
                {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} in cart
              </p>
              <p className="text-sm sm:text-base font-bold text-white">
                ₹{cartSubtotal}
                <span className="text-xs text-emerald-400 font-normal ml-2">Extra savings applied</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert(`Proceeding to checkout with ${totalCartCount} items (Total: ₹${cartSubtotal}). Checkout flow will be finalized in Phase 2!`)}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>View Cart</span>
            <span>&rarr;</span>
          </button>
        </aside>
      )}

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
