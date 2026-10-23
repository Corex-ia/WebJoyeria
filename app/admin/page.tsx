import { createClient } from "@/lib/supabase";
import { formatCurrency } from "@/lib/recurrente";
import Link from "next/link";
import { Package, ShoppingBag, Banknote, AlertTriangle } from "lucide-react";

async function getStats() {
  const supabase = createClient();
  const [
    { count: productsCount },
    { count: ordersCount },
    { data: recentOrders },
    { data: revenue },
    { count: outOfStockCount },
    { count: lowStockCount },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "publish"),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("orders").select("total").eq("status", "paid"),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "publish").lte("stock", 0),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "publish").gt("stock", 0).lte("stock", 3),
  ]);

  const totalRevenue = (revenue ?? []).reduce((s: number, o: { total: number }) => s + (o.total ?? 0), 0);
  return {
    productsCount,
    ordersCount,
    recentOrders: recentOrders ?? [],
    totalRevenue,
    outOfStockCount: outOfStockCount ?? 0,
    lowStockCount: lowStockCount ?? 0,
  };
}

export default async function AdminDashboard() {
  const { productsCount, ordersCount, recentOrders, totalRevenue, outOfStockCount, lowStockCount } = await getStats();

  const stats = [
    { label: "Productos activos", value: productsCount ?? 0, Icon: Package,      href: "/admin/productos" },
    { label: "Pedidos totales",   value: ordersCount ?? 0,   Icon: ShoppingBag,  href: "/admin/pedidos" },
    { label: "Ingresos (pagado)", value: formatCurrency(totalRevenue), Icon: Banknote, href: "/admin/pedidos" },
  ];

  const hasStockAlerts = outOfStockCount > 0 || lowStockCount > 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="label-u text-gold-500 mb-1">Panel de control</p>
          <h1
            className="font-serif text-ink"
            style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}
          >
            Dashboard
          </h1>
        </div>
        <Link href="/admin/productos/nuevo" className="btn-primary text-sm px-5 py-2.5">
          + Nuevo producto
        </Link>
      </div>

      {/* Stock alerts */}
      {hasStockAlerts && (
        <div className="mb-6 border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-none mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-800">Alerta de inventario</p>
            <div className="mt-1 flex flex-wrap gap-x-6 gap-y-1">
              {outOfStockCount > 0 && (
                <span className="text-sm text-red-700">
                  <strong>{outOfStockCount}</strong> producto{outOfStockCount !== 1 ? "s" : ""} sin stock
                </span>
              )}
              {lowStockCount > 0 && (
                <span className="text-sm text-amber-700">
                  <strong>{lowStockCount}</strong> producto{lowStockCount !== 1 ? "s" : ""} con stock bajo (≤ 3)
                </span>
              )}
            </div>
          </div>
          <Link href="/admin/productos" className="label-u text-amber-600 hover:text-amber-700 transition-colors flex-none text-xs">
            Ver productos →
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-white border border-surface-300 p-6 hover:border-gold-300 transition-colors duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <Icon className="w-5 h-5 text-gold-400 group-hover:text-gold-500 transition-colors" />
            </div>
            <div
              className="font-serif text-ink"
              style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}
            >
              {value}
            </div>
            <p className="label-u text-ink-soft mt-1">{label}</p>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white border border-surface-300">
        <div className="px-6 py-4 border-b border-surface-300 flex items-center justify-between">
          <h2 className="label-u text-ink">Pedidos recientes</h2>
          <Link href="/admin/pedidos" className="label-u text-gold-500 hover:text-gold-400 transition-colors">
            Ver todos →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="label-u text-ink-soft">No hay pedidos aún.</p>
          </div>
        ) : (
          <div className="divide-y divide-surface-300">
            {recentOrders.map((order: Record<string, unknown>) => (
              <div key={order.id as string} className="px-6 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{order.customer_name as string}</p>
                  <p className="label-u text-ink-soft mt-0.5 truncate">{order.customer_email as string}</p>
                </div>
                <div className="text-right flex-none">
                  <p className="text-sm font-medium text-ink">{formatCurrency((order.total as number) ?? 0)}</p>
                  <span className={`label-u inline-block mt-1 px-2 py-0.5 ${
                    order.status === "paid"    ? "bg-emerald-50 text-emerald-700" :
                    order.status === "pending" ? "bg-gold-50 text-gold-600" :
                    "bg-surface-200 text-ink-soft"
                  }`}>
                    {order.status as string}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
