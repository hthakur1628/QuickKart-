import { useState } from 'react';
import { formatCurrency } from '../../utils/currency.js';

export default function CartItem({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  const { product, quantity, lineTotal } = item;
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center gap-3 sm:gap-4 py-3.5 border-b border-slate-100 last:border-0">
      {/* Product Image */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-slate-200/60">
        {!imageError && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-2xl sm:text-3xl">{product.fallbackEmoji || '🛒'}</span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate" title={product.name}>
          {product.name}
        </h4>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
          {product.unit} &bull; {formatCurrency(product.price)} each
        </p>
        
        {/* Mobile Line Total */}
        <p className="sm:hidden text-xs font-bold text-slate-900 mt-1">
          {formatCurrency(lineTotal)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="inline-flex items-center rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => onDecrement(product.id)}
            className="px-2.5 py-1 hover:bg-emerald-700 transition-colors cursor-pointer"
            aria-label={`Decrease quantity of ${product.name}`}
          >
            −
          </button>
          <span className="px-2.5 py-1 text-xs font-bold min-w-[24px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onIncrement(product.id)}
            className="px-2.5 py-1 hover:bg-emerald-700 transition-colors cursor-pointer"
            aria-label={`Increase quantity of ${product.name}`}
          >
            +
          </button>
        </div>

        {/* Desktop Line Total */}
        <span className="hidden sm:inline-block text-sm font-bold text-slate-900 min-w-[60px] text-right">
          {formatCurrency(lineTotal)}
        </span>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(product.id)}
          className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
          aria-label={`Remove ${product.name} from cart`}
          title="Remove item"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
