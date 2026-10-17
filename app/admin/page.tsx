import { createClient } from "@/lib/supabase";
import { formatCurrency } from "@/lib/recurrente";
import Link from "next/link";

async function getStats() {
  const supabase = createClient();
  const [{ count: productsCount }, { count: ordersCount }, { data: recentOrders }, { data: revenue }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "publish"),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("orders").select("total").eq("status", "paid"),
  ]);

  const totalRevenue = (revenue ?? []).reduce((s: number, o: { total: number }) => s + (o.total ?? 0), 0);
  return { productsCount, ordersCount, recentOrders: recentOrders ?? [], totalRevenue };
}

export default async function AdminDashboard() {
  const { productsCount, ordersCount, recentOrders, totalRevenue } = await getStats();

  const stats = [
    { label: "Productos activos", value: productsCount ?? 0, icon: "📦", href: "/admin/productos" },
    { label: "Pedidos totales", value: ordersCount ?? 0, icon: "🛒", href: "/admin/pedidos" },
    { label: "Ingresos (pagado)", value: formatCurrency(totalRevenue), icon: "💰", href: "/admin/pedidos" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Dashboard</h1>
        <Link href="/admin/productos/nuevo" className="btn-gold text-sm px-4 py-2">
          + Nuevo producto
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-xl p-5 border border-gray-200 hover:border-gold-300 hover:shadow-sm transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{s.icon}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Pedidos recientes</h2>
          <Link href="/admin/pedidos" className="text-xs text-gold-600 hover:underline">Ver todos →</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-10 text-center text-gray-500 text-sm">No hay pedidos aún.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order: Record<string, unknown>) => (
              <div key={order.id as string} className="p-4 flex items-center gap-4 text-sm">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{order.customer_name as string}</p>
                  <p className="text-gray-500 text-xs">{order.customer_email as string}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency((order.total as number) ?? 0)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    order.status === "paid" ? "bg-green-100 text-green-700" :
                    order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                    "bg-gray-100 text-gray-600"
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
