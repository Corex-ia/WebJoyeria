"use client";

import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/recurrente";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function CarritoPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">🛍️</div>
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-8">Explora nuestras joyas y agrega algo hermoso.</p>
        <Link href="/productos" className="btn-gold">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Carrito</h1>
        <button onClick={clearCart} className="text-sm text-gray-400 hover:text-red-500 transition-colors">
          Vaciar carrito
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-xl p-4 border border-gray-100 flex gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                {item.product.thumbnail_url ? (
                  <Image src={item.product.thumbnail_url} alt={item.product.name} width={80} height={80} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">💎</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/productos/${item.product.slug}`} className="font-medium text-gray-900 hover:text-gold-700 line-clamp-2 text-sm">
                  {item.product.name}
                </Link>
                <p className="text-gold-700 font-bold mt-1">{formatCurrency(item.product.price)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.product.id, item.quantity - 1)} className="w-8 h-8 rounded-full border border-gray-300 text-sm font-bold flex items-center justify-center hover:bg-gray-50">−</button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQty(item.product.id, item.quantity + 1)} className="w-8 h-8 rounded-full border border-gray-300 text-sm font-bold flex items-center justify-center hover:bg-gray-50">+</button>
                  </div>
                  <span className="text-sm text-gray-400">= {formatCurrency(item.product.price * item.quantity)}</span>
                  <button onClick={() => removeItem(item.product.id)} className="ml-auto p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-20">
            <h2 className="font-semibold text-gray-800 text-lg mb-4">Resumen</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span>{formatCurrency(total())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-green-600">Calculado al pagar</span>
              </div>
            </div>
            <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-gold-700">{formatCurrency(total())}</span>
            </div>
            <Link href="/checkout" className="btn-gold w-full justify-center mt-5 text-base py-4">
              Proceder al pago
            </Link>
            <Link href="/productos" className="block text-center text-sm text-gold-600 hover:underline mt-3">
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
