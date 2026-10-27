import { useState, useEffect } from 'react';

function App() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => {
        setHealthStatus(data);
        setLoading(false);
      })
      .catch((err) => {
        setHealthStatus({ status: 'offline', message: err.message });
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-800">
      <header className="border-b border-slate-200 bg-white shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black text-amber-500 tracking-tight">Quick<span className="text-emerald-600">Kart</span></span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">Phase 0</span>
          </div>
          <span className="text-sm font-medium text-slate-500">Academic Project</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
            QuickKart Environment Ready 🛒
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto mb-6">
            Phase 0 setup complete. React (Vite + Tailwind CSS) and Express backend are scaffolded with independent scripts.
          </p>

          <div className="inline-flex items-center space-x-3 bg-slate-100 px-4 py-3 rounded-lg border border-slate-200 text-left">
            <div className={`w-3 h-3 rounded-full ${healthStatus?.status === 'ok' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Backend API Health</p>
              <p className="text-sm font-mono text-slate-800">
                {loading ? 'Checking http://localhost:5000/api/health...' : JSON.stringify(healthStatus)}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        QuickKart &bull; Student Quick-Commerce Web App &bull; Built with React, Vite, Tailwind & Express
      </footer>
    </div>
  );
}

export default App;
