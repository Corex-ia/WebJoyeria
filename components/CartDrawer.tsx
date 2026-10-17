"use client";

import { X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/recurrente";

export default function CartDrawer() {
  const { items, open, setOpen, removeItem, updateQty, total } = useCart();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md z-50 bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gold-600" />
            Tu carrito
          </h2>
          <button onClick={() => setOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Tu carrito está vacío</p>
              <Link
                href="/productos"
                onClick={() => setOpen(false)}
                className="mt-4 inline-block text-gold-600 hover:underline text-sm"
              >
                Ver productos
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  {item.product.thumbnail_url ? (
                    <Image
                      src={item.product.thumbnail_url}
                      alt={item.product.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">💎</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                  <p className="text-sm text-gold-700 font-semibold mt-0.5">
                    {formatCurrency(item.product.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 text-sm font-bold flex items-center justify-center hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="text-sm w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 text-sm font-bold flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="p-1 text-gray-400 hover:text-red-500 self-start"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">{formatCurrency(total())}</span>
            </div>
            <p className="text-xs text-gray-500">Envío calculado al pagar</p>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="btn-gold w-full justify-center"
            >
              Proceder al pago
            </Link>
            <Link
              href="/productos"
              onClick={() => setOpen(false)}
              className="block text-center text-sm text-gold-600 hover:underline"
            >
              Seguir comprando
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
