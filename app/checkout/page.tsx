"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/recurrente";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: form, items: items.map((i) => ({ id: i.product.id, name: i.product.name, price: i.product.price, qty: i.quantity })), total: total() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al procesar el pedido");
      if (data.checkout_url) {
        clearCart();
        window.location.href = data.checkout_url;
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Carrito vacío</h1>
        <p className="text-gray-500 mb-8">Agrega productos antes de proceder al pago.</p>
        <Link href="/productos" className="btn-gold">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Finalizar compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
          <h2 className="font-semibold text-gray-800 text-lg">Datos de envío</h2>

          {[
            { name: "name", label: "Nombre completo", type: "text", required: true },
            { name: "email", label: "Correo electrónico", type: "email", required: true },
            { name: "phone", label: "Teléfono / WhatsApp", type: "tel", required: true },
            { name: "address", label: "Dirección de entrega", type: "text", required: true },
            { name: "city", label: "Ciudad / Departamento", type: "text", required: true },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
              <input
                name={f.name}
                type={f.type}
                required={f.required}
                value={form[f.name as keyof typeof form]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notas del pedido (opcional)</label>
            <textarea
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              placeholder="Instrucciones especiales de entrega..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold w-full justify-center text-base py-4"
          >
            {loading ? "Procesando..." : "Pagar con Recurrente"}
          </button>
          <p className="text-xs text-gray-500 text-center">
            Serás redirigido a Recurrente para completar el pago de forma segura.
          </p>
        </form>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-20">
            <h2 className="font-semibold text-gray-800 text-lg mb-4">Tu pedido</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-700 flex-1 pr-3 leading-snug">
                    {item.product.name}
                    {item.quantity > 1 && <span className="text-gray-400"> ×{item.quantity}</span>}
                  </span>
                  <span className="font-medium text-gray-900 whitespace-nowrap">
                    {formatCurrency(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>{formatCurrency(total())}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>Envío</span>
                <span className="text-green-600">Por confirmar</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-gold-700">{formatCurrency(total())}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span>🔒</span>
              <span>Pago seguro con Recurrente • Tarjeta o transferencia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
