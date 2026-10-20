import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { formatCurrency } from "@/lib/recurrente";

interface Coupon {
  id: string;
  code: string;
  description: string | null;
  type: string;
  amount: number;
  min_order: number;
  max_uses: number | null;
  uses: number;
  active: boolean;
  expires_at: string | null;
  created_at: string;
}

async function getCoupons(): Promise<Coupon[]> {
  const supabase = supabaseAdmin();
  const { data } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Coupon[]) ?? [];
}

export default async function CuponesPage() {
  const coupons = await getCoupons();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="label-u text-gold-500 mb-1">Promociones</p>
          <h1 className="font-serif text-ink" style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}>
            Cupones de descuento
          </h1>
        </div>
        <Link href="/admin/cupones/nuevo" className="btn-primary text-sm px-5 py-2.5">+ Nuevo cupón</Link>
      </div>

      <div className="bg-white border border-surface-300 overflow-hidden">
        {coupons.length === 0 ? (
          <div className="p-16 text-center">
            <p className="label-u text-ink-soft">No hay cupones todavía.</p>
            <Link href="/admin/cupones/nuevo" className="label-u text-gold-500 mt-3 inline-block">Crear primer cupón →</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-300 bg-surface-100 text-left">
                  <th className="px-4 py-3 label-u text-ink-soft">Código</th>
                  <th className="px-4 py-3 label-u text-ink-soft hidden md:table-cell">Descripción</th>
                  <th className="px-4 py-3 label-u text-ink-soft">Descuento</th>
                  <th className="px-4 py-3 label-u text-ink-soft hidden sm:table-cell">Usos</th>
                  <th className="px-4 py-3 label-u text-ink-soft">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-300">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-100 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono font-medium text-ink">{c.code}</span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="label-u text-ink-soft">{c.description ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-gold-500">
                        {c.type === "percent" ? `${c.amount}%` : formatCurrency(c.amount)}
                        {c.min_order > 0 && <span className="label-u text-ink-soft ml-1">(mín {formatCurrency(c.min_order)})</span>}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className="label-u text-ink-soft">
                        {c.uses}{c.max_uses !== null ? ` / ${c.max_uses}` : ""}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`label-u inline-block px-2 py-0.5 ${c.active ? "bg-emerald-50 text-emerald-700" : "bg-surface-200 text-ink-soft"}`}>
                        {c.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
