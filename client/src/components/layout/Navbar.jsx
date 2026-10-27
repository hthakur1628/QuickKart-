export default function Navbar({
  searchQuery,
  onSearchChange,
  cartCount = 0,
  onCartClick,
  activeLocation = 'Sector 21, Gandhinagar',
}) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          
          {/* Logo & Delivery Time */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="/" className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-amber-500 tracking-tight">Quick<span className="text-emerald-600">Kart</span></span>
            </a>
            <div className="hidden md:flex flex-col border-l border-slate-200 pl-3">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                ⚡ 10 MINS
              </span>
              <span className="text-[11px] text-slate-500 truncate max-w-[140px]" title={activeLocation}>
                {activeLocation}
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search 'milk', 'chips', 'banana'..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-slate-800 placeholder-slate-400 text-sm rounded-xl border border-transparent focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-xs font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Cart Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onCartClick}
              className="relative inline-flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-xs active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">My Cart</span>
              <span className="bg-emerald-800 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Delivery location bar */}
        <div className="md:hidden py-1.5 border-t border-slate-100 flex items-center text-xs text-slate-600">
          <span className="font-semibold text-slate-900 mr-1">⚡ 10 mins to:</span>
          <span className="truncate">{activeLocation}</span>
        </div>
      </div>
    </header>
  );
}
