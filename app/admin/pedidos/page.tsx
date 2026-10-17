import { createClient } from "@/lib/supabase";
import { formatCurrency } from "@/lib/recurrente";

async function getOrders() {
  const supabase = createClient();
  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

const STATUS_LABELS: Record<string, { label: string; class: string }> = {
  pending: { label: "Pendiente", class: "bg-yellow-100 text-yellow-700" },
  paid: { label: "Pagado", class: "bg-green-100 text-green-700" },
  shipped: { label: "Enviado", class: "bg-blue-100 text-blue-700" },
  delivered: { label: "Entregado", class: "bg-purple-100 text-purple-700" },
  cancelled: { label: "Cancelado", class: "bg-red-100 text-red-700" },
};

export default async function AdminPedidosPage() {
  const orders = await getOrders();

  return (
    <div>
      <h1 className="text-2xl font-serif font-bold text-gray-900 mb-6">Pedidos</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <div className="text-4xl mb-3">🛒</div>
            <p>No hay pedidos aún.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-600">ID</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Cliente</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Dirección</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Total</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Estado</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order: Record<string, unknown>) => {
                  const status = STATUS_LABELS[order.status as string] ?? { label: String(order.status), class: "bg-gray-100 text-gray-600" };
                  const date = new Date(order.created_at as string);
                  return (
                    <tr key={order.id as string} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">
                        {(order.id as string).slice(0, 8)}…
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{order.customer_name as string}</p>
                        <p className="text-xs text-gray-400">{order.customer_email as string}</p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-gray-600 text-xs max-w-xs truncate">
                        {order.customer_address as string}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gold-700">
                        {formatCurrency((order.total as number) ?? 0)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`badge ${status.class}`}>{status.label}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-500">
                        {date.toLocaleDateString("es-GT", { day: "2-digit", month: "short", year: "numeric" })}
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
