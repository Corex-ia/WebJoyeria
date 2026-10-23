"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, ShoppingBag, Tag, Truck, Check } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/recurrente";

const SHIPPING_OPTIONS = [
  { id: "cargo-expreso", label: "Cargo Expreso", description: "2-3 días hábiles", cost: 35 },
  { id: "forza",         label: "Forza",         description: "1-2 días hábiles",  cost: 25 },
  { id: "retiro",        label: "Retiro en tienda", description: "Sin costo — Ciudad de Guatemala", cost: 0 },
];

interface CouponResult {
  code: string;
  discount: number;
  description: string;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", notes: "",
  });
  const [shipping, setShipping] = useState(SHIPPING_OPTIONS[0]);
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<CouponResult | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  const subtotal = total();
  const discount = coupon?.discount ?? 0;
  const orderTotal = Math.max(0, subtotal - discount + shipping.cost);

  async function applyCoupon() {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await fetch("/api/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, order_total: subtotal }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCoupon(data);
    } catch (err: unknown) {
      setCouponError(err instanceof Error ? err.message : "Cupón inválido");
      setCoupon(null);
    } finally {
      setCouponLoading(false);
    }
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
          items: items.map((i) => ({ id: i.product.id, name: i.product.name, price: i.product.price, qty: i.quantity, quantity: i.quantity })),
          total: orderTotal,
          subtotal,
          shipping_method: shipping.id,
          shipping_label: shipping.label,
          shipping_cost: shipping.cost,
          coupon_code: coupon?.code ?? null,
          discount_amount: discount,
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
          <h1 className="font-serif text-ink mb-3" style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}>
            Carrito vacío
          </h1>
          <p className="label-u text-ink-soft mb-8">Agrega productos antes de proceder al pago.</p>
          <Link href="/productos" className="btn-primary">Ver productos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-100">
      {/* Minimal header with store link */}
      <header className="bg-white border-b border-surface-300 h-14 flex items-center px-6 lg:px-12 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logo-oasis.png"
              alt="Joyería Oasis"
              width={52}
              height={52}
              className="object-contain mix-blend-multiply"
              priority
            />
          </Link>
          <Link href="/productos" className="label-u text-ink-soft hover:text-gold-500 transition-colors text-xs flex items-center gap-1">
            ← Seguir comprando
          </Link>
        </div>
      </header>

      <div className="bg-surface-200 border-b border-surface-300 py-8 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="label-u text-gold-500 mb-2">Último paso</p>
          <h1 className="font-serif text-ink" style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 400 }}>
            Finalizar compra
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} id="checkout-form">

            {/* Contact info */}
            <div className="bg-white border border-surface-300 p-8 mb-6">
              <p className="label-u text-ink mb-6">Datos de contacto</p>
              <div className="mb-5">
                <label className="label-u text-ink-soft block mb-1.5">Nombre completo *</label>
                <input name="name" type="text" required value={form.name} onChange={handleChange}
                  className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="label-u text-ink-soft block mb-1.5">Correo electrónico *</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange}
                    className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors" />
                </div>
                <div>
                  <label className="label-u text-ink-soft block mb-1.5">Teléfono / WhatsApp *</label>
                  <input name="phone" type="tel" required value={form.phone} onChange={handleChange}
                    className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-5 mb-5">
                <div>
                  <label className="label-u text-ink-soft block mb-1.5">Dirección de entrega *</label>
                  <input name="address" type="text" required value={form.address} onChange={handleChange}
                    className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors" />
                </div>
                <div>
                  <label className="label-u text-ink-soft block mb-1.5">Ciudad / Dpto. *</label>
                  <input name="city" type="text" required value={form.city} onChange={handleChange}
                    className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors" />
                </div>
              </div>
              <div>
                <label className="label-u text-ink-soft block mb-1.5">Notas del pedido (opcional)</label>
                <textarea name="notes" rows={2} value={form.notes} onChange={handleChange}
                  placeholder="Instrucciones especiales de entrega..."
                  className="w-full border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-gold-400 transition-colors resize-none" />
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white border border-surface-300 p-8 mb-6">
              <p className="label-u text-ink mb-5 flex items-center gap-2">
                <Truck className="w-4 h-4 text-gold-400" /> Método de envío
              </p>
              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                      shipping.id === opt.id ? "border-gold-400 bg-gold-50" : "border-surface-300 hover:border-gold-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        shipping.id === opt.id ? "border-gold-400" : "border-surface-300"
                      }`}>
                        {shipping.id === opt.id && <div className="w-2 h-2 rounded-full bg-gold-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">{opt.label}</p>
                        <p className="label-u text-ink-soft">{opt.description}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gold-500">
                      {opt.cost === 0 ? "Gratis" : formatCurrency(opt.cost)}
                    </span>
                    <input type="radio" name="shipping" value={opt.id} className="sr-only"
                      checked={shipping.id === opt.id} onChange={() => setShipping(opt)} />
                  </label>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div className="bg-white border border-surface-300 p-8 mb-6">
              <p className="label-u text-ink mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-gold-400" /> Cupón de descuento
              </p>
              {coupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="label-u text-emerald-700 font-mono">{coupon.code}</span>
                      <p className="label-u text-emerald-600 mt-0.5">{coupon.description} — ahorro {formatCurrency(coupon.discount)}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => { setCoupon(null); setCouponCode(""); }}
                    className="label-u text-emerald-700 hover:text-red-600 transition-colors">
                    Quitar
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyCoupon())}
                    placeholder="CÓDIGO"
                    className="flex-1 border border-surface-300 bg-surface-100 px-4 py-2.5 text-sm font-mono text-ink focus:outline-none focus:border-gold-400 transition-colors uppercase"
                  />
                  <button type="button" onClick={applyCoupon} disabled={couponLoading || !couponCode.trim()}
                    className="btn-outline px-6 text-sm disabled:opacity-40">
                    {couponLoading ? "..." : "Aplicar"}
                  </button>
                </div>
              )}
              {couponError && <p className="label-u text-red-600 mt-2">{couponError}</p>}
            </div>

            {error && (
              <div className="border border-red-200 bg-red-50 p-4 mb-4">
                <p className="label-u text-red-700">{error}</p>
              </div>
            )}

            {/* Submit mobile */}
            <div className="lg:hidden">
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-sm">
                {loading ? "Procesando..." : `Pagar ${formatCurrency(orderTotal)} con Recurrente`}
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
                      {item.quantity > 1 && <p className="label-u text-ink-soft mt-0.5">× {item.quantity}</p>}
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
                  <span className="label-u text-ink">{formatCurrency(subtotal)}</span>
                </div>
                {coupon && (
                  <div className="flex justify-between">
                    <span className="label-u text-emerald-600">Descuento ({coupon.code})</span>
                    <span className="label-u text-emerald-600">−{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="label-u text-ink-soft">Envío — {shipping.label}</span>
                  <span className="label-u text-ink">
                    {shipping.cost === 0 ? "Gratis" : formatCurrency(shipping.cost)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-surface-300">
                  <span className="text-sm font-medium text-ink">Total</span>
                  <span className="font-serif text-gold-500" style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", fontWeight: 400 }}>
                    {formatCurrency(orderTotal)}
                  </span>
                </div>
              </div>

              {/* Submit desktop */}
              <div className="mt-6 hidden lg:block">
                <button type="submit" form="checkout-form" disabled={loading}
                  className="btn-primary w-full justify-center py-3.5 text-sm">
                  {loading ? "Procesando..." : `Pagar ${formatCurrency(orderTotal)}`}
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
