function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-slate-100 overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 min-h-[2.5rem]">{product.description || '—'}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-blue-700">฿{product.price.toLocaleString()}</span>
          <button
            onClick={() => onAdd(product)}
            className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
