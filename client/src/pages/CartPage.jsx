import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import CartItem from '../components/cart/CartItem.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { useCart } from '../hooks/useCart.js';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    totalCartCount,
    subtotal,
    deliveryFee,
    handlingFee,
    grandTotal,
    totalSavings,
    incrementItem,
    decrementItem,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      <Navbar showSearchBar={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Shopping Cart</span>
        </nav>

        {totalCartCount === 0 ? (
          <EmptyState
            icon="🛒"
            title="Your QuickKart Cart is Empty"
            description="Explore our fresh dairy, crispy snacks, vegetables, and drinks to add essentials to your basket."
            actionText="Start Shopping"
            actionLink="/"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Review Basket
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} in your cart
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              </div>

              {/* Items List */}
              <div className="divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onIncrement={incrementItem}
                    onDecrement={decrementItem}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              {/* Delivery Partner Tip Banner */}
              <div className="mt-6 p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center gap-3 text-xs text-slate-600">
                <span className="text-xl">🛵</span>
                <div>
                  <p className="font-semibold text-slate-900">10-Minute Dark-Store Dispatch</p>
                  <p className="text-[11px] text-slate-500">Your order will be packed with care and hygiene seals.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Order Bill Summary */}
            <div className="lg:col-span-5 sticky top-24">
              <CartSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                handlingFee={handlingFee}
                grandTotal={grandTotal}
                totalSavings={totalSavings}
                onProceed={() => navigate('/checkout')}
                proceedButtonText="Proceed to Checkout"
              />

              <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200/60 text-xs text-slate-500 flex items-start gap-2">
                <span>🔄</span>
                <span>
                  <strong>Cancellation Policy:</strong> Orders cannot be cancelled once packed by the dark-store to ensure lightning 10-minute turnaround.
                </span>
              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
