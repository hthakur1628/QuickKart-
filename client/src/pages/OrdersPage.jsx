import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { useCart } from '../hooks/useCart.js';
import { formatCurrency } from '../utils/currency.js';

export default function OrdersPage() {
  const { orders } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      <Navbar showSearchBar={false} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">My Orders</span>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Order History
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review your recent QuickKart grocery deliveries
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-200/70 px-2.5 py-1 rounded-full">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'}
          </span>
        </div>

        {orders.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No orders placed yet"
            description="You haven’t placed any grocery orders in this session yet."
            actionText="Start Shopping Now"
            actionLink="/"
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 text-sm">{order.id}</span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {order.status || 'Order Placed'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString([], {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 block">Total Bill</span>
                    <span className="text-base font-bold text-slate-900">
                      {formatCurrency(order.pricing?.grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Items preview */}
                <div className="py-3 flex flex-wrap gap-2 text-xs">
                  {order.items?.map((item) => (
                    <span
                      key={item.id}
                      className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-lg text-slate-700"
                    >
                      <strong className="font-bold text-slate-900">{item.quantity}x</strong>
                      <span>{item.name}</span>
                    </span>
                  ))}
                </div>

                {/* Footer of order card */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    📍 {order.customer?.address?.slice(0, 45)}...
                  </span>

                  <Link
                    to={`/order-confirmation/${order.id}`}
                    className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
