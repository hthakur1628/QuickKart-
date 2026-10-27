export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-1">
            <span className="text-2xl font-black text-amber-400 tracking-tight">Quick<span className="text-emerald-400">Kart</span></span>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              India&apos;s lightning-fast grocery and daily essentials platform. Built for university viva &amp; web technology demonstration.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Live Dark-Store Simulation
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Popular Categories</h4>
            <ul className="space-y-1.5 text-xs">
              <li><span className="hover:text-slate-200 cursor-pointer">Dairy &amp; Breakfast</span></li>
              <li><span className="hover:text-slate-200 cursor-pointer">Fresh Fruits &amp; Vegetables</span></li>
              <li><span className="hover:text-slate-200 cursor-pointer">Cold Drinks &amp; Juices</span></li>
              <li><span className="hover:text-slate-200 cursor-pointer">Snacks &amp; Munchies</span></li>
              <li><span className="hover:text-slate-200 cursor-pointer">Bakery &amp; Bread</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Academic Highlights</h4>
            <ul className="space-y-1.5 text-xs">
              <li>React 19 Hooks (`useState`, `useEffect`)</li>
              <li>Vite &amp; Modern Tailwind CSS v4</li>
              <li>REST API Architecture (Express, Node.js)</li>
              <li>Server-Validated Orders &amp; Totals</li>
              <li>Accessible, Responsive UI Layout</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Service Guarantees</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span>⚡</span> <span>10-Minute Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🛡️</span> <span>100% Quality Assured Products</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🔄</span> <span>Instant Replacement on doorstep</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} QuickKart &bull; Academic Viva Project.</p>
          <p>Designed with original UI &bull; No affiliation with commercial quick-commerce entities.</p>
        </div>
      </div>
    </footer>
  );
}
