import { useMemo } from 'react'

function CartDrawer({ open, items, onClose, onRemove, onCheckout }) {
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.quantity, 0), [items])

  return (
    <div className={`fixed inset-0 z-40 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-slate-900/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold">ตะกร้าสินค้า</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">ปิด</button>
        </div>
        <div className="p-6 space-y-4 overflow-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <p className="text-slate-500">ยังไม่มีสินค้าในตะกร้า</p>
          ) : (
            items.map((it, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                {it.image && (
                  <img src={it.image} alt={it.title} className="w-16 h-16 rounded object-cover" />
                )}
                <div className="flex-1">
                  <div className="font-medium line-clamp-1">{it.title}</div>
                  <div className="text-sm text-slate-500">฿{it.price.toLocaleString()} × {it.quantity}</div>
                </div>
                <button onClick={() => onRemove(it)} className="text-red-600 hover:underline text-sm">ลบ</button>
              </div>
            ))
          )}
        </div>
        <div className="p-6 border-t border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">ยอดรวม</span>
            <span className="text-lg font-semibold">฿{subtotal.toLocaleString()}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={() => onCheckout(subtotal)}
            className="w-full py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            ชำระเงิน
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
