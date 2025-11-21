import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)))
    return ['ทั้งหมด', ...cats]
  }, [products])
  const [selectedCat, setSelectedCat] = useState('ทั้งหมด')

  const filtered = useMemo(() => selectedCat === 'ทั้งหมด' ? products : products.filter(p => p.category === selectedCat), [products, selectedCat])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${baseUrl}/api/products`)
        if (!res.ok) throw new Error('โหลดสินค้าไม่สำเร็จ')
        const data = await res.json()
        if (Array.isArray(data) && data.length === 0) {
          // try seeding
          await fetch(`${baseUrl}/api/products/seed`, { method: 'POST' })
          const res2 = await fetch(`${baseUrl}/api/products`)
          const data2 = await res2.json()
          setProducts(data2)
        } else {
          setProducts(data)
        }
        setError('')
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [baseUrl])

  const addToCart = (product) => {
    setCart(prev => {
      const idx = prev.findIndex(it => it.id === product.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 }
        return copy
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (item) => {
    setCart(prev => prev.filter(it => it.id !== item.id))
  }

  const checkout = async (subtotal) => {
    try {
      const order = {
        items: cart.map(it => ({ product_id: it.id, title: it.title, price: it.price, quantity: it.quantity })),
        subtotal
      }
      const res = await fetch(`${baseUrl}/api/orders`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) })
      if (!res.ok) throw new Error('ชำระเงินไม่สำเร็จ')
      setCart([])
      alert('สั่งซื้อเรียบร้อย ขอบคุณค่ะ/ครับ')
      setCartOpen(false)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onCartClick={() => setCartOpen(true)} cartCount={cart.reduce((s, it) => s + it.quantity, 0)} />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900">ร้านค้าออนไลน์</h1>
          <p className="text-slate-600">เลือกซื้อสินค้าและชำระเงินได้ง่ายๆ</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-full text-sm border ${selectedCat === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-slate-600">กำลังโหลดสินค้า...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        )}
      </main>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onCheckout={checkout}
      />
    </div>
  )
}

export default App
