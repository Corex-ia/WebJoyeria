"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoCuponPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    code: "", description: "", type: "percent", amount: "", min_order: "0",
    max_uses: "", active: true, expires_at: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((p) => ({ ...p, [name]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          code: form.code.toUpperCase().trim(),
          amount: parseFloat(form.amount),
          min_order: parseFloat(form.min_order) || 0,
          max_uses: form.max_uses ? parseInt(form.max_uses) : null,
          expires_at: form.expires_at || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Error al crear cupón");
      router.push("/admin/cupones");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Nuevo cupón</h1>
        <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-800">← Volver</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-xl border border-gray-200 p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Código *</label>
          <input name="code" required value={form.code} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-gold-400"
            placeholder="OASIS10" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <input name="description" value={form.description} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            placeholder="10% de descuento" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Tipo</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold-400">
              <option value="percent">Porcentaje (%)</option>
              <option value="fixed">Monto fijo (Q)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              {form.type === "percent" ? "Porcentaje *" : "Monto Q *"}
            </label>
            <input name="amount" type="number" step="0.01" min="0" required value={form.amount} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              placeholder={form.type === "percent" ? "10" : "50.00"} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Pedido mínimo (Q)</label>
            <input name="min_order" type="number" step="0.01" min="0" value={form.min_order} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Usos máx. (vacío = ilimitado)</label>
            <input name="max_uses" type="number" min="1" value={form.max_uses} onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Fecha de vencimiento (opcional)</label>
          <input name="expires_at" type="datetime-local" value={form.expires_at} onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="active" id="active" checked={form.active}
            onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))}
            className="w-4 h-4 rounded border-gray-300 text-gold-500" />
          <label htmlFor="active" className="text-sm text-gray-700">Cupón activo</label>
        </div>

        {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-gold">
            {saving ? "Creando..." : "Crear cupón"}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-outline">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
