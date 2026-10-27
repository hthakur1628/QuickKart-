import { formatCurrency } from '../../utils/currency.js';

export default function CartSummary({
  subtotal = 0,
  deliveryFee = 0,
  handlingFee = 0,
  grandTotal = 0,
  totalSavings = 0,
  onProceed,
  proceedButtonText = 'Proceed to Checkout',
  showActionButton = true,
}) {
  const freeDeliveryThreshold = 199;
  const amountNeededForFreeDelivery = freeDeliveryThreshold - subtotal;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
        <span>Bill Details</span>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
          ⚡ 10 MINS
        </span>
      </h3>

      {/* Free delivery notification */}
      {subtotal > 0 && amountNeededForFreeDelivery > 0 && (
        <div className="mt-3 p-2.5 bg-amber-50 rounded-xl border border-amber-200/60 flex items-center gap-2 text-xs text-amber-800">
          <span>🛵</span>
          <span>
            Add <strong className="font-bold">{formatCurrency(amountNeededForFreeDelivery)}</strong> more for <strong>FREE Delivery</strong>!
          </span>
        </div>
      )}

      {subtotal >= freeDeliveryThreshold && (
        <div className="mt-3 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200/60 flex items-center gap-2 text-xs text-emerald-800">
          <span>🎉</span>
          <span>You have unlocked <strong>FREE Delivery</strong> on this order!</span>
        </div>
      )}

      {/* Line items */}
      <div className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Items Subtotal</span>
          <span className="font-semibold text-slate-800">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span>Delivery Partner Fee</span>
            <span className="text-[10px] text-slate-400" title="Standard express delivery fee">ℹ️</span>
          </span>
          <span>
            {deliveryFee === 0 ? (
              <span className="font-bold text-emerald-600 uppercase text-xs">FREE</span>
            ) : (
              <span className="font-semibold text-slate-800">{formatCurrency(deliveryFee)}</span>
            )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Handling &amp; Packaging</span>
          <span className="font-semibold text-slate-800">{formatCurrency(handlingFee)}</span>
        </div>

        {totalSavings > 0 && (
          <div className="flex items-center justify-between text-emerald-600 font-medium">
            <span>Total Savings</span>
            <span>-{formatCurrency(totalSavings)}</span>
          </div>
        )}
      </div>

      {/* Grand Total */}
      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">To Pay</span>
          <span className="text-xl sm:text-2xl font-black text-slate-900">
            {formatCurrency(grandTotal)}
          </span>
        </div>

        {showActionButton && onProceed && (
          <button
            type="button"
            onClick={onProceed}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            {proceedButtonText} &rarr;
          </button>
        )}
      </div>

      {/* Safety promise */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-400">
        <span>🛡️</span>
        <span>Secure checkout &bull; 100% genuine products</span>
      </div>
    </div>
  );
}
