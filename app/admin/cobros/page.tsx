import { createClient } from "@/lib/supabase";
import { formatCurrency } from "@/lib/recurrente";

async function getPaidOrders() {
  const supabase = createClient();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .eq("status", "paid")
    .order("paid_at", { ascending: false, nullsFirst: false });
  return data ?? [];
}

export default async function AdminCobrosPage() {
  const orders = await getPaidOrders();
  const totalCobrado = orders.reduce((sum, o) => sum + (o.total ?? 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="label-u text-gold-500 mb-1">Recurrente</p>
          <h1 className="font-serif text-ink" style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}>
            Cobros
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-surface-300 px-5 py-4">
          <p className="label-u text-ink-soft mb-1">Total cobrado</p>
          <p className="font-serif text-gold-500" style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}>
            {formatCurrency(totalCobrado)}
          </p>
        </div>
        <div className="bg-white border border-surface-300 px-5 py-4">
          <p className="label-u text-ink-soft mb-1">Transacciones</p>
          <p className="font-serif text-ink" style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 400 }}>
            {orders.length}
          </p>
        </div>
      </div>

      <div className="bg-white border border-surface-300 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-16 text-center">
            <div className="mx-auto mb-4 opacity-10" style={{ width: 48, height: 48, border: "1px solid var(--gold)", transform: "rotate(45deg)" }} />
            <p className="label-u text-ink-soft mt-4">No hay cobros registrados aún.</p>
            <p className="label-u text-ink/30 mt-1">Aquí aparecerán los pagos completados vía Recurrente.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-300 bg-surface-100 text-left">
                  <th className="px-4 py-3 label-u text-ink-soft">Pedido</th>
                  <th className="px-4 py-3 label-u text-ink-soft">Cliente</th>
                  <th className="px-4 py-3 label-u text-ink-soft hidden lg:table-cell">ID Recurrente</th>
                  <th className="px-4 py-3 label-u text-ink-soft hidden md:table-cell">Productos</th>
                  <th className="px-4 py-3 label-u text-ink-soft">Monto</th>
                  <th className="px-4 py-3 label-u text-ink-soft hidden sm:table-cell">Fecha de pago</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-300">
                {orders.map((order) => {
                  const items = (order.items as Array<{ name: string; qty?: number; quantity?: number; price: number }>) ?? [];
                  const paidAt = order.paid_at ? new Date(order.paid_at as string) : null;
                  const createdAt = new Date(order.created_at as string);
                  const dateToShow = paidAt ?? createdAt;

                  return (
                    <tr key={order.id as string} className="hover:bg-surface-100 transition-colors">
                      <td className="px-4 py-3">
                        <span className="label-u text-ink/40 font-mono" style={{ fontSize: "0.52rem" }}>
                          {(order.id as string).slice(0, 8)}…
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-ink text-sm">{order.customer_name as string}</p>
                        <p className="label-u text-ink-soft">{order.customer_email as string}</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        {order.recurrente_id ? (
                          <span className="label-u text-ink/50 font-mono" style={{ fontSize: "0.52rem" }}>
                            {order.recurrente_id as string}
                          </span>
                        ) : (
                          <span className="label-u text-ink/20">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <div className="space-y-0.5">
                          {items.map((item, i) => (
                            <p key={i} className="label-u text-ink-soft">
                              {item.qty ?? item.quantity ?? 1}× {item.name}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-medium text-gold-500">{formatCurrency(order.total as number ?? 0)}</span>
                        {(order.discount_amount as number) > 0 && (
                          <p className="label-u text-emerald-600">desc. −{formatCurrency(order.discount_amount as number)}</p>
                        )}
                        {(order.coupon_code as string) && (
                          <p className="label-u text-ink/30 font-mono">{order.coupon_code as string}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <p className="label-u text-ink-soft">
                          {dateToShow.toLocaleDateString("es-GT", { day: "2-digit", month: "short", year: "numeric" })}
                        </p>
                        <p className="label-u text-ink/30">
                          {dateToShow.toLocaleTimeString("es-GT", { hour: "2-digit", minute: "2-digit" })}
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
