import { useState } from 'react';

export default function ProductCard({
  product,
  quantity = 0,
  onAdd,
  onIncrement,
  onDecrement,
}) {
  const [imageError, setImageError] = useState(false);

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
        {!imageError && product.image ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400">
            <span className="text-4xl sm:text-5xl mb-1">{product.fallbackEmoji || '🛒'}</span>
            <span className="text-[10px] text-slate-400 font-medium">QuickKart</span>
          </div>
        )}

        {/* 10 MINS badge */}
        <span className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-800 px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
          ⏱️ 10 MINS
        </span>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
            {product.category}
          </span>
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 mt-0.5 min-h-[2.5rem]" title={product.name}>
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {product.unit}
          </p>
        </div>

        {/* Price & Add Button */}
        <div className="mt-4 flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-slate-900">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div>
            {quantity === 0 ? (
              <button
                type="button"
                onClick={() => onAdd(product)}
                disabled={!product.inStock}
                className="px-3.5 py-1.5 rounded-lg border border-emerald-600 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-600 hover:text-white font-bold text-xs uppercase tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                aria-label={`Add ${product.name} to cart`}
              >
                {product.inStock ? '+ ADD' : 'Out of Stock'}
              </button>
            ) : (
              <div className="inline-flex items-center rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-xs overflow-hidden">
                <button
                  type="button"
                  onClick={() => onDecrement(product.id)}
                  className="px-2.5 py-1.5 hover:bg-emerald-700 transition-colors cursor-pointer"
                  aria-label={`Decrease quantity of ${product.name}`}
                >
                  −
                </button>
                <span className="px-2 py-1.5 text-xs font-bold min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onIncrement(product.id)}
                  className="px-2.5 py-1.5 hover:bg-emerald-700 transition-colors cursor-pointer"
                  aria-label={`Increase quantity of ${product.name}`}
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
