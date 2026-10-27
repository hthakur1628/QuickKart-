import ProductCard from './ProductCard.jsx';

export default function ProductGrid({
  products = [],
  cartItems = {},
  onAddToCart,
  onIncrement,
  onDecrement,
  categoryTitle = 'All Products',
  searchQuery = '',
}) {
  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-6 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {categoryTitle}
            </h2>
            {searchQuery && (
              <p className="text-xs text-slate-500 mt-0.5">
                Results matching &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Product Cards Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cartItems[product.id] || 0}
                onAdd={onAddToCart}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
            <span className="text-5xl block mb-3">🔍</span>
            <h3 className="text-base font-bold text-slate-800">No items found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              We couldn&apos;t find anything matching your search. Try checking another category or clearing your search term.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
