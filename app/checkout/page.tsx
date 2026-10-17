"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, ShoppingBag } from "lucide-react";
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
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({ id: i.product.id, name: i.product.name, price: i.product.price, qty: i.quantity })),
          total: total(),
        }),
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
      <div className="min-h-screen bg-surface-100 flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag className="w-10 h-10 text-gold-300 mx-auto mb-4" />
          <h1
            className="font-serif text-ink mb-3"
            style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}
          >
            Carrito vacío
          </h1>
          <p className="label-u text-ink-soft mb-8">Agrega productos antes de proceder al pago.</p>
          <Link href="/productos" className="btn-primary">Ver productos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-100 pt-20">
      {/* Header */}
      <div className="bg-surface-200 border-b border-surface-300 py-8 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="label-u text-gold-500 mb-2">Último paso</p>
          <h1
            className="font-serif text-ink"
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 400 }}
          >
            Finalizar compra
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

          {/* ── Form ── */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white border border-surface-300 p-8">
              <p className="label-u text-ink mb-6">Datos de envío</p>

              {/* Row 1: Name (full) */}
              <div className="mb-5">
                <label className="label-u text-ink-soft block mb-1.5">Nombre completo *</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>

              {/* Row 2: Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="label-u text-ink-soft block mb-1.5">Correo electrónico *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="label-u text-ink-soft block mb-1.5">Teléfono / WhatsApp *</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Address + City */}
              <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-5 mb-5">
                <div>
                  <label className="label-u text-ink-soft block mb-1.5">Dirección de entrega *</label>
                  <input
                    name="address"
                    type="text"
                    required
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="label-u text-ink-soft block mb-1.5">Ciudad / Dpto. *</label>
                  <input
                    name="city"
                    type="text"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              {/* Row 4: Notes */}
              <div>
                <label className="label-u text-ink-soft block mb-1.5">Notas del pedido (opcional)</label>
                <textarea
                  name="notes"
                  rows={2}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Instrucciones especiales de entrega..."
                  className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors resize-none"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 border border-red-200 bg-red-50 p-4">
                <p className="label-u text-red-700">{error}</p>
              </div>
            )}

            {/* Submit — visible on mobile below form */}
            <div className="lg:hidden mt-6">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-4 text-sm"
              >
                {loading ? "Procesando..." : "Pagar con Recurrente"}
              </button>
              <p className="label-u text-ink-soft text-center mt-3 flex items-center justify-center gap-2">
                <Lock className="w-3 h-3" /> Pago seguro con Recurrente
              </p>
            </div>
          </form>

          {/* ── Order summary ── */}
          <div className="sticky top-24">
            <div className="bg-white border border-surface-300 p-6">
              <p className="label-u text-ink mb-5">Tu pedido</p>

              <div className="space-y-4 mb-5">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-ink leading-snug line-clamp-2">{item.product.name}</p>
                      {item.quantity > 1 && (
                        <p className="label-u text-ink-soft mt-0.5">× {item.quantity}</p>
                      )}
                    </div>
                    <span className="text-sm font-medium text-ink whitespace-nowrap">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-surface-300 pt-4 space-y-2.5">
                <div className="flex justify-between">
                  <span className="label-u text-ink-soft">Subtotal</span>
                  <span className="label-u text-ink">{formatCurrency(total())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="label-u text-ink-soft">Envío</span>
                  <span className="label-u text-gold-500">Por confirmar</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-surface-300">
                  <span className="text-sm font-medium text-ink">Total</span>
                  <span
                    className="font-serif text-gold-500"
                    style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 400 }}
                  >
                    {formatCurrency(total())}
                  </span>
                </div>
              </div>

              {/* Submit — desktop */}
              <div className="mt-6 hidden lg:block">
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                  onClick={(e) => {
                    e.preventDefault();
                    const f = document.querySelector("form");
                    if (f) f.requestSubmit();
                  }}
                  className="btn-primary w-full justify-center py-3.5 text-sm"
                >
                  {loading ? "Procesando..." : "Pagar con Recurrente"}
                </button>
                <p className="label-u text-ink-soft text-center mt-3 flex items-center justify-center gap-2">
                  <Lock className="w-3 h-3" /> Pago seguro · Tarjeta o transferencia
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
