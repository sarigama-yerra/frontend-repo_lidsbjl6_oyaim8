import { ShoppingCart } from 'lucide-react'

function Header({ onCartClick, cartCount }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-slate-900 text-lg">Flames Shop</span>
        </a>
        <button
          onClick={onCartClick}
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>ตะกร้า</span>
          {cartCount > 0 && (
            <span className="ml-1 inline-flex items-center justify-center min-w-5 h-5 px-1 text-xs rounded-full bg-white/90 text-blue-700 font-semibold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
