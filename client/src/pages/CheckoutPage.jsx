import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';
import { useCart } from '../hooks/useCart.js';
import { formatCurrency } from '../utils/currency.js';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    totalCartCount,
    subtotal,
    deliveryFee,
    handlingFee,
    grandTotal,
    totalSavings,
    placeOrder,
  } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: 'Flat 402, Block B, Green Valley Apartments, Sector 21',
    deliveryInstructions: 'Ring bell and leave at doorstep',
    paymentMethod: 'cod', // 'cod' | 'upi' | 'card'
  });

  // Validation Errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Full name check
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    // Phone number check (10 digits starting with 6, 7, 8, 9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Enter a valid 10-digit mobile number (e.g. 9876543210)';
    }

    // Address check
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    } else if (formData.address.trim().length < 6) {
      newErrors.address = 'Please provide a detailed address (at least 6 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const placedOrder = placeOrder(formData);
      setIsSubmitting(false);
      navigate(`/order-confirmation/${placedOrder.id}`);
    }, 600);
  };

  if (totalCartCount === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar showSearchBar={false} />
        <main className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl border border-slate-200 text-center">
          <span className="text-4xl block mb-3">🛒</span>
          <h2 className="text-lg font-bold text-slate-900">Your cart is empty</h2>
          <p className="text-xs text-slate-500 mt-1 mb-5">
            Add grocery essentials before attempting to checkout.
          </p>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase"
          >
            Go to Store
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      <Navbar showSearchBar={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-emerald-700 transition-colors">Cart</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Checkout</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Delivery & Payment Details Form */}
          <div className="lg:col-span-7 space-y-6">
            
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-xs">
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Delivery &amp; Contact Details
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Express 10-minute dispatch to your doorstep
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  Step 2 of 2
                </span>
              </div>

              <div className="mt-6 space-y-4">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden ${
                      errors.fullName
                        ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                        : 'border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                      <span>⚠️</span> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Mobile Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs font-semibold text-slate-400 pointer-events-none">
                      +91
                    </span>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden ${
                        errors.phoneNumber
                          ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                          : 'border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                      <span>⚠️</span> {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Delivery Address */}
                <div>
                  <label htmlFor="address" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Complete Delivery Address <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    placeholder="House/Flat number, Building name, Street, Landmark"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden resize-none ${
                      errors.address
                        ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                        : 'border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                      <span>⚠️</span> {errors.address}
                    </p>
                  )}
                </div>

                {/* Delivery Instructions */}
                <div>
                  <label htmlFor="deliveryInstructions" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Delivery Instructions (Optional)
                  </label>
                  <input
                    id="deliveryInstructions"
                    name="deliveryInstructions"
                    type="text"
                    placeholder="e.g. Leave with guard / Don't ring bell"
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                </div>

              </div>

              {/* Payment Method Selector */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span>💳</span> Select Payment Method (Demo Mode)
                </h2>

                <div className="space-y-2.5">
                  <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod' ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500' : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 block">Cash on Delivery (COD)</span>
                        <span className="text-[11px] text-slate-500">Pay cash or scan QR when items arrive at doorstep</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">Recommended</span>
                  </label>

                  <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'upi' ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500' : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 block">UPI Simulation</span>
                        <span className="text-[11px] text-slate-500">Google Pay, PhonePe, Paytm (Instant Demo Authorization)</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">Demo</span>
                  </label>

                  <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500' : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900 block">Credit / Debit Card Simulation</span>
                        <span className="text-[11px] text-slate-500">Visa, Mastercard, RuPay (Demo Card Sandbox)</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">Demo</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to="/cart"
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  &larr; Back to Cart
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all active:scale-95 shadow-sm disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <>
                      <span>Place Order ({formatCurrency(grandTotal)})</span>
                      <span>&rarr;</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>

          {/* Right Column: Order Summary Preview */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            
            {/* Items summary */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                <span>Items in Order</span>
                <span className="text-xs text-slate-500">{totalCartCount} items</span>
              </h3>

              <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-slate-100 rounded-md flex items-center justify-center font-bold text-slate-700 text-[10px]">
                        {item.quantity}x
                      </span>
                      <span className="text-slate-800 font-medium truncate max-w-[170px]" title={item.product.name}>
                        {item.product.name}
                      </span>
                    </div>
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(item.lineTotal)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Summary */}
            <CartSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              handlingFee={handlingFee}
              grandTotal={grandTotal}
              totalSavings={totalSavings}
              showActionButton={false}
            />

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
