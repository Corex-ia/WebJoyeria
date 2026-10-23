import { createClient } from "@/lib/supabase";
import { formatCurrency } from "@/lib/recurrente";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

async function getOrders() {
  const supabase = createClient();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

const STATUS_COUNTS = ["pending", "paid", "shipped", "delivered", "cancelled"] as const;
const STATUS_META: Record<string, { label: string; dot: string }> = {
  pending:   { label: "Pendiente",  dot: "bg-yellow-400" },
  paid:      { label: "Pagado",     dot: "bg-emerald-500" },
  shipped:   { label: "Enviado",    dot: "bg-blue-500" },
  delivered: { label: "Entregado",  dot: "bg-purple-500" },
  cancelled: { label: "Cancelado",  dot: "bg-red-400" },
};

export default async function AdminPedidosPage() {
  const orders = await getOrders();

  const byStatus = STATUS_COUNTS.reduce<Record<string, number>>((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.total ?? 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="label-u text-gold-500 mb-1">Gestión</p>
          <h1 className="font-serif text-ink" style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}>
            Pedidos
          </h1>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {STATUS_COUNTS.map((s) => (
          <div key={s} className="bg-white border border-surface-300 px-4 py-3">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`w-1.5 h-1.5 rounded-full ${STATUS_META[s].dot}`} />
              <span className="label-u text-ink-soft">{STATUS_META[s].label}</span>
            </div>
            <p className="font-serif text-ink text-xl" style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>{byStatus[s]}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-surface-300 mb-4 px-5 py-3 flex items-center justify-between">
        <span className="label-u text-ink-soft">{orders.length} pedido{orders.length !== 1 ? "s" : ""} en total</span>
        <span className="label-u text-gold-500 font-medium">Ingresos (no cancelados): {formatCurrency(totalRevenue)}</span>
      </div>

      <div className="bg-white border border-surface-300 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-16 text-center">
            <div className="mx-auto mb-4 opacity-10" style={{ width: 48, height: 48, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
            <p className="label-u text-ink-soft mt-4">No hay pedidos aún.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-300 bg-surface-100 text-left">
                  <th className="px-4 py-3 label-u text-ink-soft w-20">ID</th>
                  <th className="px-4 py-3 label-u text-ink-soft">Cliente</th>
                  <th className="px-4 py-3 label-u text-ink-soft hidden lg:table-cell">Productos</th>
                  <th className="px-4 py-3 label-u text-ink-soft hidden md:table-cell">Envío</th>
                  <th className="px-4 py-3 label-u text-ink-soft">Total</th>
                  <th className="px-4 py-3 label-u text-ink-soft">Estado</th>
                  <th className="px-4 py-3 label-u text-ink-soft hidden sm:table-cell">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-300">
                {orders.map((order) => {
                  const items = (order.items as Array<{ name: string; qty?: number; quantity?: number; price: number }>) ?? [];
                  const date = new Date(order.created_at as string);
                  return (
                    <tr key={order.id as string} className="hover:bg-surface-100 transition-colors">
                      <td className="px-4 py-3">
                        <span className="label-u text-ink/40 font-mono" style={{ fontSize: "0.52rem" }}>
                          {(order.id as string).slice(0, 8)}…
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-ink text-sm leading-tight">{order.customer_name as string}</p>
                        <p className="label-u text-ink-soft mt-0.5">{order.customer_email as string}</p>
                        {order.customer_phone && (
                          <p className="label-u text-ink/40 mt-0.5">{order.customer_phone as string}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="space-y-0.5">
                          {items.map((item, i) => (
                            <p key={i} className="label-u text-ink-soft">
                              {item.qty ?? item.quantity ?? 1}× {item.name}
                            </p>
                          ))}
                        </div>
                        {order.notes && (
                          <p className="label-u text-amber-600 mt-1 italic">Nota: {order.notes as string}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="label-u text-ink-soft capitalize">{(order.shipping_method as string)?.replace(/-/g, " ") ?? "—"}</p>
                        {order.shipping_cost > 0 && (
                          <p className="label-u text-ink/40">{formatCurrency(order.shipping_cost as number)}</p>
                        )}
                        {order.customer_address && (
                          <p className="label-u text-ink/30 mt-0.5 max-w-[180px] truncate">{order.customer_address as string}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-medium text-gold-500">{formatCurrency(order.total as number ?? 0)}</span>
                        {(order.discount_amount as number) > 0 && (
                          <p className="label-u text-emerald-600">−{formatCurrency(order.discount_amount as number)}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <OrderStatusSelect orderId={order.id as string} current={order.status as string} />
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <p className="label-u text-ink-soft">
                          {date.toLocaleDateString("es-GT", { day: "2-digit", month: "short" })}
                        </p>
                        <p className="label-u text-ink/30">
                          {date.toLocaleTimeString("es-GT", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
