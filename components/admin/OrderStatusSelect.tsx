"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = [
  { value: "pending",   label: "Pendiente",  cls: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { value: "paid",      label: "Pagado",     cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { value: "shipped",   label: "Enviado",    cls: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "delivered", label: "Entregado",  cls: "bg-purple-50 text-purple-700 border-purple-200" },
  { value: "cancelled", label: "Cancelado",  cls: "bg-red-50 text-red-700 border-red-200" },
];

export default function OrderStatusSelect({ orderId, current }: { orderId: string; current: string }) {
  const [status, setStatus] = useState(current);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const current_style = STATUSES.find((s) => s.value === status);

  async function handleChange(next: string) {
    if (next === status) return;
    setLoading(true);
    setStatus(next);
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="relative inline-block">
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        disabled={loading}
        className={`label-u border px-2 py-0.5 pr-6 appearance-none cursor-pointer focus:outline-none focus:border-gold-400 transition-colors disabled:opacity-50 ${current_style?.cls ?? "border-surface-300"}`}
        style={{ fontSize: "0.6rem", backgroundImage: "none" }}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-current opacity-50" style={{ fontSize: "0.5rem" }}>▾</span>
    </div>
  );
}
