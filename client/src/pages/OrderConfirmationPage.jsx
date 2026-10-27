import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import { useCart } from '../hooks/useCart.js';
import { formatCurrency } from '../utils/currency.js';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { orders } = useCart();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Navbar showSearchBar={false} />
        <main className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl border border-slate-200 text-center">
          <span className="text-4xl block mb-2">❓</span>
          <h2 className="text-lg font-bold text-slate-900">Order Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            We could not find an order matching reference #{orderId}.
          </p>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase"
          >
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      <Navbar showSearchBar={false} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        
        {/* Celebration Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner">
            🎉
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Order Confirmed &bull; Dark Store Dispatched
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
            Thank you for ordering, {order.customer?.fullName || 'Valued Customer'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Your essentials are being packed at the nearest QuickKart dark store.
          </p>

          {/* Delivery Countdown Card */}
          <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200/60 max-w-sm mx-auto flex items-center justify-between">
            <div className="text-left">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wide block">
                Estimated Delivery
              </span>
              <span className="text-lg font-black text-emerald-950">
                ⚡ 10 to 15 Mins
              </span>
            </div>
            <span className="text-2xl animate-bounce">🛵</span>
          </div>

          {/* Delivery progress tracker */}
          <div className="mt-8 pt-6 border-t border-slate-100 max-w-md mx-auto">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  ✓
                </div>
                <span className="font-semibold text-slate-900 mt-1">Confirmed</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs animate-pulse">
                  2
                </div>
                <span className="font-semibold text-slate-900 mt-1">Packing</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <span className="font-medium text-slate-400 mt-1">On the way</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs sm:text-sm">
            <div>
              <span className="text-slate-400 block text-xs">Order ID</span>
              <span className="font-mono font-bold text-slate-900">{order.id}</span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block text-xs">Placed At</span>
              <span className="font-medium text-slate-700">
                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50">
              <span className="font-bold text-slate-700 uppercase tracking-wider block text-[10px] mb-1">
                📍 Delivery Address
              </span>
              <p className="font-semibold text-slate-900">{order.customer?.fullName}</p>
              <p className="text-slate-600 mt-0.5">{order.customer?.address}</p>
              <p className="text-slate-500 mt-1">Phone: +91 {order.customer?.phoneNumber}</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/50">
              <span className="font-bold text-slate-700 uppercase tracking-wider block text-[10px] mb-1">
                💳 Payment Mode
              </span>
              <p className="font-semibold text-slate-900 uppercase">
                {order.customer?.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : `${order.customer?.paymentMethod} (Simulated)`}
              </p>
              <p className="text-slate-500 mt-0.5">Amount to pay: <strong>{formatCurrency(order.pricing?.grandTotal)}</strong></p>
              {order.customer?.deliveryInstructions && (
                <p className="text-slate-500 mt-1 italic">&ldquo;{order.customer.deliveryInstructions}&rdquo;</p>
              )}
            </div>
          </div>

          {/* Ordered items list */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Items Ordered ({order.items?.length})
            </h3>
            <div className="divide-y divide-slate-100 border-t border-b border-slate-100 text-xs">
              {order.items?.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-slate-100 rounded text-slate-700 font-bold flex items-center justify-center text-[10px]">
                      {item.quantity}x
                    </span>
                    <span className="font-medium text-slate-900">{item.name}</span>
                    <span className="text-slate-400">({item.unit})</span>
                  </div>
                  <span className="font-semibold text-slate-800">
                    {formatCurrency(item.lineTotal)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Final Billing Summary */}
          <div className="space-y-1.5 text-xs text-slate-600 pt-1">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span>{formatCurrency(order.pricing?.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{order.pricing?.deliveryFee === 0 ? 'FREE' : formatCurrency(order.pricing?.deliveryFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Handling Fee</span>
              <span>{formatCurrency(order.pricing?.handlingFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Paid / Payable</span>
              <span>{formatCurrency(order.pricing?.grandTotal)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to="/orders"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs text-center transition-colors"
            >
              View Order History
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center transition-all active:scale-95 shadow-xs"
            >
              Order More Groceries &rarr;
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
