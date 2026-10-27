import { Link } from 'react-router-dom';

export default function EmptyState({
  icon = '🛒',
  title = 'Your cart is empty',
  description = 'You haven’t added any groceries to your cart yet.',
  actionText = 'Start Shopping',
  actionLink = '/',
}) {
  return (
    <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 shadow-xs max-w-md mx-auto my-8">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">{description}</p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all active:scale-95 shadow-sm"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}
